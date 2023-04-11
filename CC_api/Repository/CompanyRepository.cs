using CC_api.Models;

namespace CC_api.Repository
{ 
    public class CompanyRepository
    {
      private readonly DatabaseContext dbContext;
      public CompanyRepository()
      {
        this.dbContext = new DatabaseContext();
      }

      public async Task Create(Company company)
      {
        dbContext.company.Add(company);
        await dbContext.SaveChangesAsync();
      }
      public async Task<List<Company>> GetAllCompanyAsync()
      {
        return dbContext.company.ToList();
      }
    public async Task<Company> GetById(int Id)
    {
      var company = dbContext.company.FirstOrDefault(e => e.company_id == Id);
      return company;
    }
    public async Task Update(Company company)
    {
      var cp = dbContext.company.Where(h => h.company_id == company.company_id).FirstOrDefault();
      if (cp != null)
      {
        cp.name = company.name;
        cp.licence_id = company.licence_id;
        cp.domain_address = company.domain_address;
        //cp.company_logo = company.company_logo;
        cp.company_location = company.company_location;
        cp.country = company.country;
        cp.rating = company.rating;
        cp.address = company.address;
        await this.dbContext.SaveChangesAsync();
      }
    }
  }
  }
