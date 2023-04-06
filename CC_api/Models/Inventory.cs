using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CC_api.Models
{
  public class Inventory
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int inventory_id { get; set; }

    public DateTime date_created{ get; set; }

    public DateTime last_modified { get; set; }

    public int company_id { get; set; }
    public string container_type { get; set; }
    public int available { get; set; }
    public int maximum { get; set; }
    public int minimum { get; set; }
    public int port_id { get; set; }
    public int updated_by { get; set; }
    public int container_size { get; set; }

  }
}
