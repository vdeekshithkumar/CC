using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Company
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int company_id { get; set; }
    public string name { get; set; }
   public int licence_id { get; set; }
    public string domain_address { get; set; }
    //public byte[] company_logo{ get; set; }
    public string company_location { get; set; }
   public string country { get; set; }
    public int rating { get; set; }
    public string address { get; set; }
  }
}
