using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Participant
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ParticipantId { get; set; }
    public int ConversationId { get; set; }
    public int UserId { get; set; }
    public string fname { get; set; }
    public string lname { get; set; }
    public int company_id { get; set; }
    public string company_name { get; set; }
  }
}
