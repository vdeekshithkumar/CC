using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Ad
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int ad_id { get; set; }
    public DateTime date_created { get; set; }
    public DateTime from_date { get; set; }
    public DateTime expiry_date { get; set; }
    public string type_of_ad { get; set; }
    public int container_type_id { get; set; }

    public decimal price { get; set; }
    public string status { get; set; }
    public int quantity { get; set; }
    public int port_id { get;set; }
    public int company_id { get; set; }
    public int posted_by{ get; set; }
    public string contents { get; set; }
    public string file { get; set; }
    public string port_of_departure { get; set; }
    public string port_of_arrival{ get; set; }
    public int free_days { get; set;}
    public int per_diem { get; set;}
    public decimal pickup_charges { get; set;}

  }
}

