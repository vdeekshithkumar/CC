using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
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

       /* public async Task<List<User>> UploadInventory()
      {
        return await userRepository.GetAllUserAsync();
      }*/
      
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
      inv.port_id = inventory.port_id;
      inv.updated_by = inventory.updated_by;

      await inventoryRepository.UploadI(inv);
        return new OkResult();

      }
/*
    public async Task<AuthenticationModel> Login(Login loginmodel)
    {
      var login = await userRepository.Login(loginmodel.Email, loginmodel.Password);
      var authmodel = new AuthenticationModel();
      if (login != null)
      {
        authmodel.Email = login.Email;
        authmodel.Password = login.Password;
        return authmodel;
      }
      return null;
    }
    public async Task PopulateJwtTokenAsync(AuthenticationModel authModel)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("!@#$%^&*()!@#$%^&*()");
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
                        new Claim(ClaimTypes.Email, authModel.Email.ToString()),
          }),
        Expires = authModel.TokenExpiryDate = DateTime.UtcNow.AddMinutes(50),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
      };

      var token = tokenHandler.CreateToken(tokenDescriptor);
      authModel.Token = tokenHandler.WriteToken(token);
    }
  }
}*/


}
}
