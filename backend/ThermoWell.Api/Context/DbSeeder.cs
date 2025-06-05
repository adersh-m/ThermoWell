using ThermoWell.Api.Models;

public static class DbSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (!db.Advisories.Any())
        {
            db.Advisories.AddRange(
                new Advisory { Title = "Heat Wave Warning", Content = "Stay indoors during peak hours.", IssuedAt = DateTime.UtcNow.AddDays(-2) },
                new Advisory { Title = "Cold Weather Alert", Content = "Wear layers and keep warm.", IssuedAt = DateTime.UtcNow.AddDays(-5) }
            );
        }

        if (!db.GroupAdvisories.Any())
        {
            db.GroupAdvisories.Add(new GroupAdvisory { Group = "elderly", Message = "Extra care advised during high temperatures." });
        }

        if (!db.Tips.Any())
        {
            db.Tips.AddRange(
                new Tip { Group = "children", Content = "Keep hydrated and stay in the shade." },
                new Tip { Group = "elderly", Content = "Avoid going out in the sun between 12pm–3pm." }
            );
        }

        if (!db.Resources.Any())
        {
            db.Resources.Add(new Resource { Title = "Emergency Preparedness Guide", Url = "https://example.com/guide" });
        }

        if (!db.Notifications.Any())
        {
            db.Notifications.Add(new Notification { Message = "New advisory issued", Timestamp = DateTime.UtcNow });
        }

        if (!db.UrgentAlerts.Any())
        {
            db.UrgentAlerts.Add(new UrgentAlert { Alert = "Flash flood in low-lying areas.", IssuedAt = DateTime.UtcNow });
        }

        if (!db.DashboardCards.Any())
        {
            db.DashboardCards.AddRange(
                new DashboardCard { Label = "Active Alerts", Value = "2" },
                new DashboardCard { Label = "Tips Available", Value = "5" }
            );
        }

        if (!db.VulnerableGroupAdvice.Any())
        {
            db.VulnerableGroupAdvice.Add(new VulnerableGroupAdvice { Group = "pregnant", Advice = "Stay cool and drink plenty of water." });
        }

        if (!db.UserProfiles.Any())
        {
            db.UserProfiles.Add(new UserProfile { Name = "John Doe", Email = "john@example.com", Phone = "1234567890", City = "Metro City", Bio = "Volunteer health worker" });
        }

        if (!db.Faqs.Any())
        {
            db.Faqs.Add(new Faq { Question = "What should I do during a heatwave?", Answer = "Stay indoors, drink water, and avoid exertion." });
        }

        if (!db.ExternalLinks.Any())
        {
            db.ExternalLinks.Add(new ExternalLink { Title = "Health Ministry", Url = "https://health.gov" });
        }

        db.SaveChanges();
    }
}
