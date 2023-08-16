using CC_api.Models;
using Google.Apis.Drive.v3.Data;
using MailKit;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;


namespace CC_api.Repository
{
  public class UserDTO
  {
    public int user_id { get; set; }
    public int company_id { get; set; }
    public string fname { get; set; }
    public string lname { get; set; }
    public string designation { get; set; }
    public string? company_name { get; set; }
  }
  public class ConversationRepository
  {
    private readonly DatabaseContext dbContext;

    public ConversationRepository()
    {
      this.dbContext = new DatabaseContext();
    }

    public async Task<Conversation> CreateConversation(Conversation conversation)
    {
      if (dbContext.users.Any(u => u.user_id == conversation.user_id) && conversation != null)
      {
        var existingConversation = await dbContext.conversation.FirstOrDefaultAsync(c => c.conversationid == conversation.conversationid);

        if (existingConversation != null)
        {
          Console.Write("Conversation already exists");
          return null;
        }

        conversation.is_active = 1; // Set the is_active column to 1

        await dbContext.conversation.AddAsync(conversation);
        await dbContext.SaveChangesAsync();

        // Create a participant object
        Participant participant = new Participant()
        {
          conversationid = conversation.conversationid,
          user_id = conversation.user_id,
          first_name = dbContext.users.Where(u => u.user_id == conversation.user_id).Select(u => u.first_name).FirstOrDefault(),
          last_name = dbContext.users.Where(u => u.user_id == conversation.user_id).Select(u => u.last_name).FirstOrDefault(),
          company_id = conversation.company_id,
          company_name = dbContext.company.Where(c => c.company_id == conversation.company_id).Select(c => c.name).FirstOrDefault()
        };

        // Call the AddParticipant method to add the participant
        AddParticipant(participant);

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
      var user = await dbContext.users.FindAsync(participant.user_id);
      var company = await dbContext.company.FindAsync(participant.company_id);

      if (user != null && company != null)
      {
        participant.first_name = user.first_name;
        participant.last_name = user.last_name;
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
      return await dbContext.participant.Where(c => c.conversationid == convoid).ToListAsync();
    }

    public async Task<List<Message>> GetMessagesByConversationId(int conversationId)
    {
      return await dbContext.message.Where(m => m.conversationid == conversationId).ToListAsync();
    }
    public async Task<Message> SendMessage(Message message)
    {
      message.timestamp = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(5.5)).DateTime; // Convert to local DateTime in IST
      message.sender_read = true;
      dbContext.message.Add(message);
      await dbContext.SaveChangesAsync();
      return message;
    }


    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await dbContext.conversation.Where(c => c.company_id == companyId || c.adscompanyid == companyId).ToListAsync();
    }
    public async Task<List<Conversation>> GetConversationByAdCompanyId(int AdscompanyId)
    {
      return await dbContext.conversation.Where(c => c.adscompanyid == AdscompanyId).ToListAsync();
    }

    public async Task<List<Message>> GetmessageByConversationID(int conversationId)
    {
      return await dbContext.message.Where(c => c.conversationid == conversationId && c.sender_read == false || c.receiver_read == false).ToListAsync();
    }
    public async Task<List<Conversation>> GetConversationByConversationId(int ConversationId)
    {
      return await dbContext.conversation.Where(c => c.conversationid == ConversationId).ToListAsync();
    }
    public async Task UpdateSenderReadStatus(Message message)
    {
      message.sender_read = true;
      dbContext.Update(message);
      await dbContext.SaveChangesAsync();
    }

    public async Task UpdateReceiverReadStatus(Message message)
    {
      message.receiver_read = true;
      dbContext.Update(message);
      await dbContext.SaveChangesAsync();

    }
    public async Task<int> GetmessageCount(int companyId)
    {
      var userCount = await dbContext.message.Where(m => m.sender_cid == companyId &&  m.receiver_read == false).CountAsync();
      return userCount;
    }
    public async Task<List<Conversation>> GetConversationByNegotationId(int negotiation_id)
    {
      return await dbContext.conversation.Where(c => c.negotiation_id == negotiation_id).ToListAsync();
    }
    public async Task<List<UserDTO>> GetUsers(int convoid, int companyId)
    {
      //the company name is same for all the users here since an admin can only add his own employees
      var participantUserIds = dbContext.participant
          .Where(p => p.conversationid == convoid)
          .Select(p => p.user_id);
      var companyName = await dbContext.company
        .Where(c => c.company_id == companyId)
        .Select(c => c.name)
        .FirstOrDefaultAsync();


      return await dbContext.users
          .Where(u => u.company_id == companyId && !participantUserIds.Contains(u.user_id))
          .Select(u => new UserDTO
          {
            user_id = u.user_id,
            company_id = u.company_id,
            fname = u.first_name,
            lname = u.last_name,
            designation = u.designation,
            company_name = companyName
          })
          .ToListAsync();
    }

  }

}
