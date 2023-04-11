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

 

    /*public async Task<User> GetUserByEmailAndPassword(string UserEmail, string password)
    {
      var user = dbContext.users.FirstOrDefault(u => u.email == UserEmail && u.password == password);
        if (user != null)
        {

 

          return user;
        }
        else
        {
          return user;
        }
    }*/

 

    public async Task<User> GetUserByEmailAndPassword(string email, string password)
    {
      return await dbContext.users.Where(u => u.email == email).FirstOrDefaultAsync();
    }

 


    /*public async Task<User> Login(string userEmail, string password)
        {
            var user = dbContext.users.FirstOrDefault(x => x.email == userEmail && x.password == password);
            if (user != null)
            {
                return user;
            }
            else
            {
                return user;
            }
        }*/
  }
}