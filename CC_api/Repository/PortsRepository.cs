using CC_api.Models;

namespace CC_api.Repository
{

  public class PortsRepository
  {
    private readonly DatabaseContext dbContext;
    public PortsRepository()
    {
      this.dbContext = new DatabaseContext();
    }

   
    public async Task<List<Ports>> GetAllPortsAsync()
    {
      return dbContext.ports.ToList();
    }
  }
}

