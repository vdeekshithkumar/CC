using CC_api.Models;
using Microsoft.EntityFrameworkCore;

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
    public async Task<List<ContainerType>> GetAllCTypesAsync()
    {
      return dbContext.container_type.ToList();
    }
    public async Task<int> GetPortidbyCode(string portcode)
    {
      var port = await dbContext.ports
          .FirstOrDefaultAsync(p => p.port_code == portcode);

      return port?.port_id ?? 0;
    }
  }
}

