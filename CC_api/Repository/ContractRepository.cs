
using CC_api.Models;
using Google.Apis.Drive.v3.Data;
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
    public async Task<string> GetFolderId(string Title, int companyID)
    {
      var folderID = await dbContext.contracts.Where(c => c.company_id == companyID && c.title == Title)
        .Select(c => c.uploaded_file)
      .FirstOrDefaultAsync();
      if (folderID == null) { return null; }
      else
      {
        string[] id = folderID.Split(",");
        return id[0];
      }
    }
    public async Task UploadC(CC_api.Models.Contract contract)
    {
      dbContext.contracts.Add(contract);
      await dbContext.SaveChangesAsync();
    }
    public async Task<bool> exists(string Title)
    {
      return await dbContext.contracts.AnyAsync(c => c.title == Title);
    }
    public async Task<string> GetUploadFileID(int userID, int companyID, int contractID)
    {
      var contract = await dbContext.contracts
      .Where(c => c.user_id == userID && c.company_id == companyID && c.contract_id == contractID)
      .Select(c => c.uploaded_file)
      .FirstOrDefaultAsync();
      //returns the contract name stored in db which matches to file id in the Drive folder
      if (contract == null)
      {
        return null;
      }
      else
      {
        string[] ids = contract.Split(',');
        return ids[1]; //returns the file id ids[0] returns folder id
      }
    }
    public async Task<string> GetFileIDbyContractID(int contractID)
    {
      var fileID = await dbContext.contracts
        .Where(c => c.contract_id.Equals(contractID))
        .Select(c => c.uploaded_file)
        .FirstOrDefaultAsync();
      return fileID;
    }
    public async Task<List<KeyValuePair<int, object>>> GetContractsByTitle(string title, int companyId)
    {
      var contracts = await dbContext.contracts
          .Where(c => c.title == title && c.company_id == companyId)
          .ToListAsync();

      if (contracts.Count == 0)
      {
        return null;
      }
      else
      {
        var result = contracts.Select(c => new KeyValuePair<int, object>(c.contract_id, new { c.content, UploadedFile = c.uploaded_file.Split(",")[1] }))
                              .ToList();
        return result;
      }
    }

    private string GetFirstElement(string input)
    {
      return input.Split(',')[0];
    }

    //Below fn returns the UNIQUE titles belonging to a company and their in the format {contract_id: [folderID, title]}
    public async Task<List<KeyValuePair<int, string[]>>> GetTitlesByCompanyID(int companyID)
    {
      var contracts = await dbContext.contracts.Where(c => c.company_id == companyID).ToListAsync();
      var result = contracts.GroupBy(c => GetFirstElement(c.uploaded_file))
                            .Select(g => g.First())
                            .Select(c => new KeyValuePair<int, string[]>(c.contract_id, new string[] { GetFirstElement(c.uploaded_file), c.title }))
                            .ToList();
      return result;
    }
    public async Task DeleteContract(int contractID)
    {
      dbContext.contracts.Remove(
      dbContext.contracts.FirstOrDefault(c => c.contract_id == contractID));
      await dbContext.SaveChangesAsync();
    }
  }
}
