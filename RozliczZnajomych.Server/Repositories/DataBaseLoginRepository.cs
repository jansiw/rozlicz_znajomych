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
        public string AddUser(Account account)
        {
            if (account != null)
            {
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
            var Handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Secret);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username),
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.Lifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = Handler.CreateToken(descriptor);
            return Handler.WriteToken(token);
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
