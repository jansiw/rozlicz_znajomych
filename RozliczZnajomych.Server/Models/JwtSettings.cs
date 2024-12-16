namespace RozliczZnajomych.Server.Models
{
    public class JwtSettings
    {
        public string Secret { get; set; }
        public int Lifetime { get; set; }
    }
}
