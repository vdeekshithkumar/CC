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
      // Perform any necessary business logic/validation
      // Example: conversation.Name should not be empty or null

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
      // Perform any necessary business logic/validation
      // Example: Check if the user is allowed to send a message in the conversation

      return await conversationRepository.SendMessage(message);
    }
    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await conversationRepository.GetConversationByCompanyId(companyId);
    }
    public async Task<List<Participant>> GetParticipant(int convoid)
    {
      return await conversationRepository.GetParticipants(convoid);
    }
    // Other conversation-related methods
  }
}
