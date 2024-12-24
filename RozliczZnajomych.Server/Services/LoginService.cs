using RozliczZnajomych.Server.Repositories;
using RozliczZnajomych.Server.Models;
using System.Security.Claims;

namespace RozliczZnajomych.Server.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        public string AddUser(Account account)
        {
           return _loginRepository.AddUser(account);
        }
        public bool CheckUserCredentials(string username, string password)
        {
           return _loginRepository.CheckUserCredentials(username, password);
        }
        public string GenerateToken(string username)
        {
            return _loginRepository.GenerateToken(username);
        }
        public ClaimsPrincipal ValidateToken(string token) { 
            return _loginRepository.ValidateToken(token);
        }
        public void UpdateUser (string username, string password, string user)
        {
            _loginRepository.UpdateUser(username, password, user);
        }
    }
}
