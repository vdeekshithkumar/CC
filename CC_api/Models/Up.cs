using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Up
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int up_id { get; set; }

    public int user_id { get; set; }

    public int permission_id { get; set; }


  }
}
