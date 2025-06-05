using System.ComponentModel.DataAnnotations;

namespace ThermoWell.Api.Models
{
    public class AuthRequest
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }

    public class RegisterRequest
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Password { get; set; }
    }

    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }

    public class ResetPasswordRequest
    {
        [Required]
        public string? Token { get; set; }

        [Required]
        public string? NewPassword { get; set; }
    }

    public class VerifyEmailRequest
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? Token { get; set; }
    }

    public class PasswordResetToken
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UsedAt { get; set; }
        public bool IsUsed { get; set; } = false;
        public UserProfile? UserProfile { get; set; }
    }
}
