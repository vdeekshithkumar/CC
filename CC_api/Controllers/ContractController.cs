using CC_api.Business;
using CC_api.Models;
using CC_api.Repository;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Google.Apis.Upload;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ActionResult> UploadToDrive(List<IFormFile> files, int userId, int companyId, string content, string title)
    {

      string folderId = null;
      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);

      var service = new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = credential
      });


      if (await this._contractRepository.exists(title))
      {
        folderId = await this._contractRepository.GetFolderId(title, companyId);
      }
      else
      {
        // Create folder Metadata
        var folderMetadata = new Google.Apis.Drive.v3.Data.File()
        {
          Name = title,
          MimeType = "application/vnd.google-apps.folder",
          Parents = new List<string>() { DirectoryId }
        };
        var folderRequest = service.Files.Create(folderMetadata);
        folderRequest.Fields = "id";
        var folderResults = await folderRequest.ExecuteAsync();
        //folder id of the folder we just created
        folderId = folderResults.Id;
      }

      foreach (var file in files)
      {
        // Upload file Metadata
        var fileMetadata = new Google.Apis.Drive.v3.Data.File()
        {
          Name = file.FileName,
          Parents = new List<string>() { folderId }
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
          var contract = new Contract
          {
            company_id = companyId,
            user_id = userId,
            updated_by = userId,
            updated_date_time = DateTime.Now,
            title = title,
            content = content,
            uploaded_file = folderId + "," + uploadedFileId
          };
          await this._contractBusiness.UploadContract(contract);
        }
      }

      return Ok(new { message = "Success" });
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
      if (fileID == null) { return NotFound(); }

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

    [HttpGet("GetAllTitles")]
    public async Task<IActionResult> GetAllTitles(int companyID)
    {
      var contracts = await this._contractRepository.GetTitlesByCompanyID(companyID);
      // Load the Service account credentials and define the scope of its access.
      var credential = GoogleCredential.FromFile(PathToServiceAccountKeyFile)
                      .CreateScoped(DriveService.ScopeConstants.Drive);

      var service = new DriveService(new BaseClientService.Initializer()
      {
        HttpClientInitializer = credential
      });
      return Ok(contracts);
    }
    [HttpGet("GetAllContracts")]
    public async Task<IActionResult> GetContractsByCompanyID(int companyId)
    {
      var list = await this._contractRepository.GetAllContracts(companyId);

      return Ok(list);
    }
    [HttpGet("GetAllContractsByTitle")]
    public async Task<IActionResult> GetContractsByTitle(string title, int companyId)
    {
      var list = await this._contractRepository.GetContractsByTitle(title, companyId);

      return Ok(list);
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
      await service.Files.Delete(fileId.Split(",")[1]).ExecuteAsync();
      await _contractRepository.DeleteContract(contractID);

      // Return a success response
      return Ok();
    }

  }
}
