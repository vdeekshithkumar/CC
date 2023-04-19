using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;



namespace CC_api.Controllers
{
  public class UserController : Controller
  {
    private readonly ILogger<UserController> _logger;
    private readonly UserBusiness userBusiness;

    public UserController(ILogger<UserController> logger)
    {
      _logger = logger;
      userBusiness = new UserBusiness();
    }
    [HttpGet("GetUserDetails")]
    public async Task<IActionResult> GetUserAsync(int userId)
    {
      return Ok(await userBusiness.GetUserAsync(userId));
    }

    [HttpGet("GetAllUser")]
    public async Task<List<User>> GetAllUser()
    {
      return await userBusiness.GetAllUserAsync();
    }


    

    [HttpPost("VerifyOTP")]
    public async Task<IActionResult> VerifyOTPAsync([FromBody] VerifyOTPRequest payload)
    {
      try
      {
        var result = await userBusiness.VerifyOTPAsync(payload.UserId, payload.otp);



        if (result)
          return Ok(new { message = "OTP verified successfully." });
        else
          return Ok(new { message = "OTP verification failed." });
      }
      catch (Exception ex)
      {
        return BadRequest();
      }
    }

    [HttpPost("SaveUser")]

    public async Task<IActionResult> SaveUserAsync([FromBody] User user)
    {
      {
        return await userBusiness.SaveUserAsync(user);



      }
    }

    [HttpGet("GetUserByEmail/{email}")]
    public async Task<IActionResult> GetUserByEmail(string email)
    {
      try
      {
        var user = await userBusiness.GetUserByEmail(email);
        if (user == null)
        {
          return NotFound(new { message = "User not found" });
        }
        return Ok(user);
      }
      catch (Exception ex)
      {
        return BadRequest();
      }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] Login user)
    {
      try
      {
        var loginUser = await userBusiness.GetUserByEmailAndPassword(user.email, user.password);
        if (loginUser == null)
        {
          return Ok(new { message = "User not exist", user = loginUser });
        }



        return Ok(loginUser);
      }
      catch (Exception ex)
      {
        return BadRequest();
      }
    }
  }
}
