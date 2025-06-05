using Microsoft.EntityFrameworkCore;
using ThermoWell.Api.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Advisory> Advisories { get; set; }
    public DbSet<GroupAdvisory> GroupAdvisories { get; set; }
    public DbSet<Tip> Tips { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<UrgentAlert> UrgentAlerts { get; set; }
    public DbSet<DashboardCard> DashboardCards { get; set; }
    public DbSet<VulnerableGroupAdvice> VulnerableGroupAdvice { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Faq> Faqs { get; set; }
    public DbSet<ExternalLink> ExternalLinks { get; set; }
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Example Fluent API configuration (expand as needed):
        modelBuilder.Entity<UserProfile>().HasIndex(u => u.Email).IsUnique();
    }
}

// Remove model class definitions from here. All model classes are now in separate files under Models/.
