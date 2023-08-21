using CC_api.Business;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  public class HomeController : Controller
  {
    private readonly ILogger<HomeController> _logger;
    private readonly InventoryBusiness _inventoryBusiness;
    private readonly AdBusiness _adBusiness;


    public HomeController(ILogger<HomeController> logger)
    {
      _logger = logger;
      _inventoryBusiness = new InventoryBusiness();
      _adBusiness = new AdBusiness();
    }



    [HttpGet("")]
    public IActionResult MyEndpoint()
    {
      string message = "The Container conundrum API is UP and RUNNING";
      return Json(new { message });
    }


    [HttpGet("GetAllData")]
    public async Task<IActionResult> GetAllData(int companyId)
    {
      var inventory = await _inventoryBusiness.GetInventoryByIdCID(companyId);
      var adCount = await _adBusiness.GetAdsCount(companyId);

    

      var result = new
      {
        Inventory = inventory,
        AdCount = adCount,
     
      };

      return Ok(result);
    }

  }
}
