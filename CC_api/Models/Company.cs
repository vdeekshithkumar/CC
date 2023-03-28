using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Company
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CompanyId { get; set; }
    public string CompanyName { get; set; }
    public string DomainAddress { get; set; }
    public string CompanyAddress { get; set; }
    public int Rating { get; set; }


  }
}
