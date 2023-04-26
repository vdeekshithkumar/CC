using CC_api.Models;
using Microsoft.EntityFrameworkCore;

namespace CC_api.Repository
{
  public class UpRepository
  {
    private readonly DatabaseContext dbContext;
    public UpRepository()
    {
      this.dbContext = new DatabaseContext();
    }
    public async Task Create(Up up)
    {
      dbContext.up_mapping.Add(up);
      await dbContext.SaveChangesAsync();
    }

    public async Task<int> GetUserIdByEmail(string email)
    {
      var user = await dbContext.users.FirstOrDefaultAsync(x => x.email == email);
      if (user == null)
      {
        // Handle case where user is not found
        // You can throw an exception or return a default value, depending on your requirements
        throw new Exception($"User with email {email} not found.");
      }
      return user.user_id;
    }
    public async Task<User> GetUserById(int id)
    {
      return await dbContext.users.FirstOrDefaultAsync(x => x.user_id == id);
    }
    public async Task EditPermission(Up up)
    {
      dbContext.up_mapping.Update(up);
      await dbContext.SaveChangesAsync();
    }
    public async Task AddPermission(Up up)
    {
      dbContext.up_mapping.Add(up);
      await dbContext.SaveChangesAsync();
    }
    public async Task<List<Up>> GetUserPermissionsAsync(int userId)
    {
      return await dbContext.Set<Up>()
          .Where(up => up.user_id == userId)
          .ToListAsync();
    }
    public async Task<List<long>> GetPermissionIds(int userId)
    {
      var mapping = await dbContext.up_mapping
          .Where(up => up.user_id == userId)
          .ToListAsync();

      var permissionIds = new List<long>();
      foreach (var map in mapping)
      {
        permissionIds.Add(map.permission_id);
      }
      return permissionIds;
    }

    public async Task DeletePermission(Up up)
    {
      dbContext.Set<Up>().Remove(up);
      await dbContext.SaveChangesAsync();
    }


  }
}
