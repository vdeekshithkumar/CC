using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;




namespace CC_api.Models
{
  public class Negotiation
  {



    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int negotiation_id { get; set; }
    public int user_id { get; set; }
    public int ad_id { get; set; }

    public decimal price { get; set; }
    public string negotiation_type { get; set; }
    public string container_type { get; set; }

    public int quantity { get; set; }

    public string status { get; set; }

  
    public int company_id { get; set; }
    public int contract_id { get; set; }

public DateTime date_created { get; set; }
    public DateTime expiry_date { get; set; }


    public int updated_by { get; set; }

  }
}
