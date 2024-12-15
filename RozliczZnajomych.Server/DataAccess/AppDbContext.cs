using Microsoft.EntityFrameworkCore;
using RozliczZnajomych.Server.Models;

namespace RozliczZnajomych.Server.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; } = null!;
    }
}
