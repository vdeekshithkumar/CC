using CC_api.Models;
using Google.Apis.Drive.v3.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.ComponentModel.Design;

namespace CC_api.Repository
{
  public class ConversationRepository
  {
    private readonly DatabaseContext dbContext;

    public ConversationRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task<Conversation> CreateConversation(Conversation conversation)
    {
      if (dbContext.users.Any(u => u.user_id == conversation.CreatedBy) && conversation != null)
      {
        dbContext.conversation.AddAsync(conversation);
        await dbContext.SaveChangesAsync();
        return conversation;
      }
      else
      {
        Console.Write("UserID is invalid");
        return null;
      }
    }

    public async void AddParticipant(Participant participant)
    {
      var user = await dbContext.users.FindAsync(participant.UserId);
      var company = await dbContext.company.FindAsync(participant.company_id);

      if (user != null && company != null)
      {
        participant.fname = user.fname;
        participant.lname = user.lname;
        participant.company_name = company.name;
        await dbContext.SaveChangesAsync();
      }

      if (participant != null)
      {
        dbContext.participant.Add(participant);
        await dbContext.SaveChangesAsync();
      }

    }
    public async Task<List<Participant>> GetParticipants(int convoid)
    {
      return await dbContext.participant.Where(c => c.ConversationId == convoid).ToListAsync();
    }

    public async Task< List<Message>> GetMessagesByConversationId(int conversationId)
    {
      return await  dbContext.message.Where(m => m.ConversationId == conversationId).ToListAsync();
    }

    public async Task<Message> SendMessage(Message message)
    {
      dbContext.message.Add(message);
      await dbContext.SaveChangesAsync();
      return message;
    }
    public async Task <List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await dbContext.conversation.Where(c => c.company_id == companyId).ToListAsync();
    }

    // Other conversation-related methods
  }

}
