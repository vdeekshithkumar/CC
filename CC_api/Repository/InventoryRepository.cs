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

    public async Task<List<Inventory>> GetInventoryByIdCID(int companyId)
    {
      return await dbContext.inventory.Where(x => x.company_id == companyId).ToListAsync();
      /*return await dbContext.inventory.FirstOrDefaultAsync(x => x.company_id == companyId);*/
    }

    public async Task DeleteAllInventory(int companyId)
    {
      await dbContext.Database.ExecuteSqlInterpolatedAsync($"DELETE FROM inventory WHERE company_id = {companyId}");
    }






    public async Task<List<Inventory>> GetAllInventoryAsync()
    {
      return dbContext.inventory.ToList();
    }
    public class PortDetails
    {
      public int PortId { get; set; }
      public string PortCode { get; set; }
      public int Surplus { get; set; }
      public int Deficit { get; set; }
      public decimal Latitude { get; set; }
      public decimal Longitude { get; set; }
    }

    public async Task<List<PortDetails>> GetPortDetailsAsync(int companyId)
    {
      var result = await dbContext.inventory
          .Where(i => i.company_id == companyId)
          .Join(dbContext.ports,
              inventory => inventory.port_id,
              port => port.port_id,
              (inventory, port) => new PortDetails
              {
                PortId = inventory.port_id,
                Surplus = inventory.surplus,
                Deficit = inventory.deficit,
                Latitude = port.latitude,
                PortCode = port.port_code,
                Longitude = port.longitude
              })
          .ToListAsync();

      return result;
    }
    public async Task<List<PortDetails>> GetSurplusPortDetailsAsync(int companyId)
    {
      var result = await dbContext.inventory
          .Where(i => i.company_id == companyId)
          .Join(dbContext.ports,
              inventory => inventory.port_id,
              port => port.port_id,
              (inventory, port) => new PortDetails
              {
                PortId = inventory.port_id,
                Surplus = inventory.surplus,
                Deficit = inventory.deficit,
                Latitude = port.latitude,
                PortCode = port.port_code,
                Longitude = port.longitude
              })
          .Where(pd => pd.Surplus > pd.Deficit)
          .ToListAsync();

      return result;
    }
    public async Task<List<PortDetails>> GetDeficitPortDetailsAsync(int companyId)
    {
      var result = await dbContext.inventory
          .Where(i => i.company_id == companyId)
          .Join(dbContext.ports,
              inventory => inventory.port_id,
              port => port.port_id,
              (inventory, port) => new PortDetails
              {
                PortId = inventory.port_id,
                Surplus = inventory.surplus,
                Deficit = inventory.deficit,
                Latitude = port.latitude,
                PortCode = port.port_code,
                Longitude = port.longitude
              })
          .Where(pd => pd.Deficit > pd.Surplus)
          .ToListAsync();

      return result;
    }
  }
}
