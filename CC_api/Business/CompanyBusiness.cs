using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CC_api.Business
{
  public class CompanyBusiness
  {
    private readonly CompanyRepository companyRepository;

    public CompanyBusiness()
    {
      this.companyRepository = new CompanyRepository();

    }
    public async Task<List<Company>> GetAllCompanyAsync()
    {
      return await companyRepository.GetAllCompanyAsync();
    }
    public async Task<IActionResult> SaveCompanyAsync(Company company)
    {
      var cp = new Company();
      cp.company_id = company.company_id;
      cp.name = company.name;
      cp.licence_id = company.licence_id;
      cp.domain_address = company.domain_address;
      cp.company_logo = company.company_logo;
      cp.company_location = company.company_location;
      cp.country = company.country;
      cp.rating = company.rating;
      cp.address = company.address;

      await companyRepository.Create(cp);
      return new OkResult();

    }
    public async Task<Company> GetCompanyAsync(int Id)
    {
      var alumnus = await companyRepository.GetById(Id);
      return alumnus;
    }
    public async Task<IActionResult> UpdateCompanyAsync(int id, Company company)
    {
      var cp = await companyRepository.GetById(id);
      if (cp == null)
      {
        return new NotFoundResult();
      }
      //var cp = new Company();
      cp.company_id = company.company_id;
      cp.name = company.name;
      cp.licence_id = company.licence_id;
      cp.domain_address = company.domain_address;
      cp.company_logo = company.company_logo;
      cp.company_location = company.company_location;
      cp.country = company.country;
      cp.rating = company.rating;
      cp.address = company.address;
      await companyRepository.Update(cp);
      return new OkResult();



    }
    //  public async Task<IActionResult> UploadImageAsync()
    //}
  }
}
