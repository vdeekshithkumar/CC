using CC_api.Models;
using CC_api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CC_api.Business
{

  public class ConversationBusiness
  {
    private readonly ConversationRepository conversationRepository;
    private readonly UserRepository userRepository;


    public ConversationBusiness()
    {
      this.conversationRepository = new ConversationRepository();
      this.userRepository = new UserRepository();

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


      return await conversationRepository.GetMessagesByConversationId(conversationId);
    }
    public async Task<Message> SendMessage(Message message)
    {
      // Assuming you have a method to get the sender's cid by sender_id
      int senderCid = await userRepository.GetSenderCidBySenderId(message.senderid);

      // Now you have the sender_cid, set it in the message or use it as needed
      message.sender_cid = senderCid;

      // Call the SendMessage method in the conversationRepository
      return await conversationRepository.SendMessage(message);
    }
    public async Task<List<Message>> Editmessagestatus(int conversationId, int companyId)
    {
      List<Message> messages = await conversationRepository.GetmessageByConversationID(conversationId);

      foreach (var message in messages)
      {
        if (message != null && companyId == message.sender_cid && message.sender_read == false)
        {
          await conversationRepository.UpdateSenderReadStatus(message);
        }
        else if (message != null && companyId != message.sender_cid && message.receiver_read == false)
        {
          await conversationRepository.UpdateReceiverReadStatus(message);
        }
      }

      return messages;
    }
    public async Task<int> GetmessageCount(int companyId)
    {
      return await conversationRepository.GetmessageCount(companyId);
    }

    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await conversationRepository.GetConversationByCompanyId(companyId);
    }
    public async Task<List<Conversation>> GetConversationByAdCompanyId(int adscompanyid)
    {
      return await conversationRepository.GetConversationByAdCompanyId(adscompanyid);
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
