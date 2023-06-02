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
    public async Task Add(Negotiation n)
    {
      await dbContext.negotiation.AddAsync(n);
      await dbContext.SaveChangesAsync();
    }
    public async Task UpdateNegotiation(Negotiation N)
    {
      dbContext.negotiation.Update(N);
      await dbContext.SaveChangesAsync();
    }
    public async Task<List<Negotiation>> GetAllNegotiation(int companyID)
    {
      return await dbContext.negotiation.ToListAsync();
      /*  return await dbContext.company.Where(c => c.company_id != companyID).ToListAsync();*/
    }
    public async Task<Negotiation> GetNegotiationById(int negotitiation_id)
    {
      var negotiation= await dbContext.negotiation.FirstOrDefaultAsync(n => n.negotiation_id == negotitiation_id);
      return negotiation;
    }
    public async Task<List<Negotiation>> GetNegotiationByCId(int company_id)
    {
      var negotiations = await dbContext.negotiation
          .Where(n => (n.company_id == company_id))
          .ToListAsync();

      return negotiations;
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
