using Microsoft.EntityFrameworkCore;

namespace CC_api.Models
{
    public class UserContext: DbContext
    {
        public DbSet<User> ccusersdb { get; set; }
        
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (!optionsBuilder.IsConfigured)
            
 
                optionsBuilder.UseSqlServer("Server=DEEKSHITH\\SQLEXPRESS;Database=CCMODEL;Integrated Security=True;Trusted_Connection=True;Encrypt=False;");
            
        }
    }

}
