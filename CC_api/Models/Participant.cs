using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Participant
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int participantid { get; set; }
    public int conversationid { get; set; }
    public int user_id { get; set; }
    public string fname { get; set; }
    public string lname { get; set; }
    public int company_id { get; set; }
    public string company_name { get; set; }
  }
}
