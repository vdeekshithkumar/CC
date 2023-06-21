using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Conversation
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ConversationId { get; set; }
    public string ConversationName { get; set; }
    public string ConvoDesc { get; set; }
    public int CreatedBy { get; set; }
    public int company_id { get; set; }
    public int is_active { get; set; }
  }
}
