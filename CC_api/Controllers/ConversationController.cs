using CC_api.Business;
using CC_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  public class ConversationController : Controller
  {
    private readonly ConversationBusiness conversationBusiness;

    public ConversationController(ILogger<ConversationController> logger)
    {
      conversationBusiness = new ConversationBusiness();
    }

    [HttpPost("CreateConversation")]
    public async Task<IActionResult> CreateConversation([FromBody] Conversation conversation)
    {
      if (conversation == null)
      {
        return BadRequest("Invalid conversation data");
      }

      var createdConversation = await conversationBusiness.CreateConversation(conversation);
      return Ok(createdConversation);
    }

    [HttpPost("AddParticipant")]
    public async Task<IActionResult> AddParticipant([FromBody] Participant participant)
    {
      if (participant == null)
      {
        return BadRequest("Invalid participant data");
      }

      conversationBusiness.AddParticipant(participant);
      return Ok();
    }

    [HttpGet("GetMessagesByConversationId")]
    public async Task<IActionResult> GetMessagesByConversationId(int conversationId)
    {
      var messages = await conversationBusiness.GetMessagesByConversationId(conversationId);
      return Ok(messages);
    }

    [HttpPost("SendMessage")]
    public async Task<IActionResult> SendMessage([FromBody] Message message)
    {
      if (message == null)
      {
        return BadRequest("Invalid message data");
      }
      var sentMessage = await conversationBusiness.SendMessage(message);
      return Ok(sentMessage);
    }
    [HttpGet("GetConversationByCompanyId")]
    public async Task<IActionResult> GetConversationByCompanyId(int companyId)
    {
      var conversations = await conversationBusiness.GetConversationByCompanyId(companyId);
      return Ok(conversations);
    }
    [HttpGet("GetConversationByAdCompanyId")]
    public async Task<IActionResult> GetConversationByAdCompanyId(int AdscompanyId)
    {
      var conversations = await conversationBusiness.GetConversationByAdCompanyId(AdscompanyId);
      return Ok(conversations);
    }
    [HttpGet("GetConversationByConversationId")]
    public async Task<IActionResult> GetConversationByConversationId(int ConversationId)
    {
      var conversations = await conversationBusiness.GetConversationByConversationId(ConversationId);
      return Ok(conversations);
    }
    [HttpGet("GetConversationByNegotationId")]
    public async Task<IActionResult> GetConversationByNegotationId(int negotiation_id)
    {
      var conversations = await conversationBusiness.GetConversationByNegotationId(negotiation_id);
      return Ok(conversations);
    }
    [HttpGet("GetParticipantsByConversationId")]
    public async Task<IActionResult> GetParticipants(int convoid)
    {

      return Ok(await conversationBusiness.GetParticipant(convoid));
    }
    // Other conversation-related endpoints
    [HttpGet("GetUsers")]
    public async Task<IActionResult> GetUsers(int convoid, int companyId)
    {
      return Ok(await conversationBusiness.GetUsersAsync(convoid, companyId));
    }
  }

}
