using CC_api.Models;

namespace CC_api.Repository
{
    public class UserRepository
    {
        private readonly UserContext dbContext;
        public UserRepository()
        {
            this.dbContext = new UserContext();
        }

        public async Task Create(User user)
       {
           dbContext.ccusersdb.Add(user);
            await dbContext.SaveChangesAsync();
        }
        public async Task<List<User>> GetAllUserAsync()
        {
            return dbContext.ccusersdb.ToList();
        }
        public async Task<User> Login(string userEmail, string password)
        {
            var user = dbContext.ccusersdb.FirstOrDefault(x => x.Email == userEmail && x.Password == password);
            if (user != null)
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
