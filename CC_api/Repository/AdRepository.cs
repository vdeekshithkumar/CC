using CC_api.Models;
using Microsoft.EntityFrameworkCore;



namespace CC_api.Repository
{
  public class AdRepository
  {
    private readonly DatabaseContext dbContext;
    public AdRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task PostAd(Ad Ad)
    {
      dbContext.advertisement.Add(Ad);
      await dbContext.SaveChangesAsync();
    }
    public async Task<string> GetUploadFileID(int userID, int companyID, int AdID)
    {
      //returns the Ad name stored in db which matches to file id in the Drive folder
      var Ad = await dbContext.advertisement
      .Where(a => a.posted_by == userID && a.company_id == companyID && a.ad_id == AdID)
      .Select(c => c.file)
      .FirstOrDefaultAsync();

      return Ad;
    }
    public async Task<string> GetFileIDbyAdID(int AdID)
    {
      var fileID = await dbContext.advertisement
        .Where(c => c.ad_id.Equals(AdID))
        .Select(c => c.file)
        .FirstOrDefaultAsync();
      return fileID;
    }
    public async Task<List<KeyValuePair<int, string>>> GetAdByCompanyID(int companyID)
    {
      var Ad = dbContext.advertisement.Where(c => c.company_id == companyID);
      var uploadedFiles = Ad.Select(c => new KeyValuePair<int, string>(c.ad_id, c.file)).ToList();
      return uploadedFiles;
    }
    public async Task DeleteAd(int AdID)
    {
      dbContext.advertisement.Remove(
       dbContext.advertisement.FirstOrDefault(c => c.ad_id == AdID));
      await dbContext.SaveChangesAsync();
    }
  }
}
