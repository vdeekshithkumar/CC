using Microsoft.EntityFrameworkCore;

namespace CC_api.Models
{
    public class UserContext: DbContext
    {
        public DbSet<User> ccusersdb { get; set; }
       public DbSet<Inventory> Inventory { get; set; }
        
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            
 
                optionsBuilder.UseSqlServer("Server=VISHRUTHA;Database=Cont-db;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");
            
        }
    }

}
