/*using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CC_api.Controllers
{
  public class AdController : Controller
  {
    private readonly ILogger<AdController> _logger;
    private readonly AdBusiness AdBusiness;
    public AdController(ILogger<AdController> logger)
    {
      _logger = logger;
      AdBusiness = new AdBusiness();
    }



    [HttpPost("PostAd")]

    public async Task<IActionResult> PostAd([FromBody] Ad Ad)
    {
      {
        return await AdBusiness.PostAd(Ad);

      }

    }





    [HttpDelete("DeleteAd/{id}")]
    public async Task<IActionResult> DeleteAd(int id)
    {
      await AdBusiness.DeleteAd(id);
      return new OkResult();
    }


    [HttpGet("GetAdById/{id}")]
    public async Task<Ad> GetAdById(int id)
    {
      return await AdBusiness.GetAdById(id);
    }

    [HttpGet("GetAdByIdCID/{companyId}")]
    public async Task<List<Ad>> GetAdByIdCID(int companyId)
    {
      return await AdBusiness.GetAdByIdCID(companyId);
    }


    [HttpDelete("DeleteAllAd")]
    public async Task<IActionResult> DeleteAllAd()
    {
      await AdBusiness.DeleteAllAd();
      return new OkResult();
    }

    [HttpPut("EditAd/{id}")]
    public async Task<IActionResult> EditAd(int id, [FromBody] Ad Ad)
    {
      return await AdBusiness.EditAd(id, Ad);
    }



    [HttpGet("GetAllAd")]
    public async Task<List<Ad>> GetAllAd()
    {
      return await AdBusiness.GetAllAdAsync();
    }
  }
}
*/
