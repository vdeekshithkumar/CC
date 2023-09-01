using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


    public async Task<UserIDResponse> GetUserIdByEmail(string email)
    {

      var emailValue = await upRepository.GetUserIdByEmail(email);
      if (emailValue != null)
      {
        return new UserIDResponse { UserId = emailValue };
      }
      else
      {
        return new UserIDResponse { UserId = -1 };
      }


    }
    public async Task<List<int>> GetPermissions(int userId)
    {
      var permissionIds = await upRepository.GetPermissionIds(userId);
      var permissions = new List<int>();
      foreach (var id in permissionIds)
      {
        permissions.Add((int)id);
      }
      return permissions;
    }
    public async Task<IActionResult> EditPermissionById(List<int> permissionList, int user_id)
    {
      //a user_id should be retrieve method
      if (user_id == null)
      {
        throw new Exception("User not found");
      }
      else
      {

        var existingPermissions = await upRepository.GetUserPermissionsAsync(user_id);
        foreach (var existingPermission in existingPermissions)
        {
          await upRepository.DeletePermission(existingPermission);
        }


        foreach (var permission in permissionList)
        {

          {
            var up = new Up();
            up.user_id = user_id;
            up.permission_id = permission;
            await upRepository.EditPermission(up);
          }



        }
        return new OkResult();
      }
    }
    public async Task<IActionResult> AddPermissionAsync(List<int> permissionList, string emailValue)
    {
      var userId = await upRepository.GetUserIdByEmail(emailValue);//a user_id should be retrieve method
      if (userId == null)
      {
        throw new Exception("User not found");
      }
      else
      {
        foreach (var permission in permissionList)
        {
          var up = new Up();

          up.permission_id = permission;
          up.user_id = userId;
          await upRepository.AddPermission(up);



        }

        return new OkResult();
      }


    }



    public async Task<List<Permissions>> GetAllPermissionAsync()
    {
      return await upRepository.GetAllPermissionAsync();
    }



  }
}












