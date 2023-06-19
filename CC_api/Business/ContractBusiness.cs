using CC_api.Models;
using CC_api.Repository;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CC_api.Business
{
  public class ContractBusiness
  {
    private readonly ContractRepository contractRepository;
    public ContractBusiness()
    {
      this.contractRepository = new ContractRepository();
    }
    public async Task<IActionResult> UploadContract(Contract contract)
    {
      var con = new Contract();

      con.contract_id = contract.contract_id;
      con.company_id = contract.company_id;
      con.user_id = contract.user_id;
      con.content = contract.content;
      con.title = contract.title;
      con.uploaded_file = contract.uploaded_file;
      con.updated_by = contract.updated_by;
      con.updated_date_time = contract.updated_date_time;

      await contractRepository.UploadC(con);
      return new OkResult();

    }

  }
}
