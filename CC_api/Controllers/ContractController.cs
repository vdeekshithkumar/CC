using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;


namespace CC_api.Controllers
{

  public class ContractController : Controller
  {
    private readonly DatabaseContext dbContext;

    private readonly ILogger<InventoryController> _logger;
    private readonly ContractBusiness _contractBusiness;
    public ContractController(ILogger<InventoryController> logger)
    {
      _logger = logger;
      _contractBusiness = new ContractBusiness();
      this.dbContext = new DatabaseContext();

    }
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, int userId, int companyId, string content, string title)
    {
      // Check if the file is not null
      if (file == null || file.Length == 0)
        return BadRequest("File not selected");

      // Generate a random file name using a GUID
      var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

      // Define the path to save the file
      var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);

      // Save the file
      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(stream);
      }

      // Save the file path to the database
      var contract = new Contract { company_id = companyId, user_id = userId, updated_by = userId, updated_date_time = DateTime.Now, title = title, content = content, uploaded_file = filePath };
      dbContext.contracts.Add(contract);
      await dbContext.SaveChangesAsync();

      // Return the file path
      return Ok(new { filePath, message = "Success" });
    }

    [HttpGet("download/{fileName}")]
    public async Task<IActionResult> Download(string fileName)
    {
      // Define the path to the file
      var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);

      // Check if the file exists
      if (!System.IO.File.Exists(filePath))
        return NotFound();

      // Return the file
      var memory = new MemoryStream();
      using (var stream = new FileStream(filePath, FileMode.Open))
      {
        await stream.CopyToAsync(memory);
      }
      memory.Position = 0;

      return File(memory, "application/pdf", Path.GetFileName(filePath));
    }
  }
}
