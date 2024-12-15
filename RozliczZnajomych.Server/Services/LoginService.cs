using RozliczZnajomych.Server.Repositories;
using RozliczZnajomych.Server.Models;

namespace RozliczZnajomych.Server.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        public LoginService(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        public void AddUser(Account account)
        {
            _loginRepository.AddUser(account);
        }
        public bool CheckUserCredentials(string username, string password)
        {
           return _loginRepository.CheckUserCredentials(username, password);
        }
    }
}
