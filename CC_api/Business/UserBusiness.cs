using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
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
    public async Task UpdateUserDetails(int id, User user)
    {
      await this.userRepository.UpdateUserDetails(id, user);
    }

    public async Task<User> GetUserAsync(int userID)
    {
      var userData = await userRepository.GetUserAsync(userID);
      return userData;
    }
    public async Task<IActionResult> UpdatePasswordAsync(int user_id, int company_id, string password)
    {
      try
      {
        await userRepository.UpdatePasswordAsync(user_id, company_id, password);
        return new OkObjectResult(new { message = "Success" });
      }
      catch (Exception ex)
      {
        return new BadRequestObjectResult(ex.Message);
      }
    }
    public async Task<User> GetUserById(int id)
    {
      return await userRepository.GetUserById(id);

    }
    public async Task<int> generateOTP(string email)
    {
      var random = new Random();
      var otp = random.Next(100000, 999999);
      await _emailService.SendOTPAsync(email, otp);
      return otp;
    }
    public async Task<IActionResult> EditUserById(int id, User user)
    {
      var us = await userRepository.GetUserById(id);
      if (us == null)
      {
        return new NotFoundResult();
      }





      us.company_id = user.company_id;
      us.fname = user.fname;
      us.lname = user.lname;
      us.address = user.address;
      us.email = user.email;
      us.phone_no = user.phone_no;
      string hashedPassword = HashPassword(user.password);

      // Set the hashed password to the PasswordHash property
      us.password= hashedPassword;
      us.is_verified = user.is_verified;
      us.is_approved = user.is_approved;
      us.is_active = user.is_active;
      us.last_login = user.last_login;
      us.designation = user.designation;
      us.otp = -1;





      await userRepository.EditUserById(us);
      return new OkResult();
    }


    public async Task DeleteUser(int id)
    {
      await userRepository.DeleteUser(id);
    }
    public async Task<List<User>> GetAllUser(int companyId)
    {
      return await userRepository.GetAllUser(companyId);
    }


    public async Task<List<User>> GetAllUserAsync(int companyId)
    {
      return await userRepository.GetAllUserAsync(companyId);
    }
    public async Task<int> GetAllUserCount(int companyId)
    {
      return await userRepository.GetAllUserCount(companyId);
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
      us.email = user.email;
      us.phone_no = user.phone_no;
      string hashedPassword = HashPassword(user.password);

      // Set the hashed password to the PasswordHash property
      us.password = hashedPassword;
      us.is_verified = user.is_verified;
      us.is_approved = user.is_approved;
      us.is_active = user.is_active;
      us.last_login = user.last_login;
      us.designation = user.designation;
      us.otp = otp;

      await userRepository.Create(us);

      return new OkResult();





    }

    private string HashPassword(string password)
    {
      using (var sha256 = SHA256.Create())
      {
        byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
      }
    }
    public async Task<bool> VerifyOTPAsync(int userId, int otp)
    {
      try
      {
        return await userRepository.VerifyOTPAsync(userId, otp);
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public async Task<AuthResponse> GetUserByEmail(string email)
    {



      var emailValue = await userRepository.GetUserByEmail(email);
      if (emailValue != null)
      {
        return new AuthResponse { User = emailValue, Message = "User found" };
      }
      else
      {
        return new AuthResponse { User = null, Message = "User not found" };
      }




    }


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
                if (login.email == email && login.VerifyPassword(password))
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
            if (login.email == email && login.VerifyPassword(password))
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

  }
}
