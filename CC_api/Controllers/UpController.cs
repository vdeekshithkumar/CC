using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CC_api.Controllers
{
  public class UpController : Controller
  {
    private readonly ILogger<UpController> _logger;
    private readonly UpBusiness upBusiness;

    public UpController(ILogger<UpController> logger)
    {
      _logger = logger;
      upBusiness = new UpBusiness();


    }


    [HttpPost("AddPermission")]

    public async Task<IActionResult> AddPermissionAsync([FromBody] Up up)
    {
      {
        return await upBusiness.AddPermissionAsync(up);

      }


    }


    
  }
}
