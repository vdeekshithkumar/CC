using CC_api.Business;
using CC_api.Models;
using CC_api.Repository;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  //Reference link : https://www.youtube.com/watch?v=Q5b0ivBYqeQ&ab_channel=DAIMTODeveloperTips
  public class ContractController : Controller
  {
    private readonly DatabaseContext dbContext;

    private readonly ContractBusiness _contractBusiness;
    private readonly ContractRepository _contractRepository;
    private string? uploadedFileId;
    //Drive constant credentials
    private string PathToServiceAccountKeyFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "client_secret.json");
    private const string ServiceAccountEmail = "cc-436@cc-repository.iam.gserviceaccount.com";
    private const string DirectoryId = "1w4uzPE0UuoaQVeKDLALs4l1ceqUFfLMS";

    public ContractController()
    {
      _contractBusiness = new ContractBusiness();
      _contractRepository = new ContractRepository();
      this.dbContext = new DatabaseContext();

    }

    [HttpPost("upload")]
    public async Task<ActionResult> UploadToDrive(IFormFile file, int userId, int companyId, string content, string title)
    {


      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);

      var service = new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = credential
      });

      // Upload file Metadata
      var fileMetadata = new Google.Apis.Drive.v3.Data.File()
      {
        Name = file.FileName,
        Parents = new List<string>() { "1w4uzPE0UuoaQVeKDLALs4l1ceqUFfLMS" }
      };

      await using (var stream = file.OpenReadStream())
      {
        var request = service.Files.Create(fileMetadata, stream, "application/pdf");
        request.Fields = "*";
        var results = await request.UploadAsync(CancellationToken.None);

        if (results.Status == UploadStatus.Failed)
        {
          Console.WriteLine($"Error uploading file: {results.Exception.Message}");
        }

        // the file id of the new file we created
        uploadedFileId = request.ResponseBody?.Id;
      }
      var contract = new Contract { company_id = companyId, user_id = userId, updated_by = userId, updated_date_time = DateTime.Now, title = title, content = content, uploaded_file = uploadedFileId };
      await this._contractBusiness.UploadContract(contract);


      return Ok(new { uploadedFileId, message = "Success" });
    }

    //End upload


    [HttpGet("DownloadContracts")]
    public async Task<IActionResult> DownloadContract(int userId, int companyId, int contractID)
    {
      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);
      var service = new DriveService(new BaseClientService.Initializer
      {
        HttpClientInitializer = credential,
      });
      var fileID = await this._contractRepository.GetUploadFileID(userId, companyId, contractID);

      // Get the file metadata
      var fileMetadata = await service.Files.Get(fileID).ExecuteAsync();

      // Download the file from Google Drive
      var getRequest = service.Files.Get(fileID);
      var memoryStream = new MemoryStream();
      await getRequest.DownloadAsync(memoryStream);
      memoryStream.Position = 0;

      // Return the file as an IActionResult
      return File(memoryStream, "application/pdf", fileMetadata.Name);
    }

    [HttpGet("GetAllContracts")]
    public async Task<IActionResult> GetAllFiles(int companyID)
    {
      var contracts = await this._contractRepository.GetContractsByCompanyID(companyID);
      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);

      var service = new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = credential
      });

      // Create a list to store the results
      var results = new List<KeyValuePair<int, string>>();

      // Retrieve the file name for each contract
      foreach (var contract in contracts)
      {
        var fileId = contract.Value;
        var request = service.Files.Get(fileId);
        request.Fields = "name";
        var file = await request.ExecuteAsync();
        results.Add(new KeyValuePair<int, string>(contract.Key, file.Name));
      }

      // Return the list of results as a JSON array
      return Json(results);
    }

    [HttpDelete("DeleteContract")]
    public async Task<IActionResult> DeleteContract(int contractID)
    {
      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);
      var service = new DriveService(new BaseClientService.Initializer
      {
        HttpClientInitializer = credential,
      });
      var fileId = await _contractRepository.GetFileIDbyContractID(contractID);
      // Delete the file from Google Drive
      await service.Files.Delete(fileId).ExecuteAsync();
      await _contractRepository.DeleteContract(contractID);

      // Return a success response
      return Ok();
    }
  }
}
