using Kyrs.Models;
using Microsoft.EntityFrameworkCore;

namespace Kyrs.Data
{
    public class ProductContext: DbContext
    {
        public ProductContext()
        {
            Database.EnsureCreated();
        }
        
        public ProductContext(DbContextOptions<ProductContext> options) :
            base(options) {}

       /* protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseLazyLoadingProxies();
        }*/
        
        public DbSet<user> users { get; set; }
        public DbSet<product> products { get; set; }
        
        public DbSet<message> messages { get; set; }
    }
}