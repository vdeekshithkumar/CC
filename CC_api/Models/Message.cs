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

  }
}
