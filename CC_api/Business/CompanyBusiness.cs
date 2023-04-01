using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;

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
  }
}
