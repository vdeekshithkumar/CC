using CC_api.Models;
using CC_api.Repository;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Runtime.InteropServices;


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

    public async Task UpdateAdStatus(Ad ad)
    {
      try
      {


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

    public async Task DeleteAd(Ad ad)
    {
      try
      {


        if (ad != null)
        {
          ad.status = "deleted";
          await AdRepository.UpdateAd(ad);

        }
      }
      catch (Exception ex)
      {
        // handle the exception here, e.g. log it or throw a custom exception
      }
    }


    public async Task<IActionResult> AdImportData(List<AdData> item, int user_id, int company_id)

    {





      if (item == null || item.Count == 0)

      {

        throw new System.Exception("Excel data is empty.");

      }

      else

      {



        foreach (var i in item)

        {

          //



          var ad_for_port = await AdRepository.GetPortName(i.port_id);


          if (ad_for_port == null)

          {

            ad_for_port = "NA";



          }

          var ad = new Ad();


          DateTime currentDate = DateTime.Now.ToUniversalTime();





          ad.ad_id = i.ad_id;

          ad.date_created = i.date_created.ToUniversalTime();

          ad.from_date = i.from_date.ToUniversalTime();

          ad.expiry_date = i.expiry_date.ToUniversalTime();

          ad.type_of_ad = i.type_of_ad;



          ad.price = i.price;

          ad.status = i.status;

          ad.quantity = i.quantity;

          ad.port_id = i.port_id;

          ad.company_id = company_id;

          ad.posted_by = user_id;

          ad.contents = i.contents;

          ad.container_type = i.container_type;
          ad.container_size = i.container_size;

          ad.port_of_ad = i.port_of_ad;

          ad.ad_type = i.ad_type;

          ad.port_of_departure = i.port_of_departure;

          ad.port_of_arrival = i.port_of_arrival;

          ad.free_days = i.free_days;

          ad.per_diem = i.per_diem;

          ad.pickup_charges = i.pickup_charges;

          ad.file = "NA";





          await AdRepository.PostAd(ad);





        }

        return new OkResult();



      }





    }



    public async Task<String> GetPortName(int id)

    {

      return await AdRepository.GetPortName(id);



    }

    public async Task<int> GetPortId(string portName)

    {

      return await AdRepository.GetPortId(portName);



    }
    public async Task<List<int>> GetAdsCount(int companyId)
    {
      var AdsCount = await AdRepository.GetAdsCount(companyId);
      var count = new List<int>();
      foreach (var c in AdsCount)
      {
        count.Add((int)c);
      }
      return count;
    }

    public async Task<List<int>> GetMyadvertisementCount(string ad_type, int companyId)
    {
      var AdsCount = await AdRepository.GetMyadvertisementCount(ad_type, companyId);
      var count = new List<int>();
      foreach (var c in AdsCount)
      {
        count.Add((int)c);
      }
      return count;
    }

    public async Task<List<int>> GetMyAdscount(string ad_type)
    {
      var GetMyAdscount = await AdRepository.GetMyAdscount(ad_type);
      var count = new List<int>();
      foreach (var c in GetMyAdscount)
      {
        count.Add((int)c);
      }
      return count;
    }
    public async Task<IActionResult> UpdateAd(Ad Ad)
    {
      var existingAd = await AdRepository.GetAdById(Ad.ad_id);

      if (existingAd == null)
      {
        return new NotFoundResult();
      }

      existingAd.date_created = Ad.date_created.ToUniversalTime();
      existingAd.from_date = Ad.from_date.ToUniversalTime();
      existingAd.expiry_date = Ad.expiry_date.ToUniversalTime();
      existingAd.type_of_ad = Ad.type_of_ad;
      existingAd.container_type = Ad.container_type;
      existingAd.container_size = Ad.container_size;
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
      ad.date_created = Ad.date_created.ToUniversalTime();
      ad.from_date = ad.from_date.ToUniversalTime();
      ad.expiry_date = Ad.expiry_date.ToUniversalTime();
      ad.type_of_ad = Ad.type_of_ad;
      ad.container_type = Ad.container_type;
      ad.container_size = Ad.container_size;
      ad.price = Ad.price;
      ad.status = Ad.status;
      ad.quantity = Ad.quantity;
      ad.port_id = Ad.port_id;
      ad.company_id = Ad.company_id;
      ad.posted_by = Ad.posted_by;
      ad.contents = Ad.contents;
      ad.port_of_departure = Ad.port_of_departure;
      ad.port_of_arrival = Ad.port_of_arrival;
      ad.free_days = Ad.free_days;
      ad.per_diem = Ad.per_diem;
      ad.port_of_ad = Ad.port_of_ad;
      ad.ad_type = Ad.ad_type;
      ad.pickup_charges = Ad.pickup_charges;
      ad.file = Ad.file;


      await AdRepository.PostAd(ad);
      return new OkResult();

    }

  }

}
