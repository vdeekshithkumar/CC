using CC_api.Models;

namespace CC_api.Repository
{
  public class InventoryRepository
  {
    private readonly DatabaseContext dbContext;
    public  InventoryRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task UploadI(Inventory inventory)
    {
      dbContext.ccinventorydb.Add(inventory);
      await dbContext.SaveChangesAsync();
    }
   /* public async Task<List<User>> GetAllUserAsync()
    {
      return dbContext.ccusersdb.ToList();
    }
    public async Task<User> Login(string userEmail, string password)
    {
      var user = dbContext.ccusersdb.FirstOrDefault(x => x.Email == userEmail && x.Password == password);
      if (user != null)
      {
        return user;
      }
      else
      {
        return user;
      }
    }*/
  }
}
