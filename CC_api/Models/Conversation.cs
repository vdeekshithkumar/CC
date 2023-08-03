using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
  public class Conversation
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int conversationid { get; set; }
    //public string ConversationName { get; set; }
    //public string ConvoDesc { get; set; }
    public int adscompanyid { get; set; }//ad requesting company name
    public string company_name { get; set; }
    public string user_name { get; set; }
    public int company_id { get; set; }
    public int is_active { get; set; }
    public int user_id { get; set; }
    public int negotiation_id { get; set; }
    public string company_logo { get; set; }

    public string negotiator_company_name { get; set; }

    public string negotiator_company_logo { get; set; }

  }
}
