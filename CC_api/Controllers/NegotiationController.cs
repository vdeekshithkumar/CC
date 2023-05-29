using CC_api.Business;
using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace CC_api.Controllers
{
  public class NegotiationController : Controller
  {
    private readonly ILogger<NegotiationController> _logger;
    private readonly NegotiationBusiness NegotiationBusiness;
    private readonly NegotiationRepository NegotiationRepository;

    public NegotiationController(ILogger<NegotiationController> logger)
    {
      _logger = logger;
      NegotiationBusiness = new NegotiationBusiness();

      NegotiationRepository = new NegotiationRepository();
    }

    [HttpGet("GetNegotiationCount/{adid}")]
    public async Task<int> GetNegotiationCount(int adid)
    {
      var Ncount = await NegotiationBusiness.GetNegotiationCount(adid);
      return Ncount;
    }
    [HttpGet("GetAllNegotiations")]
    public async Task<List<Negotiation>> GetAllNegotiations(int ad_id)
    {
      var Negotiations = await this.NegotiationRepository.GetNegotiationByAdId(ad_id);
      return Negotiations;

    }

    [HttpDelete("DeleteNegotiation")]
    public async Task<IActionResult> DeleteNegotiation(int negotiation_id)
    {

      var n = await NegotiationRepository.GetNegotiationById(negotiation_id);
      await NegotiationBusiness.DeleteNegotiation(n);
      return Ok();
    }
    [HttpGet("GetAdDetailsAsync/{companyId}")]
    public async Task<IActionResult> GetAdDetails(int companyId)
    {
      var adDetails = await NegotiationBusiness.GetAdDetailsAsync(companyId);
      return Ok(adDetails);
    }

  }
}
