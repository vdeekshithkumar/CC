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
  public class ContractBusiness
  {



    private readonly ContractRepository contractRepository;

    public ContractBusiness()
    {
      this.contractRepository = new ContractRepository();

    }


    /* public async Task<List<User>> UploadInventory()
     {
       return await userRepository.GetAllUserAsync();
     }*/
    public async Task<IActionResult> UploadContract(Contract contract)
    {
      var ct = new Contract();

      ct.company_id = contract.company_id;
      ct.user_id = contract.user_id;
      ct.content = contract.content;
      ct.title = contract.title;
      ct.upload_file = contract.upload_file;
      ct.updated_by = contract.updated_by;
      ct.updated_date_time = contract.updated_date_time;
     

      await contractRepository.UploadC(ct);
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
