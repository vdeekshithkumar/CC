using Microsoft.EntityFrameworkCore;

namespace CC_api.Models
{
    public class UserContext: DbContext
    {
        public DbSet<User> ccusersdb { get; set; }
       public DbSet<Inventory> Inventory { get; set; }
        
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  public class DatabaseContext : DbContext
  {
    public DbSet<User> ccusersdb { get; set; }

    public DbSet<Company> cccompany { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            
 
                optionsBuilder.UseSqlServer("Server=THEJESH;Database=CC;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");
            
        }
    }

}
