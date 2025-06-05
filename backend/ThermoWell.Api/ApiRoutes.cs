using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ThermoWell.Api.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

public static partial class ApiRoutes
{
    public static void MapRoutes(this WebApplication app)
    {
        var advisoryGroup = app.MapGroup("/api/advisories");
        advisoryGroup.MapGet("/", async (AppDbContext db) => await db.Advisories.ToListAsync());
        advisoryGroup.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Advisories.FindAsync(id) is Advisory adv ? Results.Ok(adv) : Results.NotFound());

        app.MapGet("/api/group-advisories", async (AppDbContext db) =>
            await db.GroupAdvisories.ToListAsync());

        app.MapGet("/api/current-advisory", async (AppDbContext db) =>
            await db.Advisories.OrderByDescending(a => a.Id).FirstOrDefaultAsync());

        var tipsGroup = app.MapGroup("/api/tips");
        tipsGroup.MapGet("/", async (string? group, AppDbContext db) =>
            string.IsNullOrEmpty(group)
                ? await db.Tips.ToListAsync()
                : await db.Tips.Where(t => t.Group == group).ToListAsync());

        tipsGroup.MapGet("/{id:int}", async (int id, AppDbContext db) =>
            await db.Tips.FindAsync(id) is Tip tip ? Results.Ok(tip) : Results.NotFound());

        var resourcesGroup = app.MapGroup("/api/resources");
        resourcesGroup.MapGet("/", async (AppDbContext db) =>
            await db.Resources.ToListAsync());

        var notifyGroup = app.MapGroup("/api/notifications");
        notifyGroup.MapGet("/", async (AppDbContext db) =>
            await db.Notifications.OrderByDescending(n => n.Timestamp).ToListAsync());

        app.MapGet("/api/urgent-alerts", async (AppDbContext db) =>
            await db.UrgentAlerts.OrderByDescending(a => a.IssuedAt).ToListAsync());

        app.MapGet("/api/dashboard", async (AppDbContext db) =>
        {
            var cards = await db.DashboardCards.ToListAsync();
            var groups = await db.VulnerableGroupAdvice.ToListAsync();
            var resources = await db.Resources.ToListAsync();
            return Results.Ok(new { statusCards = cards, vulnerableGroups = groups, resources });
        });

        var userGroup = app.MapGroup("/api/user").RequireAuthorization();
        userGroup.MapGet("/profile", async (ClaimsPrincipal user, AppDbContext db) =>
        {
            var email = user.FindFirst(ClaimTypes.Email)?.Value;
            if (email == null) return Results.Unauthorized();
            var profile = await db.UserProfiles.FirstOrDefaultAsync(u => u.Email == email);
            return profile is null ? Results.NotFound() : Results.Ok(profile);
        });

        userGroup.MapPut("/profile", async (UserProfile updated, ClaimsPrincipal user, AppDbContext db) =>
        {
            var email = user.FindFirst(ClaimTypes.Email)?.Value;
            var profile = await db.UserProfiles.FirstOrDefaultAsync(u => u.Email == email);
            if (profile is null) return Results.NotFound();

            profile.Name = updated.Name;
            profile.Phone = updated.Phone;
            profile.City = updated.City;
            profile.Bio = updated.Bio;
            await db.SaveChangesAsync();

            return Results.Ok(profile);
        });

        var faqGroup = app.MapGroup("/api/faqs");
        faqGroup.MapGet("/", async (AppDbContext db) =>
            await db.Faqs.ToListAsync());

        app.MapGet("/api/contact-methods", () =>
            Results.Ok(new[]
            {
                new { Type = "Phone", Value = "+1 234 567 8900" },
                new { Type = "Email", Value = "support@example.com" },
                new { Type = "SMS", Value = "+1 234 567 8900" }
            }));

        app.MapGet("/api/external-links", async (AppDbContext db) =>
            await db.ExternalLinks.ToListAsync());
    }

    public static void MapProfileRoutes(this RouteGroupBuilder group)
    {
        // Get current user profile
        group.MapGet("/", async (AppDbContext db, HttpContext http) =>
        {
            var userId = http.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userId == null) return Results.Unauthorized();
            if (!int.TryParse(userId, out var id)) return Results.BadRequest();
            var user = await db.UserProfiles.FindAsync(id);
            if (user == null) return Results.NotFound();
            return Results.Ok(user);
        }).RequireAuthorization();

        // Update current user profile
        group.MapPut("/", async (AppDbContext db, HttpContext http, [AsParameters] UserProfile update) =>
        {
            var userId = http.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userId == null) return Results.Unauthorized();
            if (!int.TryParse(userId, out var id)) return Results.BadRequest();
            var user = await db.UserProfiles.FindAsync(id);
            if (user == null) return Results.NotFound();

            // Validate model
            var context = new ValidationContext(update, null, null);
            var results = new List<ValidationResult>();
            if (!Validator.TryValidateObject(update, context, results, true))
                return Results.ValidationProblem(results.ToDictionary(r => r.MemberNames.FirstOrDefault() ?? "", r => new[] { r.ErrorMessage ?? "Invalid" }));

            // Update allowed fields
            user.Name = update.Name;
            user.Email = update.Email;
            user.Phone = update.Phone;
            user.City = update.City;
            user.Bio = update.Bio;
            user.Age = update.Age;
            user.CurrentWorkRole = update.CurrentWorkRole;
            user.Region = update.Region;
            user.Country = update.Country;
            await db.SaveChangesAsync();
            return Results.Ok(user);
        }).RequireAuthorization();

        // Upload profile picture
        group.MapPost("/picture", async (AppDbContext db, HttpContext http, IFormFile file) =>
        {
            var userId = http.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;
            if (userId == null) return Results.Unauthorized();
            if (!int.TryParse(userId, out var id)) return Results.BadRequest();
            var user = await db.UserProfiles.FindAsync(id);
            if (user == null) return Results.NotFound();
            if (file == null || file.Length == 0) return Results.BadRequest(new { error = "No file uploaded." });
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            if (!allowed.Contains(ext)) return Results.BadRequest(new { error = "Invalid file type." });
            var uploads = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            Directory.CreateDirectory(uploads);
            var fileName = $"profile_{id}_{DateTime.UtcNow.Ticks}{ext}";
            var filePath = Path.Combine(uploads, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            user.ProfilePictureUrl = $"/uploads/{fileName}";
            await db.SaveChangesAsync();
            return Results.Ok(new { url = user.ProfilePictureUrl });
        }).RequireAuthorization();
    }

    public static void MapLookupRoutes(this RouteGroupBuilder group)
    {
        // GET /countries
        group.MapGet("/countries", async () =>
        {
            var path = Path.Combine(AppContext.BaseDirectory, "countries.json");
            if (!File.Exists(path))
                return Results.NotFound();
            var json = await File.ReadAllTextAsync(path);
            var countries = JsonSerializer.Deserialize<List<CountryDto>>(json);
            return Results.Ok(countries);
        });

        // GET /regions/{countryCode}
        group.MapGet("/regions/{countryCode}", async (string countryCode) =>
        {
            var path = Path.Combine(AppContext.BaseDirectory, "regions.json");
            if (!File.Exists(path))
                return Results.NotFound();
            var json = await File.ReadAllTextAsync(path);
            var dict = JsonSerializer.Deserialize<Dictionary<string, List<string>>>(json);
            if (dict == null || !dict.TryGetValue(countryCode.ToUpper(), out var regions))
                return Results.NotFound();
            return Results.Ok(regions);
        });
    }

    private record CountryDto(string code, string name);
}

public static partial class ApiRoutes
{
    public static void MapAdminUpdateRoutes(this RouteGroupBuilder group)
    {
        // --- ADMIN UPDATE/CREATE ENDPOINTS ---
        // Advisory
        group.MapPut("/advisories/{id}", [Authorize(Roles = "Admin")] async (AppDbContext db, int id, Advisory input) =>
        {
            var entity = await db.Advisories.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Title = input.Title;
            entity.Content = input.Content;
            entity.IssuedAt = input.IssuedAt;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/advisories", [Authorize(Roles = "Admin")] async (AppDbContext db, Advisory input) =>
        {
            db.Advisories.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/advisories/{input.Id}", input);
        });

        // DashboardCard
        group.MapPut("/dashboard/{id}", async (AppDbContext db, int id, DashboardCard input) =>
        {
            var entity = await db.DashboardCards.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Label = input.Label;
            entity.Value = input.Value;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/dashboard", async (AppDbContext db, DashboardCard input) =>
        {
            db.DashboardCards.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/dashboard/{input.Id}", input);
        });

        // Notification
        group.MapPut("/notifications/{id}", [Authorize(Roles = "Admin")] async (AppDbContext db, int id, Notification input) =>
        {
            var entity = await db.Notifications.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Message = input.Message;
            entity.Timestamp = input.Timestamp;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/notifications", [Authorize(Roles = "Admin")] async (AppDbContext db, Notification input) =>
        {
            db.Notifications.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/notifications/{input.Id}", input);
        });

        // Tip
        group.MapPut("/tips/{id}", [Authorize(Roles = "Admin")] async (AppDbContext db, int id, Tip input) =>
        {
            var entity = await db.Tips.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Group = input.Group;
            entity.Content = input.Content;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/tips", [Authorize(Roles = "Admin")] async (AppDbContext db, Tip input) =>
        {
            db.Tips.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/tips/{input.Id}", input);
        });

        // UrgentAlert
        group.MapPut("/urgent-alerts/{id}", [Authorize(Roles = "Admin")] async (AppDbContext db, int id, UrgentAlert input) =>
        {
            var entity = await db.UrgentAlerts.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Alert = input.Alert;
            entity.IssuedAt = input.IssuedAt;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/urgent-alerts", [Authorize(Roles = "Admin")] async (AppDbContext db, UrgentAlert input) =>
        {
            db.UrgentAlerts.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/urgent-alerts/{input.Id}", input);
        });

        // VulnerableGroupAdvice
        group.MapPut("/vulnerable-group-advice/{id}", [Authorize(Roles = "Admin")] async (AppDbContext db, int id, VulnerableGroupAdvice input) =>
        {
            var entity = await db.VulnerableGroupAdvice.FindAsync(id);
            if (entity == null) return Results.NotFound();
            entity.Group = input.Group;
            entity.Advice = input.Advice;
            await db.SaveChangesAsync();
            return Results.Ok(entity);
        });
        group.MapPost("/vulnerable-group-advice", [Authorize(Roles = "Admin")] async (AppDbContext db, VulnerableGroupAdvice input) =>
        {
            db.VulnerableGroupAdvice.Add(input);
            await db.SaveChangesAsync();
            return Results.Created($"/vulnerable-group-advice/{input.Id}", input);
        });
        // --- END ---
    }
}
