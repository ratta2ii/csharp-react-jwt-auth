using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Activity> Activities { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        
    }
}