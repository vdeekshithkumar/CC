using Microsoft.EntityFrameworkCore;

namespace CC_api.Models
{
<<<<<<< HEAD
 
    public class DatabaseContext : DbContext
    {
      public DbSet<User> users { get; set; }
      public DbSet<Inventory> inventory { get; set; }
      public DbSet<Company> company { get; set; }
    public DbSet<Contract> contracts { get; set; }
    public DbSet<Ports> ports { get; set; }

    public DbSet<Up> up_mapping { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      {
        //if (!optionsBuilder.IsConfigured)
        optionsBuilder.UseSqlServer("Server=THEJESH;Database=CC_Models;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");


      }
=======
  public class DatabaseContext : DbContext
  {
    public DbSet<User> ccusersdb { get; set; }

    public DbSet<Company> cccompany { get; set; }
    public DbSet<Inventory> ccinventory { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            
 
                optionsBuilder.UseSqlServer("Server=DEEKSHITH\\SQLEXPRESS;Database=CCMODEL;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");
            
        }
>>>>>>> deekshith_iv
    }

}
