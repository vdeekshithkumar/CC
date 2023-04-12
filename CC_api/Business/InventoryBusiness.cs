using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;
using System.Net;
using System.Text;
using System.ComponentModel.Design;

 

namespace CC_api.Business

 

{
  public class InventoryBusiness
  {
      private readonly InventoryRepository inventoryRepository;
      public InventoryBusiness()
      {
        this.inventoryRepository = new InventoryRepository();
      }

 

      

      public async Task<IActionResult> UploadInventory(Inventory inventory)
      {
      var inv = new Inventory();

 

      inv.date_created = inventory.date_created;
      inv.last_modified = inventory.last_modified;
      inv.company_id = inventory.company_id;
      inv.container_type = inventory.container_type;
      inv.available = inventory.available;
      inv.maximum = inventory.maximum;
      inv.minimum = inventory.minimum;
      inv.port_id = inventory.port_id;
      inv.updated_by = inventory.updated_by;
      inv.container_size=inventory.container_size;

 


      await inventoryRepository.UploadI(inv);
        return new OkResult();

 

      }
    public async Task<IActionResult> DeleteInventory(int id)
    {
      var inv = await inventoryRepository.GetInventoryById(id);
      if (inv == null)
      {
        return new NotFoundResult();
      }

 

      await inventoryRepository.DeleteI(inv.inventory_id);
      return new OkResult();
    }

    public async Task<Inventory> GetInventoryById(int id)
    {
      return await inventoryRepository.GetInventoryById(id);
      
    }




    public async Task<IActionResult> EditInventory(int id, Inventory inventory)
    {
      var inv = await inventoryRepository.GetInventoryById(id);
      if (inv == null)
      {
        return new NotFoundResult();
      }

 

      inv.last_modified = DateTime.Now;
      inv.company_id = inventory.company_id;
      inv.container_type = inventory.container_type;
      inv.available = inventory.available;
      inv.maximum = inventory.maximum;
      inv.minimum = inventory.minimum;
      inv.port_id = inventory.port_id;
      inv.updated_by = inventory.updated_by;
      inv.container_size = inventory.container_size;

 

      await inventoryRepository.EditInventoryAsync(inv);
      return new OkResult();
    }
    public async Task<List<Inventory>> GetAllInventoryAsync()
    {
      return await inventoryRepository.GetAllInventoryAsync();
    }

 

  }
}
