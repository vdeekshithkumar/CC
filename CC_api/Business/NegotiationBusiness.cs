using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;



namespace CC_api.Business
{
  public class NegotiationBusiness
  {
    private readonly NegotiationRepository NegotiationRepository;
    private readonly EmailService _emailService;
    public NegotiationBusiness()
    {
      this.NegotiationRepository = new NegotiationRepository();
      this._emailService = new EmailService();

    }
   
    public async Task<int> GetNegotiationCount(int adid)
    {
      return await NegotiationRepository.GetNegotiationCount(adid);
    }
   
  }
}
