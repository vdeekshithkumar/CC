using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
  
namespace CC_api.Controllers
  {
    public class InventoryController : Controller
    {
      private readonly ILogger<InventoryController> _logger;
      private readonly InventoryBusiness inventoryBusiness;
      public InventoryController(ILogger<InventoryController> logger)
      {
        _logger = logger;
         inventoryBusiness = new InventoryBusiness();
      }

      [HttpPost("UploadInventory")]
      
      public async Task<IActionResult> UploadInventory([FromBody] Inventory inventory)
      {
        {
          return await inventoryBusiness.UploadInventory(inventory);

        }

      }
    [HttpDelete("DeleteInventory/{id}")]
    public async Task<IActionResult> DeleteInventory(int id)
    {
      await inventoryBusiness.DeleteInventory(id);
      return new OkResult();
    }


    [HttpPut("EditInventory/{id}")]
    public async Task<IActionResult> EditInventory(int id, [FromBody] Inventory inventory)
    {
      return await inventoryBusiness.EditInventory(id, inventory);
    }

    [HttpGet("GetAllInventory")]
    public async Task<List<Inventory>> GetAllInventory()
    {
      return await inventoryBusiness.GetAllInventoryAsync();
    }
  }
  }
