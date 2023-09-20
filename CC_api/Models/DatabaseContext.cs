using Google.Apis.Drive.v3.Data;
using Microsoft.AspNetCore.Hosting.Server;
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
    optionsBuilder.UseNpgsql("User ID=citus;Password=ivoyant@14;Host=ivoyant-datamapper.postgres.database.azure.com;Port=5432;Database=container-conundrum;Pooling=true;");
    }
  }

}
