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

    public int company_logo{ get; set; }// make its a byte[] to image 
    public decimal company_locations { get; set; }
    public string country { get; set; }

    public double rating { get; set; }
    public int port_id{ get; set; }
    public string address { get; set; }



  }
}
