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

    [HttpPut("UpdateCompany")]
    public async Task<IActionResult> UpdateCompany([FromBody] Company company)
    {
      return await companyBusiness.UpdateCompanyAsync(company);
    }
    //[HttpPost("UploadImage")]
    //public async Task<IActionResult> Upload([FromBody] Company company)
    //{
    //  return await companyBusiness.UploadImageAsync(company);
    //}
    //public async Task<IActionResult> Upload([FromBody] IFormFile file)
    //{
    //  if (file == null || file.Length == 0)
    //  {
    //    return BadRequest("File not selected.");

    //  }
    //  string uniqueFileName = Path.GetFileNameWithoutExtension(file.FileName)
    //        + "_" + Guid.NewGuid().ToString().Substring(0, 8)
    //        + Path.GetExtension(file.FileName);

    //  string uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
    //  string filePath = Path.Combine(uploadsFolder, uniqueFileName);
    //  using (var stream = new FileStream(filePath, FileMode.Create))
    //  {
    //    await file.CopyToAsync(stream);
    //  }

    // Save image data to database
    //var image = new Image
    //{
    //  FileName = uniqueFileName,
    //  FilePath = filePath,
    //  // other properties or data you want to store in the database
    //};

  }
}
