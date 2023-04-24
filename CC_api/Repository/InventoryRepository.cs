using CC_api.Models;
using Microsoft.EntityFrameworkCore;

 

namespace CC_api.Repository
{
  public class InventoryRepository
  {
    private readonly DatabaseContext dbContext;
    public  InventoryRepository()
    {
      this.dbContext = new DatabaseContext();
    }

 

    public async Task UploadI(Inventory inventory)
    {
      dbContext.inventory.Add(inventory);
      await dbContext.SaveChangesAsync();
    }

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

    public async Task Add(Inventory inventory)
    {
      await dbContext.inventory.AddAsync(inventory);
      await dbContext.SaveChangesAsync();
    }


    public async Task<Inventory> GetInventoryById(int id)
    {
      return await dbContext.inventory.FirstOrDefaultAsync(x => x.inventory_id == id);
    }
    public async Task<List<Inventory>>GetInventoryByIdCID(int companyId)
    {
      return await dbContext.inventory.Where(x => x.company_id == companyId).ToListAsync();
      /*return await dbContext.inventory.FirstOrDefaultAsync(x => x.company_id == companyId);*/
    }


    public async Task DeleteAllInventory()
    {
      await dbContext.Database.ExecuteSqlRawAsync("TRUNCATE TABLE inventory");
    }
    public async Task<List<Inventory>> GetAllInventoryAsync()
    {
      return dbContext.inventory.ToList();
    }
  }
}
