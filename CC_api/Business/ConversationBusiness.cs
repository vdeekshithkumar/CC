using CC_api.Models;
using CC_api.Repository;

namespace CC_api.Business
{

  public class ConversationBusiness
  {
    private readonly ConversationRepository conversationRepository;

    public ConversationBusiness()
    {
      this.conversationRepository = new ConversationRepository();
    }

    public async Task<Conversation> CreateConversation(Conversation conversation)
    {
      return await conversationRepository.CreateConversation(conversation);
    }

    public void AddParticipant(Participant participant)
    {
      // Perform any necessary business logic/validation
      // Example: Check if the participant is allowed to join the conversation

      conversationRepository.AddParticipant(participant);
    }

    public async Task<List<Message>> GetMessagesByConversationId(int conversationId)
    {
      // Perform any necessary business logic/validation

      return await conversationRepository.GetMessagesByConversationId(conversationId);
    }
    public async Task<Message> SendMessage(Message message)
    {

      return await conversationRepository.SendMessage(message);
    }
    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await conversationRepository.GetConversationByCompanyId(companyId);
    }
    public async Task<List<Conversation>> GetConversationByAdCompanyId(int AdscompanyId)
    {
      return await conversationRepository.GetConversationByAdCompanyId(AdscompanyId);
    }
    public async Task<List<Conversation>> GetConversationByConversationId(int ConversationId)
    {
      return await conversationRepository.GetConversationByConversationId(ConversationId);
    }
    public async Task<List<Conversation>> GetConversationByNegotationId(int negotiation_id)
    {
      return await conversationRepository.GetConversationByNegotationId(negotiation_id);
    }
    public async Task<List<Participant>> GetParticipant(int convoid)
    {
      return await conversationRepository.GetParticipants(convoid);
    }

    public async Task<List<UserDTO>> GetUsersAsync(int convoid, int companyId)
    {
      return await conversationRepository.GetUsers(convoid, companyId);
    }
  }
}
