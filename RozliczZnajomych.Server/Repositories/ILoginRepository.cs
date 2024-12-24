using RozliczZnajomych.Server.Models;
using System.Security.Claims;
namespace RozliczZnajomych.Server.Repositories
{
    public interface ILoginRepository
    {
        public string AddUser(Account account);
        public bool CheckUserCredentials(string username, string pasword);
        public string GenerateToken(string username);
        public ClaimsPrincipal ValidateToken(string token);
        public void UpdateUser(string username, string password, string user);
    }
}
