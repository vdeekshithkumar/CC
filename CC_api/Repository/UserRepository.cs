using CC_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Repository
{
    public class UserRepository
    {
        private readonly DatabaseContext dbContext;
        public UserRepository()
        {
            this.dbContext = new DatabaseContext();
        }

        public async Task Create(User user)
       {
           dbContext.users.Add(user);
            await dbContext.SaveChangesAsync();
        }
        public async Task<List<User>> GetAllUserAsync()
        {
            return dbContext.users.ToList();
        }
        public async Task<User> Login(string email, string password)
        {
            var user = dbContext.users.FirstOrDefault(x => x.email == email && x.password == password);
            if (user == null)
            {
                return user;
            }
            else
            {
                return user;
            }
        }
    }
}
