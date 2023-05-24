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
      if (inventory.available - inventory.maximum > 0)
      {
        inv.surplus = inventory.available - inventory.maximum;
        inv.deficit = 0;
      }
      else if (inventory.available - inventory.minimum < 0)
      {
        inv.deficit = inventory.minimum - inventory.available;
        inv.surplus = 0;
      }
      else
      {
        inv.surplus = 0;
        inv.deficit = 0;

      }
      inv.port_id = inventory.port_id;
      inv.updated_by = inventory.updated_by;
      inv.container_size = inventory.container_size;
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




    public async Task<IActionResult> AddExcelData(List<Inventory> excelData, int user_id, int company_id)
    {
      await inventoryRepository.DeleteAllInventory();


      if (excelData == null || excelData.Count == 0)
      {
        throw new System.Exception("Excel data is empty.");
      }
      else
      {

        foreach (var item in excelData)
        {
          //
          var inv = new Inventory();

          DateTime currentDate = DateTime.Now;


          inv.date_created = currentDate;
          inv.last_modified = currentDate;
          inv.company_id = company_id;
          inv.container_type = item.container_type;
          inv.available = item.available;
          inv.maximum = item.maximum;
          inv.minimum = item.minimum;
          if (item.available - item.maximum > 0)
          {
            inv.surplus = item.available - item.maximum;
            inv.deficit = 0;
          }
          else if (item.available - item.minimum < 0)
          {
            inv.deficit = item.minimum - item.available;
            inv.surplus = 0;
          }
          else
          {
            inv.surplus = 0;
            inv.deficit = 0;

          }
          inv.port_id = item.port_id;
          inv.updated_by = user_id;
          inv.container_size = item.container_size;


          await inventoryRepository.Add(inv);

        }
        return new OkResult();

      }



    }



    public async Task<Inventory> GetInventoryById(int id)
    {
      return await inventoryRepository.GetInventoryById(id);
      
    }

    public async Task<List<Inventory>> GetInventoryByIdCID(int companyId)
    {
      return await inventoryRepository.GetInventoryByIdCID(companyId);
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
      if (inventory.available - inventory.maximum > 0)
      {
        inv.surplus = inventory.available - inventory.maximum;
        inv.deficit = 0;
      }
      else if (inventory.available - inventory.minimum < 0)
      {
        inv.deficit = inventory.minimum - inventory.available;
        inv.surplus = 0;
      }
      else
      {
        inv.surplus = 0;
        inv.deficit = 0;

      }
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
  
    public async Task DeleteAllInventory()
    {
      await inventoryRepository.DeleteAllInventory();
    }

    public async Task<List<InventoryRepository.PortDetails>> GetInventoryForMap(int id)
    {
      return await inventoryRepository.GetPortDetailsAsync(id);
    }

    public async Task<List<InventoryRepository.PortDetails>> GetSurplusInventoryForMap(int id)
    {
      return await inventoryRepository.GetSurplusPortDetailsAsync(id);
    }
    public async Task<List<InventoryRepository.PortDetails>> GetDeficitInventoryForMap(int id)
    {
      return await inventoryRepository.GetDeficitPortDetailsAsync(id);
    }

  }
}
