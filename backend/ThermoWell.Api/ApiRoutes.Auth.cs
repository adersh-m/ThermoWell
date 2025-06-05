using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ThermoWell.Api.Models;
using BCrypt.Net;

namespace ThermoWell.Api;

public static partial class ApiRoutes
{
    public static void MapAuthRoutes(this RouteGroupBuilder group)
    {
        // Login endpoint
        group.MapPost("/login", async (AppDbContext db, IConfiguration config, AuthRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return Results.BadRequest(new { error = "Email and password are required." });
            if (!new EmailAddressAttribute().IsValid(request.Email))
                return Results.BadRequest(new { error = "Invalid email format." });

            var user = await db.UserProfiles.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Bio))
                return Results.Unauthorized();

            var token = GenerateJwtToken(user, config);
            return Results.Ok(new { token });
        });

        // Registration endpoint
        group.MapPost("/register", async (AppDbContext db, IConfiguration config, RegisterRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                return Results.BadRequest(new { error = "Name, email, and password are required." });
            if (!new EmailAddressAttribute().IsValid(request.Email))
                return Results.BadRequest(new { error = "Invalid email format." });
            if (request.Password.Length < 8)
                return Results.BadRequest(new { error = "Password must be at least 8 characters." });
            if (await db.UserProfiles.AnyAsync(u => u.Email == request.Email))
                return Results.BadRequest("Email already registered");
            var token = Guid.NewGuid().ToString("N");
            var user = new UserProfile
            {
                Name = request.Name,
                Email = request.Email,
                Bio = BCrypt.Net.BCrypt.HashPassword(request.Password),
                IsEmailVerified = false,
                EmailVerificationToken = token,
                EmailVerificationTokenGeneratedAt = DateTime.UtcNow
            };
            db.UserProfiles.Add(user);
            await db.SaveChangesAsync();
            // TODO: Send email with token. For now, return token in response for testing.
            var jwt = GenerateJwtToken(user, config);
            return Results.Ok(new { token = jwt, emailVerificationToken = token });
        });

        // Forgot password endpoint
        group.MapPost("/forgot-password", async (AppDbContext db, ForgotPasswordRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || !new EmailAddressAttribute().IsValid(request.Email))
                return Results.BadRequest(new { error = "Valid email is required." });

            var user = await db.UserProfiles.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user != null)
            {
                // Invalidate previous tokens for this user
                var oldTokens = db.PasswordResetTokens.Where(t => t.UserProfileId == user.Id && !t.IsUsed);
                foreach (var t in oldTokens)
                {
                    t.IsUsed = true;
                    t.UsedAt = DateTime.UtcNow;
                }
                // Generate new token
                var token = Guid.NewGuid().ToString("N");
                var resetToken = new PasswordResetToken
                {
                    UserProfileId = user.Id,
                    Token = token,
                    CreatedAt = DateTime.UtcNow,
                    IsUsed = false
                };
                db.PasswordResetTokens.Add(resetToken);
                await db.SaveChangesAsync();
                // TODO: Send email with token (out of scope)
            }
            // Always return OK for security
            return Results.Ok();
        });

        // Reset password endpoint
        group.MapPost("/reset-password", async (AppDbContext db, ResetPasswordRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Token) || string.IsNullOrWhiteSpace(request.NewPassword))
                return Results.BadRequest(new { error = "Token and new password are required." });
            if (request.NewPassword.Length < 8)
                return Results.BadRequest(new { error = "Password must be at least 8 characters." });

            // Find token
            var token = await db.PasswordResetTokens.Include(t => t.UserProfile)
                .FirstOrDefaultAsync(t => t.Token == request.Token);
            if (token == null || token.IsUsed || token.UserProfile == null)
                return Results.BadRequest(new { error = "Invalid or expired token." });
            // Expiry: 1 hour
            if (token.CreatedAt < DateTime.UtcNow.AddHours(-1))
                return Results.BadRequest(new { error = "Token has expired." });

            // Update password
            token.IsUsed = true;
            token.UsedAt = DateTime.UtcNow;
            token.UserProfile.Bio = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await db.SaveChangesAsync();
            return Results.Ok();
        });

        // Verify email endpoint
        group.MapPost("/verify-email", async (AppDbContext db, VerifyEmailRequest request) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Token))
                return Results.BadRequest(new { error = "Email and token are required." });
            var user = await db.UserProfiles.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return Results.BadRequest(new { error = "Invalid email or token." });
            if (user.IsEmailVerified)
                return Results.BadRequest(new { error = "Email already verified." });
            if (user.EmailVerificationToken != request.Token)
                return Results.BadRequest(new { error = "Invalid token." });
            // Optionally: check token expiry (e.g., 24h)
            user.IsEmailVerified = true;
            user.EmailVerificationToken = null;
            user.EmailVerificationTokenGeneratedAt = null;
            await db.SaveChangesAsync();
            return Results.Ok(new { message = "Email verified." });
        });
    }

    private static string GenerateJwtToken(UserProfile user, IConfiguration config)
    {
        var jwtKey = config["Jwt:Key"] ?? "YourSuperSecretKey!123";
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email ?? string.Empty),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Name ?? string.Empty),
            new Claim("userId", user.Id.ToString())
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
