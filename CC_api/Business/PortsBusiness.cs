using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;



namespace CC_api.Business
{
  public class PortsBusiness
  {
    private readonly PortsRepository portsRepository;



    public PortsBusiness()
    {
      this.portsRepository = new PortsRepository();



    }
    public async Task<List<Ports>> GetAllPortsAsync()
    {
      return await portsRepository.GetAllPortsAsync();
    }

    public async Task<List<ContainerType>> GetAllCTypesAsync()
    {
      return await portsRepository.GetAllCTypesAsync();
    }
  }
}
