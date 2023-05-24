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

    //to return file also for ad use this below code//
    /*  public async Task<List<Ad>> GetAdByCompanyID(int companyID, string operation)
      {
        if (operation == "Active")
        {
          return await dbContext.advertisement.Where(c => c.company_id == companyID && c.status == "active").ToListAsync();
        }
        else if (operation == "Pending")
        {
          return await dbContext.advertisement.Where(c => c.company_id == companyID && c.status == "pending").ToListAsync();
        }
        else
        {
          return await dbContext.advertisement.Where(c => c.company_id == companyID && c.status == "draft").ToListAsync();

        }
      }*/


    public async Task<List<long>> GetAdsCount(int companyId)
    {



      var activeAds = await dbContext.advertisement
      .Where(a => a.company_id == companyId && a.status == "active").CountAsync();
      var count = new List<long>();
      count.Add(activeAds);

      var PendingAds = await dbContext.advertisement
     .Where(a => a.company_id == companyId && a.status == "pending").CountAsync();
      count.Add(PendingAds);

      var DraftAds = await dbContext.advertisement
     .Where(a => a.company_id == companyId && a.status == "draft").CountAsync();
      count.Add(DraftAds);


      return count;
    }

    public async Task Add(Ad ad)
    {
      await dbContext.advertisement.AddAsync(ad);
      await dbContext.SaveChangesAsync();
    }

    public async Task<List<Ad>> GetAdByCompanyID(int companyID, string operation)
    {

      if (operation == "Active")
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "active")
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type_id = c.container_type_id,
         price = c.price,
         status = c.status,
         quantity = c.quantity,
         port_id = c.port_id,
         company_id = c.company_id,
         posted_by = c.posted_by,
         contents = c.contents,
         port_of_departure = c.port_of_departure,
         port_of_arrival = c.port_of_arrival,
         free_days = c.free_days,
         per_diem = c.per_diem,
         pickup_charges = c.pickup_charges,

       })
       .ToListAsync();

        return ads;

      }
      else if (operation == "Pending")
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "pending")
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type_id = c.container_type_id,
         price = c.price,
         status = c.status,
         quantity = c.quantity,
         port_id = c.port_id,
         company_id = c.company_id,
         posted_by = c.posted_by,
         contents = c.contents,
         port_of_departure = c.port_of_departure,
         port_of_arrival = c.port_of_arrival,
         free_days = c.free_days,
         per_diem = c.per_diem,
         pickup_charges = c.pickup_charges,

       })
       .ToListAsync();

        return ads;
      }
      else
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "draft")
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type_id = c.container_type_id,
         price = c.price,
         status = c.status,
         quantity = c.quantity,
         port_id = c.port_id,
         company_id = c.company_id,
         posted_by = c.posted_by,
         contents = c.contents,
         port_of_departure = c.port_of_departure,
         port_of_arrival = c.port_of_arrival,
         free_days = c.free_days,
         per_diem = c.per_diem,
         pickup_charges = c.pickup_charges,

       })
       .ToListAsync();

        return ads;
      }
    }
    public async Task<List<Ad>> GetAllAdvertisement(int companyID)
    {

      return await dbContext.advertisement.Where(c => c.company_id != companyID).ToListAsync();

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
    public async Task<Ad> GetAdById(int adId)
    {
      var ads= await dbContext.advertisement.FirstOrDefaultAsync(a => a.ad_id == adId);
      return ads;
    }

    public async Task UpdateAd(Ad Ad)
    {
      dbContext.advertisement.Update(Ad);
      await dbContext.SaveChangesAsync();
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

