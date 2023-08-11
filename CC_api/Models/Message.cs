using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CC_api.Models
{
  public class Message
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int messageid { get; set; }
    public int conversationid { get; set; }
    public int senderid { get; set; }
    public string content { get; set; }
    public DateTime timestamp { get; set; }

    public int sender_cid { get; set; }

    public bool sender_read { get; set; }

    public bool receiver_read { get; set; }

  }
}
