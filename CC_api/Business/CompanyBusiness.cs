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
      cp.CompanyName = company.CompanyName;
      cp.DomainAddress = company.DomainAddress;
      cp.CompanyAddress = company.CompanyAddress;
      cp.Rating = company.Rating;
      await companyRepository.Create(cp);
      return new OkResult();

    }
  }
}
