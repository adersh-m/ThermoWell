namespace ThermoWell.Api.Models
{
    public class UrgentAlert
    {
        public int Id { get; set; }
        public string Alert { get; set; }
        public DateTime IssuedAt { get; set; }
    }
}
