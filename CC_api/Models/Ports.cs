using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Ports
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int port_id { get; set; }
    public int company_id { get; set; }
    public string port_name { get; set; }
    public decimal latitude { get; set; }
    public decimal longitude { get; set; }
    public string state { get; set; }
    public string country { get; set; }
    public string city { get; set; }
    public string region { get; set; }
    public string? sub_region { get; set; }
    public string status { get; set; }
    public string port_code{ get; set; }
    

  }
}
