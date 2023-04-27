/*using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;
using System.Net;
using System.Text;
using System.ComponentModel.Design;



namespace CC_api.Business



{
  public class AdBusiness
  {
    private readonly AdRepository adRepository;
    public AdBusiness()
    {
      this.adRepository = new AdRepository();
    }





    public async Task<IActionResult> PostAd(Ad ad)
    {
      var a = new Ad();



      a.date_created = ad.date_created;
      a.last_modified = ad.last_modified;
      a.company_id = ad.company_id;
      a.container_type = ad.container_type;
      a.available = ad.available;
      a.maximum = ad.maximum;
      a.minimum = ad.minimum;
      a.port_id = ad.port_id;
      a.updated_by = ad.updated_by;
      a.container_size = ad.container_size;
      await adRepository.PostA(a);
      return new OkResult();

    }



    public async Task<IActionResult> DeleteAd(int id)
    {
      var ad = await adRepository.GetAdById(id);
      if (ad == null)
      {
        return new NotFoundResult();
      }



      await adRepository.DeleteAd(ad.ad_id);
      return new OkResult();
    }





    public async Task<Inventory> GetAdById(int id)
    {
      return await adRepository.GetAdById(id);

    }

    public async Task<List<Ad>> GetAdByIdCID(int companyId)
    {
      return await adRepository.GetAdByIdCID(companyId);
    }


    public async Task<IActionResult> EditAd(int id, Ad ad)
    {
      var ad = await adRepository.GetAdById(id);
      if (ad == null)
      {
        return new NotFoundResult();
      }



      a.date_created = ad.date_created;
      a.last_modified = ad.last_modified;
      a.company_id = ad.company_id;
      a.container_type = ad.container_type;
      a.available = ad.available;
      a.maximum = ad.maximum;
      a.minimum = ad.minimum;
      a.port_id = ad.port_id;
      a.updated_by = ad.updated_by;
      a.container_size = ad.container_size;

      await adRepository.EditAdAsync(a);
      return new OkResult();
    }
  



  }
}
*/
