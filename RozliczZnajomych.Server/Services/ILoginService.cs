using RozliczZnajomych.Server.Models;

namespace RozliczZnajomych.Server.Services
{
    public interface ILoginService
    {
        public void AddUser(Account account);
    }
}
