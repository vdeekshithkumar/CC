using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Inventory
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int InventoryId { get; set; }

    public DateTime DateCreated{ get; set; }

    public DateTime LastModified { get; set; }

    public int CompanyId { get; set; }
    public string ContainerType { get; set; }
    public int Available { get; set; }
    public int M { get; set; }
    public int N { get; set; }
    public int PortId { get; set; }
    public int UpdatedBy { get; set; }

  }
}
