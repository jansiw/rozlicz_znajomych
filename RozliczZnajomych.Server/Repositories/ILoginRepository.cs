using RozliczZnajomych.Server.Models;
namespace RozliczZnajomych.Server.Repositories
{
    public interface ILoginRepository
    {
        public void AddUser(Account account);
        public bool CheckUserCredentials(string username, string pasword);
    }
}
