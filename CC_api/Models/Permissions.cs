using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Permissions
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int permission_id { get; set; }

    public string type { get; set; }

    public string actions { get; set; }


  }
}
