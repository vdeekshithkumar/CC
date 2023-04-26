using CC_api.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;
using System.Diagnostics.Contracts;

namespace CC_api.Repository
{
  public class ContractRepository
  {
    private readonly DatabaseContext dbContext;
    public ContractRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task UploadC(CC_api.Models.Contract contract)
    {
      dbContext.contracts.Add(contract);
      await dbContext.SaveChangesAsync();
    }
    public async Task<string> GetUploadFileID(int userID, int companyID, int contractID)
    {
      //returns the contract name stored in db which matches to file id in the Drive folder
      var contract = await dbContext.contracts
      .Where(c => c.user_id == userID && c.company_id == companyID && c.contract_id == contractID)
      .Select(c => c.uploaded_file)
      .FirstOrDefaultAsync();

      return contract;
    }
    public async Task<string> GetFileIDbyContractID(int contractID)
    {
      var fileID = await dbContext.contracts
        .Where(c => c.contract_id.Equals(contractID))
        .Select(c => c.uploaded_file)
        .FirstOrDefaultAsync();
      return fileID;
    }
    public async Task<List<KeyValuePair<int, string>>> GetContractsByCompanyID(int companyID)
    {
      var contracts = dbContext.contracts.Where(c => c.company_id == companyID);
      var uploadedFiles = contracts.Select(c => new KeyValuePair<int, string>(c.contract_id, c.uploaded_file)).ToList();
      return uploadedFiles;
    }
    public async Task DeleteContract(int contractID)
    {
      dbContext.contracts.Remove(
       dbContext.contracts.FirstOrDefault(c => c.contract_id == contractID));
      await dbContext.SaveChangesAsync();
    }
  }
}
