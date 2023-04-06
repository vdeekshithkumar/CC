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
      dbContext.inventory.Add(inventory);
      await dbContext.SaveChangesAsync();
    }

    public async Task<List<Inventory>> GetAllInventoryAsync()
    {
      return dbContext.inventory.ToList();
    }
  }
}
