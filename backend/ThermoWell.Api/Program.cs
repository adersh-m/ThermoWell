using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using BCrypt.Net;
using ThermoWell.Api.Models;
using ThermoWell.Api; // <-- Added using directive

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
var jwtKey = configuration["Jwt:Key"] ?? "YourSuperSecretKey!123";
var allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>() ?? new[] { "*" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddControllers(); // Enable controller endpoints

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "uploads")
    ),
    RequestPath = "/uploads"
});

// Register grouped API routes
app.MapRoutes();

// Auth endpoints
app.MapGroup("/api/auth").MapAuthRoutes();

// Profile endpoints
app.MapGroup("/api/profile").MapProfileRoutes();

// Lookup endpoints
app.MapGroup("/api/lookup").MapLookupRoutes();

// Admin endpoints (modify advisories, dashboard, notifications, tips, urgent alerts, vulnerable group advice)
app.MapGroup("/api/admin").MapAdminUpdateRoutes();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}

app.Run();
