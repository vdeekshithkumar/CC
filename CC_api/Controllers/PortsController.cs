using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;

 

namespace CC_api.Controllers
{
  public class PortsController : Controller
  {
    private readonly ILogger<PortsController> _logger;
    private readonly PortsBusiness portsBusiness;
    public PortsController(ILogger<PortsController> logger)
    {
      _logger = logger;
      portsBusiness = new PortsBusiness();
    }

 

    [HttpGet("GetAllPorts")]
    public async Task<List<Ports>> GetAllPorts()
    {
      return await portsBusiness.GetAllPortsAsync();
    }

 

   
  }
}