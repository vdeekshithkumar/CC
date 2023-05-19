using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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



    [HttpPost("AddExcel")]
    public async Task<IActionResult> AddExcelData([FromBody] AddExcel payload)
    {

      if (payload.excelData == null || !payload.excelData.Any())
      {
        return BadRequest("Excel data is empty.");
      }
      else
      {
        
        await inventoryBusiness.AddExcelData(payload.excelData,payload.user_id,payload.company_id);
        return Ok();
      }

    }


    [HttpDelete("DeleteInventory/{id}")]
    public async Task<IActionResult> DeleteInventory(int id)
    {
      await inventoryBusiness.DeleteInventory(id);
      return new OkResult();
    }


    [HttpGet("GetInventoryById/{id}")]
    public async Task<Inventory> GetInventoryById(int id)
    {
      return await inventoryBusiness.GetInventoryById(id); 
    }

    [HttpGet("GetInventoryByIdCID/{companyId}")]
    public async Task<List<Inventory>> GetInventoryByIdCID(int companyId)
    {
      return await inventoryBusiness.GetInventoryByIdCID(companyId);
    }


    [HttpDelete("DeleteAllInventory")]
    public async Task<IActionResult> DeleteAllInventory()
    {
      await inventoryBusiness.DeleteAllInventory();
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
    [HttpGet("GetInventoryForMap/{companyId}")]
    public async Task<IActionResult> GetInventoryForMap(int companyId)
    {
      return Json(await inventoryBusiness.GetInventoryForMap(companyId));
    }
  }
  }
