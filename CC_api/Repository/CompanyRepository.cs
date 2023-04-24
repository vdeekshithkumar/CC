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
      dbContext.company.Update(company);
      await dbContext.SaveChangesAsync();
    }
  }
  }
