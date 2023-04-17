using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using Microsoft.AspNetCore.Http;
using System.Web;

using static System.Net.Mime.MediaTypeNames;

namespace CC_api.Controllers
{
  public class CompanyController : Controller
  {
    private readonly ILogger<CompanyController> _logger;
    private readonly CompanyBusiness companyBusiness;
    private readonly IWebHostEnvironment _environment;
 
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
    [HttpPut("UpdateCompany/{id}")]
    public async Task<IActionResult> UpdateCompany(int id, [FromBody] Company company)
    {
      return await companyBusiness.UpdateCompanyAsync(id, company);
    }


  }
}
