using Azure.Identity;
using RozliczZnajomych.Server.DataAccess;
using RozliczZnajomych.Server.Models;
using System.Security.Cryptography;
using System.Text;

namespace RozliczZnajomych.Server.Repositories
{
    public class DataBaseLoginRepository : ILoginRepository
    {
        private readonly AppDbContext _dbContext;

        public DataBaseLoginRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void AddUser(Account account)
        {
            if (account != null)
            {
                if (account.username != _dbContext.Accounts.FirstOrDefault(x => x.username == account.username)?.username)
                {
                    account.password = HashPassword(account.password);
                    _dbContext.Accounts.Add(account);
                    _dbContext.SaveChanges();
                }
            }
        }
        public string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // Przekształć hasło na tablicę bajtów
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Przekształć tablicę bajtów na łańcuch hex
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
        public bool CheckUserCredentials(string username, string password)
        {
            string hashedPassword = HashPassword(password);
            if (_dbContext.Accounts.FirstOrDefault(x => x.username == username)?.password == hashedPassword)
            {
                return true;

            }
            return false;
        }
    }
}
