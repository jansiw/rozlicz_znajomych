using RozliczZnajomych.Server.Models;
using System.Security.Claims;

namespace RozliczZnajomych.Server.Services
{
    public interface ILoginService
    {
        public string AddUser(Account account);
        public bool CheckUserCredentials(string username, string password);
        public string GenerateToken(string username);
        public ClaimsPrincipal ValidateToken(string token);
        public void UpdateUser(string username, string password, string user);
        public void UpdatePassword(string password, string user);
        public string UpdateUsername(string username, string user);
    }
}
