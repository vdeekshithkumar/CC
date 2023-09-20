using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Security.Cryptography;
using System.Text;

namespace CC_api.Repository
{
  public class UserRepository
  {
    private readonly DatabaseContext dbContext;
    public UserRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task<User> GetUserAsync(int userId)
    {
      var userdata = dbContext.users.FirstOrDefault(u => u.user_id == userId);
      return userdata;
    }
    public async Task<User> GetUser(string username)
    {
      var userdata = dbContext.users.FirstOrDefault(u => u.first_name == username);
      return userdata;
    }
    public async Task<List<User>> GetAllUsers()
    {
      return dbContext.users.ToList();
    }
    public async Task UpdatePasswordAsync(int user_id, int company_id, string password)
    {
      var user = await dbContext.users.FirstOrDefaultAsync(u => u.user_id == user_id && u.company_id == company_id);
      if (user != null)
      {

        user.password = password;
        await dbContext.SaveChangesAsync();
      }
    }
    public async Task<bool> VerifyOTPAsync(int userId, int otp)
    {
      try
      {
        var user = await dbContext.users.FirstOrDefaultAsync(u => u.user_id == userId && u.otp == otp);



        if (user == null)
        {
          return false;
        }
        else
        {
          user.is_verified = true; // set isVerified to true
          user.otp = -1; // clear the OTP from the database

          dbContext.Update(user);
          await dbContext.SaveChangesAsync();



          return true; // OTP verification successful
        }// OTP verification failed




      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public async Task UpdateOtp(string email, int otp)
    {
      var Emailuser = await dbContext.users.FirstOrDefaultAsync(x => x.email == email);

      if (Emailuser != null)
      {
        Emailuser.otp = otp;
        dbContext.users.Update(Emailuser);
        await dbContext.SaveChangesAsync();

      }

    }



    public async Task<User> GetUserByEmail(string email)
    {
      var user = await dbContext.users.FirstOrDefaultAsync(x => x.email == email);

      if (user != null)
      {
        if (string.IsNullOrEmpty(user.city))
        {
          user.city = null;
        }

        if (string.IsNullOrEmpty(user.phone_no))
        {
          user.phone_no = null;
        }
      }

      return user;
    }


    public async Task<int> Create(User user)

    {

      dbContext.users.Add(user);

      await dbContext.SaveChangesAsync();
      return user.user_id;
    }
    public async Task<List<User>> GetAllUser(int companyId)
    {
      var u = await dbContext.users.Where(u => u.company_id != companyId).ToListAsync();
      return u;
    }
    public async Task<List<User>> GetAllCompanyUser(int companyId)
    {
      return await dbContext.users.Where(u => u.company_id == companyId).ToListAsync();

    }
    public async Task<List<User>> GetAllUserAsync(int companyId)
    {
      return await dbContext.users.Where(u => u.company_id == companyId && u.designation != "admin" && u.is_active == true).ToListAsync();

    }
    public async Task<int> GetAllUserCount(int companyId)
    {
      var userCount = await dbContext.users.Where(u => u.company_id == companyId && u.is_active == true).CountAsync();
      return userCount;
    }

    public async Task DeleteUser(int userId)
    {
      var user = await dbContext.users.FirstOrDefaultAsync(x => x.user_id == userId);

      if (user != null)
      {
        user.is_active = false;
        dbContext.users.Update(user);
        await dbContext.SaveChangesAsync();
      }
    }


    public async Task EditUserById(User user)
    {
      dbContext.users.Update(user);
      //dbContext.Entry(user).State = EntityState.Modified;
      await dbContext.SaveChangesAsync();
    }
    //public async Task<User> GetUserByEmailAndPassword(string email, string password)
    //{
    //  return await dbContext.users.Where(u => u.email == email).FirstOrDefaultAsync();
    //}
    public async Task<User> GetUserById(int id)
    {
      return await dbContext.users.FirstOrDefaultAsync(x => x.user_id == id);
    }

    public async Task<User> AuthenticateUser(string email, string password)
    {
      var user = await dbContext.users
          .Where(u => u.email == email)
          .FirstOrDefaultAsync();

      if (user != null && user.VerifyPassword(password))
      {
        return user;
      }

      return null;
    }


    public async Task<int> GetSenderCidBySenderId(int senderId)
    {
      var user = await dbContext.users
          .Where(u => u.user_id == senderId)
          .Select(u => u.company_id)
          .FirstOrDefaultAsync();

      if (user != null)
      {
        return user;
      }

      // Return a default value or throw an exception if necessary
      return 0; // Change this to an appropriate default value or handling
    }


    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
      var user = await GetUserByEmail(email);
      if (user != null)
      {
        return user;
      }
      else
      {
        return null;
      }

    }
    public async Task UpdateUserDetails(int id, User updatedUser)
    {
      var user = await dbContext.users.FirstOrDefaultAsync(u => u.user_id == id);

      if (user != null)
      {
        user.first_name = updatedUser.first_name;
        user.last_name = updatedUser.last_name;
        user.phone_no = updatedUser.phone_no;
        user.address = updatedUser.address;

        await dbContext.SaveChangesAsync();
      }
    }


  }



}
