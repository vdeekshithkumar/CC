using CC_api.Models;
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

      //try

      //{

      // set the OTP in the user object

      /*  user.is_verified = 0; */// set isVerified to false initially



      // save the user to the database

      dbContext.users.Add(user);

      await dbContext.SaveChangesAsync();



      return user.user_id;

      //}

      //catch (Exception ex)

      //{

      //  throw ex;

      //}





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
