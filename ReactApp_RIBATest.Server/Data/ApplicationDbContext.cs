using Microsoft.EntityFrameworkCore;
using ReactApp_RIBATest.Server.Model;

namespace ReactApp_RIBATest.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Order> Orders { get; set; }

    }
}
