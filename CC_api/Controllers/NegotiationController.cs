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
    [HttpGet("GetAllNegotiation")]
    public async Task<List<Negotiation>> GetAllNegotiation(int companyID)
    {
      return await NegotiationRepository.GetAllNegotiation(companyID);

    }

    [HttpPost("StartNegotiation")]

    public async Task<IActionResult> StartNegotiation(int ad_id, int company_id, int user_id)
    {
      {
        return await NegotiationBusiness.StartNegotiation(ad_id, company_id, user_id);

      }

    }
    [HttpGet("GetMyNegotiationsCount")]
    public async Task<IActionResult> GetMyNegotiationsCount( int company_id)
    {
      var count = await NegotiationBusiness.GetMyNegotiationsCount(company_id);
      return Ok(count);
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
    [HttpGet("GetMyNegotiations")]
    public async Task<List<Negotiation>> GetMyNegotiations(int company_id)
    {
      var Negotiations = await this.NegotiationRepository.GetNegotiationByCId(company_id);
      return Negotiations;

    }

    [HttpPut("AcceptNegotiation")]
    public async Task<IActionResult> AcceptNegotiation(int negotiation_id)
    {
      var n = await NegotiationRepository.GetNegotiationById(negotiation_id);
      await NegotiationBusiness.AcceptNegotiation(n);
      return Ok();
    }

    [HttpDelete("DeleteNegotiation")]
    public async Task<IActionResult> DeleteNegotiation(int negotiation_id)
    {

      var n = await NegotiationRepository.GetNegotiationById(negotiation_id);
      await NegotiationBusiness.DeleteNegotiation(n);
      return Ok();
    }
    //[HttpGet("GetAdDetailsAsync/{companyId}")]
    //public async Task<IActionResult> GetAdDetails(int companyId)
    //{
    //  var adDetails = await NegotiationBusiness.GetAdDetailsAsync(companyId);
    //  return Ok(adDetails);
    //}

  }
}
