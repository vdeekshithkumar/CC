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
      var Negotiations = await dbContext.negotiation
     .Where(n => n.ad_id == ad_id && n.status == "active").ToListAsync();
      foreach (var negotiation in Negotiations)
      {
        if (negotiation.contract_id == null) // Replace "ColumnName" with the actual name of the nullable column
        {
          negotiation.contract_id = -1; // Replace "ColumnName" with the actual name of the nullable column
        }
      }
      return Negotiations;
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
