using CC_api.Models;

namespace CC_api.Repository
{
  public class UpRepository
  {
    private readonly DatabaseContext dbContext;
    public UpRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task Create(Up up)
    {
      dbContext.up_mapping.Add(up);
      await dbContext.SaveChangesAsync();
    }
   
  }
}
