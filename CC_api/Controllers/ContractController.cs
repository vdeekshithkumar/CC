using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  public class ContractController : Controller
  {
    private readonly ILogger<ContractController> _logger;
    private readonly ContractBusiness contractBusiness;
    public ContractController(ILogger<ContractController> logger)
    {
      _logger = logger;
      contractBusiness = new ContractBusiness();
    }
    /*
          [HttpGet("UploadInventory")]
          public async Task<List<User>> UploadInventory()
          {
            return await inventoryBusiness.UploadInventory();
          }*/
    [HttpPost("UploadContract")]
    //public async Task<IActionResult> SaveUser([FromForm] User user)
    //public async Task<HttpStatusCode> SaveUser(User user)
    public async Task<IActionResult> UploadContract([FromBody] Contract contract)
    {
      {
        return await contractBusiness.UploadContract(contract);

      }

    }
    /*[HttpPost("Login")]
    public async Task<IActionResult> Login(Login loginmodel)
    {

      var login = await userBusiness.Login(loginmodel);
      if (login != null)
      {
        await userBusiness.PopulateJwtTokenAsync(login);

        return Ok(login);
      }
      else
      {
        return BadRequest();
      }


    }*/
  }
}
