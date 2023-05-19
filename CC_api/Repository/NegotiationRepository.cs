using CC_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace CC_api.Repository
{
  public class NegotiationRepository
  {
    private readonly DatabaseContext dbContext;
    public NegotiationRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task<int> GetNegotiationCount(int adid)
    {
      var userCount = await dbContext.negotiation.Where(u => u.ad_id == adid).CountAsync();
      return userCount;
    }

  
  }
}
