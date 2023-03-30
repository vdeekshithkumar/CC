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
    }
  }

