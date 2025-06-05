namespace ThermoWell.Api.Models
{
    public class Advisory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime IssuedAt { get; set; }
    }
}
