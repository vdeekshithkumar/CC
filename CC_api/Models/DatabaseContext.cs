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
    public DbSet<Ad> advertisement { get; set; }
    public DbSet<Up> up_mapping { get; set; }
    public DbSet<Permissions> permission { get; set; }

    public DbSet<Negotiation> negotiation { get; set; }
    public DbSet<ContainerType> container_type { get; set; }
    public DbSet<Conversation> conversation { get; set; }
    public DbSet<Message> message { get; set; }
    public DbSet<Participant> participant { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      {
        //if (!optionsBuilder.IsConfigured)
<<<<<<< HEAD
        optionsBuilder.UseSqlServer("Server=DEEKSHITH\\SQLEXPRESS;Database=CC_Model;Encrypt=False;Integrated Security=True;Trusted_Connection=True;");
=======
        optionsBuilder.UseSqlServer("Server=tcp:cc-api.database.windows.net,1433;Initial Catalog=CC_Models;Persist Security Info=False;User ID=ivoyant;Password=ContainerConundrum123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
>>>>>>> e5e1bb35e0121eef5652e87e4c59bcf34ddf6874


      }
    }

}
