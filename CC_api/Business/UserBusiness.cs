using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

 

namespace CC_api.Business
{
  public class UserBusiness
  {
    private readonly UserRepository userRepository;
    private readonly EmailService _emailService;
    public UserBusiness()
    {
      this.userRepository = new UserRepository();
      this._emailService = new EmailService();

    }
    public async Task<User> GetUserAsync(int userID)
    {
      var userData = await userRepository.GetUserAsync(userID);
      return userData;
    }
    public async Task<IActionResult> UpdatePasswordAsync(int user_id, int company_id, string password)
    {
      await userRepository.UpdatePasswordAsync(user_id, company_id, password);
      return new OkResult();
    }
    public async Task<List<User>> GetAllUserAsync()
    {
      return await userRepository.GetAllUserAsync();
    }
    public async Task<IActionResult> SaveUserAsync(User user)
    {

      var random = new Random();
      DateTime expirationTime = DateTime.Now.AddMinutes(5);
      var otp = random.Next(100000, 999999);

      await _emailService.SendOTPAsync(user.email, otp);




      var us = new User();



            us.company_id = user.company_id;
            us.fname = user.fname;
            us.lname = user.lname;
            us.address = user.address;    
            us.email= user.email;
            us.phone_no = user.phone_no;
            us.password = user.password;
            us.is_verified = user.is_verified;
            us.is_approved = user.is_approved;
            us.is_active = user.is_active;
            us.last_login = user.last_login;
            us.designation = user.designation;

      await userRepository.Create(us);
            return new OkResult();

 

        }
    /*   public async Task<AuthenticationModel> GetUserByEmailAndPassword(string email, string password)
       {
         var login = await userRepository.GetUserByEmailAndPassword(email, password);
         var authmodel = new AuthenticationModel();
         if (login != null)
         {
           authmodel.email = login.email;
           authmodel.password = login.password;
           return authmodel;

 

         }

 

         return null;
       }*/

 


    public async Task<AuthResponse> GetUserByEmailAndPassword(string email, string password)
     {
         var login = await userRepository.GetUserByEmailAndPassword(email, password);
         if (login != null)
         {

 

              if (login.is_active == 1)
                {
                  if (login.designation == "admin")
                  {
                      if (login.is_approved == 1)
                      {
                          if (login.is_verified == 1)
                          {

 

                              if (login.email == email && login.password == password)
                              {

 

                                return new AuthResponse { User = login, Message = "Admin Login Successful", Token = null };
                              }
                              else
                              {
                                return new AuthResponse { User = null, Message = "Admin Password Mismatched", Token = null };
                              }
                          }
                          else
                          {
                            return new AuthResponse { User = null, Message = "Not Verified", Token = null };
                          }
                      }
                      else
                      {
                        return new AuthResponse { User = null, Message = "Account Not Approved Yet", Token = null };
                      }
                  }
                  else
                  {
                      if (login.email == email && login.password == password)
                      {

 

                        return new AuthResponse { User = login, Message = "User Login Successful", Token = null };
                      }
                      else
                      {
                        return new AuthResponse { User = null, Message = "User Password Mismatched", Token = null };
                      }
                  }
                }
              else
               {


                   return new AuthResponse { User = null, Message = "Account Not Active", Token = null };

              }



          }
          else
          {
            return new AuthResponse { User = null, Message = "User Not Found", Token = null };
          }
    }

 

    /* public async Task<AuthenticationModel> Login(Login loginmodel)
         {
             var login = await userRepository.Login(loginmodel.email, loginmodel.password);
             var authmodel = new AuthenticationModel();
             if (login != null)
             { 
                 authmodel.Email = login.email;
                 authmodel.Password = login.password;
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
         }*/
  }
}

