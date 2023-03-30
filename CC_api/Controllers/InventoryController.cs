using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  public class InventoryController : Controller
  {
    private readonly ILogger<InventoryController> _logger;
    private readonly InventoryBusiness inventoryBusiness;
    public InventoryController(ILogger<InventoryController> logger)
    {
      _logger = logger;
      inventoryBusiness = new InventoryBusiness();
    }
    /*
          [HttpGet("UploadInventory")]
          public async Task<List<User>> UploadInventory()
          {
            return await inventoryBusiness.UploadInventory();
          }*/
    [HttpPost("UploadInventory")]
    //public async Task<IActionResult> SaveUser([FromForm] User user)
    //public async Task<HttpStatusCode> SaveUser(User user)
    public async Task<IActionResult> UploadInventory([FromBody] Inventory inventory)
    {
      {
        return await inventoryBusiness.UploadInventory(inventory);

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
