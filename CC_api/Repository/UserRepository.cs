using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



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
          user.is_verified = 1; // set isVerified to true
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


    public async Task<User> GetUserByEmail(string email)
    {
      return await dbContext.users.FirstOrDefaultAsync(x => x.email == email);
    }

    public async Task<int> Create(User user)

    {

      dbContext.users.Add(user);

      await dbContext.SaveChangesAsync();
      return user.user_id;
    }

    public async Task<List<User>> GetAllUserAsync()
    {
      return dbContext.users.ToList();
    }
    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
      return await dbContext.users.Where(u => u.email == email).FirstOrDefaultAsync();
    }
  }
}
