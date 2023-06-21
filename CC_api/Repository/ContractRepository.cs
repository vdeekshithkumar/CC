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
    public class ContractsDto
    {
      public string title { get; set; }
      public string[] descriptions { get; set; }
      public int[] contractIds { get; set; }
      public DateTime[] dates { get; set; }
    }
    public async Task<List<ContractsDto>> GetAllContracts(int companyId)
    {
      List<ContractsDto> contractDtos = new List<ContractsDto>();


      var contracts = await dbContext.contracts
          .Where(c => c.company_id == companyId)
          .ToListAsync();

      var groupedContracts = contracts.GroupBy(c => c.title);

      foreach (var group in groupedContracts)
      {
        var contractIds = group.Select(c => c.contract_id).ToArray();
        var descriptions = group.Select(c => c.content).ToArray();
        var dates = group.Select(c => c.updated_date_time).ToArray();

        ContractsDto contractDto = new ContractsDto
        {
          title = group.Key,
          contractIds = contractIds,
          descriptions = descriptions,
          dates = dates
        };

        contractDtos.Add(contractDto);
      }

      return contractDtos;
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
      using (var dbContext = new DatabaseContext()) // Replace "YourDbContext" with your actual DbContext class
      {
        var contract = await dbContext.contracts
            .Where(c => c.user_id == userID && c.company_id == companyID && c.contract_id == contractID)
            .Select(c => c.uploaded_file)
            .FirstOrDefaultAsync();

        if (contract == null)
        {
          return null;
        }
        else
        {
          string[] ids = contract.Split(',');

          if (ids.Length >= 2)
          {
            return ids[1];
          }
          else
          {
            return null; // Handle the case when the array does not contain the required element
          }
        }
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
