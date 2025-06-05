using System.ComponentModel.DataAnnotations;

namespace ThermoWell.Api.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string? Name { get; set; }
        [Required, EmailAddress, StringLength(100)]
        public string? Email { get; set; }
        [Phone, StringLength(20)]
        public string? Phone { get; set; }
        [StringLength(100)]
        public string? City { get; set; }
        [StringLength(500)]
        public string? Bio { get; set; }
        [Range(0, 120)]
        public int? Age { get; set; }
        [StringLength(100)]
        public string? CurrentWorkRole { get; set; }
        [StringLength(100)]
        public string? Region { get; set; }
        [StringLength(100)]
        public string? Country { get; set; }
        [StringLength(300)]
        public string? ProfilePictureUrl { get; set; } // New
        public bool IsEmailVerified { get; set; } = false;
        [StringLength(100)]
        public string? EmailVerificationToken { get; set; }
        public DateTime? EmailVerificationTokenGeneratedAt { get; set; }
    }
}
