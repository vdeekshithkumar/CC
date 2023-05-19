using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Permission
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public List<int> ppList { get; set; }
    public string emailValue { get; set; }
    public int user_id { get; set; }

  }
}
