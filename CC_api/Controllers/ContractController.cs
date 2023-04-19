using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;


namespace CC_api.Controllers
{
  public class ContractController : Controller
  {
    private readonly ILogger<ContractController> _logger;
    private readonly ContractBusiness contractBusiness;
    public ContractController(ILogger<ContractController> logger)
    {
      _logger = logger;
      contractBusiness = new ContractBusiness();
    }
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, int userId, int companyId, string content, string title)
    {
      {
        return await contractBusiness.UploadContract(contract);



      }

      // Save the file path to the database
      var contract = new Contract { company_id = companyId, user_id = userId, updated_by = userId, updated_date_time = DateTime.Now, title = title, content = content, uploaded_file = filePath };
      dbContext.contracts.Add(contract);
      await dbContext.SaveChangesAsync();

      // Return the file path
      return Ok(new { filePath, message = "Success" });
    }
    /*[HttpPost("Login")]
    public async Task<IActionResult> Login(Login loginmodel)
    {

 

      var login = await userBusiness.Login(loginmodel);
      if (login != null)
      {
        await userBusiness.PopulateJwtTokenAsync(login);

 

        return Ok(login);
      }
      else
      {
        return BadRequest();
      }

 


    }*/
  }
}
