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

    public NegotiationController(ILogger<NegotiationController> logger)
    {
      _logger = logger;
      NegotiationBusiness = new NegotiationBusiness();
    }
   
    [HttpGet("GetNegotiationCount/{adid}")]
    public async Task<int> GetNegotiationCount(int adid)
    {
      var Ncount= await NegotiationBusiness.GetNegotiationCount(adid);
      return Ncount;
    }


  }
}
