using CC_api.Models;
using Microsoft.EntityFrameworkCore;

namespace CC_api.Repository
{
  public class InventoryRepository
  {
    private readonly DatabaseContext dbContext;
    public InventoryRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task UploadI(Inventory inventory)
    {
      dbContext.ccinventory.Add(inventory);
      await dbContext.SaveChangesAsync();
    }
<<<<<<< HEAD
    public async Task EditInventoryAsync(Inventory inventory)
    {
      dbContext.inventory.Update(inventory);
      await dbContext.SaveChangesAsync();
    }
    public async Task DeleteI(int id)
    {
      var inventory = await dbContext.inventory.FindAsync(id);
      if (inventory == null)
        throw new Exception("Inventory not found");

      dbContext.inventory.Remove(inventory);
      await dbContext.SaveChangesAsync();
    }
    /*public async Task<Inventory> GetInventoryById(int id)
    {
      return await dbContext.inventory.FindAsync(id);
    }
*/
    public async Task<Inventory> GetInventoryById(int id)
    {
      return await dbContext.inventory.FirstOrDefaultAsync(x => x.inventory_id == id);
    }

    public async Task<List<Inventory>> GetAllInventoryAsync()
    {
      return dbContext.inventory.ToList();
    }
=======
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
>>>>>>> deekshith_iv
  }
}
