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
    public async Task<List<Negotiation>> GetNegotiationByAdId(int ad_id)
    {
      var negotiations = await dbContext.negotiation
          .Where(n => (n.ad_id == ad_id))
          .ToListAsync();

      return negotiations;
    }

    public async Task UpdateNegotiation(Negotiation N)
    {
      dbContext.negotiation.Update(N);
      await dbContext.SaveChangesAsync();
    }
    public async Task<Negotiation> GetNegotiationById(int negotitiation_id)
    {
      var negotiation= await dbContext.negotiation.FirstOrDefaultAsync(n => n.negotiation_id == negotitiation_id);
      return negotiation;
    }

    public async Task<int> GetNegotiationCount(int adid)
    {
      var userCount = await dbContext.negotiation.Where(u => u.ad_id == adid).CountAsync();
      if(userCount>0) {
        return userCount;
      }
      else
      {
        return 0;
      }
      
    }

  
  }
}
