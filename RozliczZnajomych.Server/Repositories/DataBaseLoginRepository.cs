using Azure.Identity;
using RozliczZnajomych.Server.DataAccess;
using RozliczZnajomych.Server.Models;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.Extensions.Options;

namespace RozliczZnajomych.Server.Repositories
{
    public class DataBaseLoginRepository : ILoginRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly JwtSettings _jwtSettings;

        public DataBaseLoginRepository(AppDbContext dbContext, IOptions<JwtSettings> jwtSettings)
        {
            _dbContext = dbContext;
            _jwtSettings = jwtSettings.Value;
        }
        public string AddUser(Account account, byte[]? profilePicture)
        {
            if (account != null)
            {
                if (profilePicture == null)
                {
                    profilePicture = GetDefaultProfilePicture();
                }
                if (account.username != _dbContext.Accounts.FirstOrDefault(x => x.username == account.username)?.username)
                {
                    account.password = HashPassword(account.password);
                    _dbContext.Accounts.Add(account);
                    _dbContext.SaveChanges();
                    return "Uzytkownik zostal pomyslnie dodany";
                }
                else
                {
                    return "Uzytkownik o podanej nazwie juz istnieje";
                }
            }
            return "Dane uzytkownika sa nieprawidlowe";
        }
        public byte[] GetProfilePicture(int userId)
        {
            var user = _dbContext.Accounts.FirstOrDefault(u => u.userid == userId);
            return user?.ProfilePicture ?? GetDefaultProfilePicture(); // Zwróci domyślne zdjęcie, jeśli brak zdjęcia użytkownika
        }
        private byte[] GetDefaultProfilePicture()
        {
            // Załóżmy, że masz domyślne zdjęcie zapisane w systemie plików
            // Wczytujemy domyślny plik obrazu
            string defaultImagePath = "img/default-profile-picture.jpg"; // Ścieżka do domyślnego zdjęcia
            return File.ReadAllBytes(defaultImagePath); // Zwracamy obrazek jako tablicę bajtów
        }
        public void UpdateUser(string username, string password, string user)
        {
            var existingUser = _dbContext.Accounts.FirstOrDefault(a => a.username == user);
            if (existingUser == null)
            {
                return;

            }
            existingUser.username = username;
            existingUser.password = HashPassword(password);

            _dbContext.SaveChanges();
        
        }
        public void UpdatePassword(string password, string user)
        {
            var existingUser = _dbContext.Accounts.FirstOrDefault(a => a.username == user);
            if (existingUser == null)
            {
                return;
            }
            existingUser.password = HashPassword(password);
            _dbContext.SaveChanges();
        }
        public string UpdateUsername(string username, string user)
        {
            var existingUser = _dbContext.Accounts.FirstOrDefault(a => a.username == user);
            if (existingUser == null) return "User not found";
            var testUser = _dbContext.Accounts.FirstOrDefault(a => a.username == username);
            if (testUser != null) return "Username already exists";
            existingUser.username = username;

            // Update 'Friends' references if they store the old username
            var friends = _dbContext.Friends
            .Where(f => f.RequesterName == user || f.AddresseeName == user)
            .ToList();
            foreach (var friend in friends)
            {
                if (friend.RequesterName == user) friend.RequesterName = username;
                if (friend.AddresseeName == user) friend.AddresseeName = username;
            }
            var debts = _dbContext.Debts.Where(d => d.Debtor == user || d.Creditor == user).ToList();
            foreach (var debt in debts)
            {
                if (debt.Debtor == user) debt.Debtor = username;
                if (debt.Creditor == user) debt.Creditor = username;
            }

            _dbContext.SaveChanges();
            return "";
        }
        public void UpdatePicture(Account user)
        {
            _dbContext.Accounts.Update(user);
            _dbContext.SaveChanges();
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
            return _dbContext.Accounts.FirstOrDefault(x => x.username == username)?.password == hashedPassword;
        }

        public string GenerateToken(string username)
        {
            var user = _dbContext.Accounts.FirstOrDefault(x => x.username == username);
            if (user == null)
            {
                throw new ArgumentException("User not found");
            }
            var Handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim("userId", user.userid.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.Lifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = Handler.CreateToken(descriptor);
            return Handler.WriteToken(token);
        }
        public Account GetUserById(int userId)
        {
            return _dbContext.Accounts.FirstOrDefault(a => a.userid == userId);
        }

        public ClaimsPrincipal ValidateToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
            var parameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                var principal = handler.ValidateToken(token, parameters, out _);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}
