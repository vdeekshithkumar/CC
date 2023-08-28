using CC_api.Business;
using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.ComponentModel.Design;

namespace CC_api.Controllers
{
  public class InventoryApiController : Controller
  {
    private readonly ILogger<InventoryApiController> _logger;
    private readonly CompanyBusiness _companyBusiness;
    private readonly UserBusiness _userBusiness;
    private readonly InventoryBusiness _inventoryBusiness;
    private readonly PortsBusiness _portsBusiness;
    public InventoryApiController(ILogger<InventoryApiController> logger)
    {
      _logger = logger;
      _companyBusiness = new CompanyBusiness();
      _userBusiness = new UserBusiness();
      _inventoryBusiness = new InventoryBusiness();
      _portsBusiness = new PortsBusiness();
    }
    [HttpPost("PostInventory")]
    public async Task<IActionResult> PostInventory(string email, string password, IFormFile file)
    {
     

     
      {
        var authenticatedUser = await _userBusiness.AuthenticateUser( email, password);

        if (authenticatedUser != null)
        {
          if (file != null)
          {
            string contentType = file.ContentType;

            if (contentType == "text/csv")
            {
              // Convert CSV to Excel format
              using (var excelStream = new MemoryStream())
              {
                var excelPackage = new ExcelPackage(excelStream);
                var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");

                using (var reader = new StreamReader(file.OpenReadStream()))
                {
                  int row = 1;
                  while (!reader.EndOfStream)
                  {
                    string line = await reader.ReadLineAsync();
                    string[] values = line.Split(',');

                    for (int col = 0; col < values.Length; col++)
                    {
                      worksheet.Cells[row, col + 1].Value = values[col];
                    }

                    row++;
                  }
                }

                excelPackage.Save();
                excelStream.Seek(0, SeekOrigin.Begin);
                var excelData = ReadExcelDataFromStream(excelStream); 
                await _inventoryBusiness.AddExcelData(excelData, authenticatedUser.user_id, authenticatedUser.company_id);


                return Ok("Authentication successful for" +  email + "File processed successfully.");
              }
            }
            else if (contentType == "application/vnd.ms-excel" || contentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
              // Call AddExcelData method directly for Excel files
              using (var excelStream = new MemoryStream())
              {
                await file.CopyToAsync(excelStream); // Copy Excel stream to MemoryStream
                excelStream.Seek(0, SeekOrigin.Begin); // Reset stream position

                var excelData = ReadExcelDataFromStream(excelStream); 
                await _inventoryBusiness.AddExcelData(excelData, authenticatedUser.user_id, authenticatedUser.company_id);

                return Ok("Authentication successful for" +  email + "File processed successfully.");
              }
            }
            else
            {
              return BadRequest("Invalid file format. Only CSV and Excel files are allowed.");
            }
          }
          else
          {
            return BadRequest("No file was uploaded.");
          }
        }
        else
        {
          return Unauthorized("Invalid credentials.");
        }
      }

      return BadRequest();
    }

    public List<Inventory> ReadExcelDataFromStream(Stream excelStream)
    {
      var inventoryList = new List<Inventory>();

      using (var excelPackage = new ExcelPackage(excelStream))
      {
        var worksheet = excelPackage.Workbook.Worksheets[0]; // Assuming data is in the first sheet

        int rowCount = worksheet.Dimension.Rows;
        for (int row = 2; row <= rowCount; row++) // Assuming the first row is headers
        {
          string portcode = worksheet.Cells[row, 1].Text; // Port Code
          int portId = _portsBusiness.GetPortidbyCode(portcode).Result;

          var inventory = new Inventory
          {
            port_id = portId,
            container_type = worksheet.Cells[row, 2].Text,
            container_size = int.Parse(worksheet.Cells[row, 3].Text),
            available = int.Parse(worksheet.Cells[row, 4].Text),
            maximum = int.Parse(worksheet.Cells[row, 5].Text),
            minimum = int.Parse(worksheet.Cells[row, 6].Text)
            // Set other properties as needed
          };

          inventoryList.Add(inventory);
        }
      }

      return inventoryList;
    }
  }
  }
