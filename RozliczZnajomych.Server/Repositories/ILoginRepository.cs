using RozliczZnajomych.Server.Models;
using System.Security.Claims;
namespace RozliczZnajomych.Server.Repositories
{
    public interface ILoginRepository
    {
        public string AddUser(Account account, byte[] profilePicture);
        public bool CheckUserCredentials(string username, string pasword);
        public string GenerateToken(string username);
        public ClaimsPrincipal ValidateToken(string token);
        public void UpdateUser(string username, string password, string user);
        public byte[] GetProfilePicture(int userId);
        public Account GetUserById(int userId);
        public void UpdatePicture(Account user);
        public void UpdatePassword(string password, string user);
        public void UpdateUsername(string username, string user);
        

    }
}
