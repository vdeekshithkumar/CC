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



   //FOR POSTGRESQL
   // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //   optionsBuilder.UseNpgsql("User ID=postgres;Password=deekshith;Host=localhost;Port=5432;Database=db-cc;Pooling=true;");


    //}


    //FOR SQL 
    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //{
    //  optionsBuilder.UseSqlServer("Server=DEEKSHITH\\SQLEXPRESS;Database=CC_Model;Encrypt=False;Integrated Security=True;Trusted_Connection=True;");


    //}
  }

}
