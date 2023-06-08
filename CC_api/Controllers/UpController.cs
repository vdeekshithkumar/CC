using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;



namespace CC_api.Controllers
{
  public class UpController : Controller
  {
    private readonly ILogger<UpController> _logger;
    private readonly UpBusiness upBusiness;



    public UpController(ILogger<UpController> logger)
    {
      _logger = logger;
      upBusiness = new UpBusiness();




    }




    [HttpPost("AddPermission")]
    public async Task<IActionResult> AddPermissionAsync([FromBody] Permission permission)
    {
      var userId = await upBusiness.GetUserIdByEmail(permission.emailValue);
      if (userId != null)
      {
        await upBusiness.AddPermissionAsync(permission.ppList, permission.emailValue);
        return Ok();
      }
      else
      {
        return BadRequest();
      }
    }


    [HttpPut("EditPermission/{user_id}")]
    public async Task<IActionResult> EditPermissionAsync([FromBody] Permission permission)
    {
      return await upBusiness.EditPermissionById(permission.ppList, permission.user_id);
    }

    [HttpGet("UserPermissions")]
    public async Task<IActionResult> GetPermissions(int user_id)
    {
      var permissions = await upBusiness.GetPermissions(user_id);
      return Ok(permissions);
    }


    [HttpGet("GetAllPermission")]
    public async Task<List<Permissions>> GetAllPermission()
    {
      return await upBusiness.GetAllPermissionAsync();
    }



  }
}

