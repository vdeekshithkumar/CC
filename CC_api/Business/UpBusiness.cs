using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;


namespace CC_api.Business
{
  public class UpBusiness
  {
    private readonly UpRepository upRepository;

    public UpBusiness()
    {
      this.upRepository = new UpRepository();

    }


   
    public async Task<IActionResult> AddPermissionAsync(Up up)
    {
      //User userdata= await dbContext.User.FindAsync(user_id);
      var ups = new Up();

    
      ups.user_id = up.user_id;
      ups.permission_id = up.permission_id;
     
      await upRepository.Create(ups);
      return new OkResult();

    }

   
   
   
  }
}
