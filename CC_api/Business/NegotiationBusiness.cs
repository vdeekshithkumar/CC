using Azure;
using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;



namespace CC_api.Business
{
  public class NegotiationBusiness
  {
    private readonly NegotiationRepository NegotiationRepository;
    private readonly AdRepository AdRepository;
    private readonly EmailService _emailService;
    public NegotiationBusiness()
    {
      this.NegotiationRepository = new NegotiationRepository();
      this.AdRepository = new AdRepository();
      this._emailService = new EmailService();

    }

    public async Task<IActionResult> StartNegotiation(int ad_id, int company_id, int user_id)
    {
      var Ads = await this.AdRepository.GetAdByAdID(ad_id);
      foreach (var item in Ads)
      {

        var n = new Negotiation();

        DateTime currentDate = DateTime.Now;

        n.user_id = user_id;
        n.ad_id = ad_id;
        n.price = item.price;
        n.negotiation_type = item.type_of_ad;
        var container_type = await this.AdRepository.getContainerType(item.container_type_id);
        n.container_type = container_type;
        n.quantity = item.quantity;
        n.status = "pending";
        n.company_id = company_id;
        n.contract_id = null;
        n.date_created = currentDate;
        n.expiry_date = item.expiry_date;
        n.updated_by = user_id;
        await NegotiationRepository.Add(n);

      }
      return new OkResult();
    }


    public async Task DeleteNegotiation(Negotiation n)
    {
      try
      {


        if (n != null)
        {
          n.status = "rejected";
          await NegotiationRepository.UpdateNegotiation(n);

        }
      }
      catch (Exception ex)
      {
        // handle the exception here, e.g. log it or throw a custom exception
      }
    }

    public async Task AcceptNegotiation(Negotiation n)
    {
      try
      {


        if (n != null)
        {
          n.status = "accepted";
          await NegotiationRepository.UpdateNegotiation(n);

        }
      }
      catch (Exception ex)
      {
        // handle the exception here, e.g. log it or throw a custom exception
      }
    }


    public async Task<int> GetNegotiationCount(int adid)
    {
      return await NegotiationRepository.GetNegotiationCount(adid);
    }

  }
}
