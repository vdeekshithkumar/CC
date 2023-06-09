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
        optionsBuilder.UseSqlServer("Server=THEJESH;Database=CC_Models;Encrypt=False;Integrated Security=True;Trusted_Connection=True;");


      }
    }

}
