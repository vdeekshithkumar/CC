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

    public async Task<List<ContainerType>> GetcontainersAsync()
    {
      var containerData = await dbContext.container_type.ToListAsync();
      return containerData;
    }

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

    public async Task<List<long>> GetMyadvertisementCount(string ad_type, int companyId)
    {



      var activeAds = await dbContext.advertisement
      .Where(a => a.company_id == companyId && a.status == "active" && a.ad_type == ad_type).CountAsync();
      var count = new List<long>();
      count.Add(activeAds);

      var PendingAds = await dbContext.advertisement
     .Where(a => a.company_id == companyId && a.status == "pending" && a.ad_type == ad_type).CountAsync();
      count.Add(PendingAds);

      var DraftAds = await dbContext.advertisement
     .Where(a => a.company_id == companyId && a.status == "draft" && a.ad_type == ad_type).CountAsync();
      count.Add(DraftAds);


      return count;
    }

    public async Task Add(Ad ad)
    {
      await dbContext.advertisement.AddAsync(ad);
      await dbContext.SaveChangesAsync();
    }

    public async Task<List<Ad>> GetAdByAdID(int ad_id)
    {
      var ads = await dbContext.advertisement
      .Where(c => c.ad_id == ad_id).ToListAsync();
      return ads;
    }
    public async Task<string> getContainerType(int containerTypeID)
    {
      var containerType = await dbContext.container_type
          .Where(c => c.container_type_id == containerTypeID)
          .Select(c => c.type)
          .FirstOrDefaultAsync();

      return containerType;
    }


    public async Task<List<Ad>> GetAdByCompanyID(int companyID, string operation, string ad_type)
    {

      if (operation == "Active")
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "active" && c.ad_type == ad_type)
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type = c.container_type,
         container_size = c.container_size,
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
         port_of_ad = c.port_of_ad

       })
       .ToListAsync();

        return ads;

      }
      else if (operation == "Pending")
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "pending" && c.ad_type == ad_type)
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type = c.container_type,
         container_size = c.container_size,
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
         port_of_ad = c.port_of_ad
       })
       .ToListAsync();

        return ads;
      }
      else
      {
        var ads = await dbContext.advertisement
       .Where(c => c.company_id == companyID && c.status == "draft" && c.ad_type == ad_type)
       .Select(c => new Ad
       {
         ad_id = c.ad_id,
         date_created = c.date_created,
         from_date = c.from_date,
         expiry_date = c.expiry_date,
         type_of_ad = c.type_of_ad,
         container_type = c.container_type,
         container_size = c.container_size,
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
         port_of_ad = c.port_of_ad
       })
       .ToListAsync();

        return ads;
      }
    }
    public async Task<List<Ad>> GetAllAdvertisementbytype(string ad_type, int companyID)
    {

      return await dbContext.advertisement.Where(c => c.company_id != companyID && c.status == "active").ToListAsync();

    }
    public async Task<List<Ad>> GetAllAdvertisement(string ad_type, int companyID)
    {

      return await dbContext.advertisement.Where(c => c.company_id != companyID && c.status == "active" && c.ad_type == ad_type).ToListAsync();

    }
    public async Task<List<Ad>> GetMyAd(string ad_type, int companyID)
    {

      return await dbContext.advertisement.Where(c => c.company_id == companyID && c.ad_type == ad_type).ToListAsync();

    }
    public async Task<List<long>> GetMyAdscount(string ad_type)
    {



      var buyAds = await dbContext.advertisement
      .Where(a =>  a.type_of_ad == "buy" && a.ad_type == ad_type && a.status == "active").CountAsync();
      var count = new List<long>();
      count.Add(buyAds);

      var sellAds = await dbContext.advertisement
      .Where(a => a.type_of_ad == "sell" && a.ad_type == ad_type && a.status == "active").CountAsync();
      count.Add(sellAds);


      var leaseAds = await dbContext.advertisement
     .Where(a =>  a.type_of_ad == "lease" && a.ad_type == ad_type && a.status == "active").CountAsync();
      count.Add(leaseAds);

      var swapAds = await dbContext.advertisement
     .Where(a => a.type_of_ad == "swap" && a.ad_type == ad_type && a.status == "active").CountAsync();
      count.Add(swapAds);

      var onewayAds = await dbContext.advertisement
    .Where(a => a.type_of_ad == "oneway" && a.ad_type == ad_type && a.status == "active").CountAsync();
      count.Add(onewayAds);
      return count;
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
      var ads = await dbContext.advertisement.FirstOrDefaultAsync(a => a.ad_id == adId);
      return ads;
    }

    public async Task UpdateAd(Ad Ad)
    {
      dbContext.advertisement.Update(Ad);
      await dbContext.SaveChangesAsync();

    }
    public async Task<string> GetPortName(int id)
    {
      var port = await dbContext.ports
      .Where(a => a.port_id == id)
      .Select(c => c.port_name)
     .FirstOrDefaultAsync();



      return port;
    }
    public async Task<int> GetPortId(string portName)
    {
      var port = await dbContext.ports
      .Where(a => a.port_name == portName)
      .Select(c => c.port_id)
     .FirstOrDefaultAsync();



      return port;
    }
    public async Task<List<KeyValuePair<int, string>>> GetAdByCompanyID(int companyID)
    {
      var Ad = dbContext.advertisement.Where(c => c.company_id == companyID);
      var uploadedFiles = Ad.Select(c => new KeyValuePair<int, string>(c.ad_id, c.file)).ToList();
      return uploadedFiles;
    }

    /* public async Task DeleteAd(int AdID)
     {
       dbContext.advertisement.Remove(
        dbContext.advertisement.FirstOrDefault(c => c.ad_id == AdID));
       await dbContext.SaveChangesAsync();
     }*/
  }


}
