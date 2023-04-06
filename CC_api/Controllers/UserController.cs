using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Identity;
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

        [HttpGet("GetAllUser")]
        public async Task<List<User>> GetAllUser()
        {
            return await userBusiness.GetAllUserAsync();
        }

        [HttpPost("SaveUser")]
        
        public async Task<IActionResult> SaveUserAsync([FromBody] User user)
        {
            {
                return await userBusiness.SaveUserAsync(user);

            }

    
}


[HttpPost("Login")]
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


        }
    }
}
