using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Container
  {

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int container_type_id { get; set; }

    public string type { get; set; }

    public int capacity { get; set; }



  }
}
