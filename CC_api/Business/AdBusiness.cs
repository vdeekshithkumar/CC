using CC_api.Models;
using CC_api.Repository;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;


namespace CC_api.Business
{
  public class AdBusiness
  {
    private string PathToServiceAccountKeyFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "client_secret.json");
    private const string ServiceAccountEmail = "cc-436@cc-repository.iam.gserviceaccount.com";
    private const string DirectoryId = "1w4uzPE0UuoaQVeKDLALs4l1ceqUFfLMS";


    private readonly AdRepository AdRepository;
    public AdBusiness()
    {
      this.AdRepository = new AdRepository();
    }

    public async Task UpdateAdStatus(int adId)
    {
      try
      {
        var ad = await AdRepository.GetAdById(adId);

        if (ad != null)
        {
          ad.status = "active";
          await AdRepository.UpdateAd(ad);
         
        }
      }
      catch (Exception ex)
      {
        // handle the exception here, e.g. log it or throw a custom exception
      }
    }

    public async Task<IActionResult> AddExcelData(List<Ad> excelData, int user_id, int company_id)
    {
  


      if (excelData == null || excelData.Count == 0)
      {
        throw new System.Exception("Excel data is empty.");
      }
      else
      {

        foreach (var item in excelData)
        {
          //
          var ad = new Ad();

          DateTime currentDate = DateTime.Now;

          ad.ad_id = item.ad_id;
          ad.date_created = item.date_created;
          ad.from_date = item.from_date;
          ad.expiry_date = item.expiry_date;
          ad.type_of_ad = item.type_of_ad;
          ad.container_type_id = item.container_type_id;
          ad.price = item.price;
          ad.status = "pending";
          ad.quantity = item.quantity;
          ad.port_id = item.port_id;
          ad.company_id = company_id;
          ad.posted_by = user_id;
          ad.contents = item.contents;
          ad.port_of_departure = item.port_of_departure;
          ad.port_of_arrival = item.port_of_arrival;
          ad.free_days = item.free_days;
          ad.per_diem = item.per_diem;
          ad.pickup_charges = item.pickup_charges;
          ad.file = "NA";


          await AdRepository.PostAd(ad);
          return new OkResult();

        }
        return new OkResult();

      }



    }



    public async Task<IActionResult> UpdateAd(Ad Ad)
    {
      var existingAd = await AdRepository.GetAdById(Ad.ad_id);

      if (existingAd == null)
      {
        return new NotFoundResult();
      }

      existingAd.date_created = Ad.date_created;
      existingAd.from_date = Ad.from_date;
      existingAd.expiry_date = Ad.expiry_date;
      existingAd.type_of_ad = Ad.type_of_ad;
      existingAd.container_type_id = Ad.container_type_id;
      existingAd.price = Ad.price;
      existingAd.status = Ad.status;
      existingAd.quantity = Ad.quantity;
      existingAd.port_id = Ad.port_id;
      existingAd.company_id = Ad.company_id;
      existingAd.posted_by = Ad.posted_by;
      existingAd.contents = Ad.contents;
      existingAd.port_of_departure = Ad.port_of_departure;
      existingAd.port_of_arrival = Ad.port_of_arrival;
      existingAd.free_days = Ad.free_days;
      existingAd.per_diem = Ad.per_diem;
      existingAd.pickup_charges = Ad.pickup_charges;
      existingAd.file = Ad.file;

      await AdRepository.UpdateAd(existingAd);

      return new OkResult();
    }

    public async Task<IActionResult> PostAd(Ad Ad)
    {
      var ad = new Ad();

      ad.ad_id = Ad.ad_id;
      ad.date_created = Ad.date_created;
      ad.from_date = ad.from_date;
      ad.expiry_date = Ad.expiry_date;
      ad.type_of_ad = Ad.type_of_ad;
      ad.container_type_id = Ad.container_type_id;
      ad.price = Ad.price;
      ad.status = Ad.status;
      ad.quantity = Ad.quantity;
      ad.port_id = Ad.port_id;
      ad.company_id=Ad.company_id;
      ad.posted_by = Ad.posted_by;
      ad.contents = Ad.contents;
      ad.port_of_departure= Ad.port_of_departure;
      ad.port_of_arrival= Ad.port_of_arrival;
      ad.free_days= Ad.free_days;
      ad.per_diem= Ad.per_diem;
      ad.pickup_charges= Ad.pickup_charges;
      ad.file = Ad.file;
 

      await AdRepository.PostAd(ad);
      return new OkResult();

    }

  }
}


