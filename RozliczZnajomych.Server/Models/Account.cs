using System.ComponentModel.DataAnnotations;

namespace RozliczZnajomych.Server.Models
{
    public class Account
    {
        [Key]
        public required int userid { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }
        public byte[]? ProfilePicture { get; set; }
    }
}
