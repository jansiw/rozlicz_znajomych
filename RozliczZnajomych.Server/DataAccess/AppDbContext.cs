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
        public DbSet<Friend>  Friends { get; set; } = null!;
        public DbSet<Debts> Debts { get; set; } = null!;
    }
}
