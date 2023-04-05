using Microsoft.EntityFrameworkCore;

namespace CC_api.Models
{
 
    public class DatabaseContext : DbContext
    {
      public DbSet<User> users { get; set; }
      public DbSet<Inventory> inventory { get; set; }
      public DbSet<Company> company { get; set; }
    public DbSet<Contract> contracts { get; set; }
    public DbSet<Ports> ports { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      {
        //if (!optionsBuilder.IsConfigured)
        optionsBuilder.UseSqlServer("Server=THEJESH;Database=CC_Models;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");


      }
    }
  
}
