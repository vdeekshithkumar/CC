using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CC_api.Controllers
{
  public class CompanyController : Controller
  {
    private readonly ILogger<CompanyController> _logger;
    private readonly CompanyBusiness companyBusiness;
    public CompanyController(ILogger<CompanyController> logger)
    {
      _logger = logger;
      companyBusiness = new CompanyBusiness();
    }

    [HttpGet("GetAllCompany")]
    public async Task<List<Company>> GetAllCompanies()
    {
      return await companyBusiness.GetAllCompanyAsync();
    }
    [HttpPost("SaveCompany")]
    //public async Task<IActionResult> SaveUser([FromForm] User user)
    //public async Task<HttpStatusCode> SaveUser(User user)
    public async Task<IActionResult> SaveCompanyAsync([FromBody] Company company)
    
      {
        return await companyBusiness.SaveCompanyAsync(company);

      }
    [HttpGet("GetCompanyById")]
    public async Task<IActionResult> GetById(int companyId)
    {
      var alumnus = await companyBusiness.GetCompanyAsync(companyId);
      return Ok(alumnus);
    }

    [HttpPut("UpdateCompany")]
    public async Task<IActionResult> UpdateCompany([FromBody] Company company)
    {
      return await companyBusiness.UpdateCompanyAsync(company);
    }

  }
}
