using CC_api.Models;
using MailKit;
using Microsoft.EntityFrameworkCore;


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
        var existingConversation = await dbContext.conversation.FirstOrDefaultAsync(c => c.ConversationId == conversation.ConversationId);

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
          ConversationId = conversation.ConversationId,
          UserId = conversation.user_id,
          fname = dbContext.users.Where(u => u.user_id == conversation.user_id).Select(u => u.fname).FirstOrDefault(),
          lname = dbContext.users.Where(u => u.user_id == conversation.user_id).Select(u => u.lname).FirstOrDefault(),
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

    public async Task<List<Message>> GetMessagesByConversationId(int conversationId)
    {
      return await dbContext.message.Where(m => m.ConversationId == conversationId).ToListAsync();
    }
    public async Task<Message> SendMessage(Message message)
    {
      message.Timestamp = DateTimeOffset.UtcNow.ToOffset(TimeSpan.FromHours(5.5)).DateTime; // Convert to local DateTime in IST
      dbContext.message.Add(message);
      await dbContext.SaveChangesAsync();
      return message;
    }


    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await dbContext.conversation.Where(c => c.company_id == companyId || c.AdscompanyId == companyId).ToListAsync();
    }
    public async Task<List<Conversation>> GetConversationByAdCompanyId(int AdscompanyId)
    {
      return await dbContext.conversation.Where(c => c.AdscompanyId == AdscompanyId).ToListAsync();
    }
    public async Task<List<Conversation>> GetConversationByConversationId(int ConversationId)
    {
      return await dbContext.conversation.Where(c => c.ConversationId == ConversationId).ToListAsync();
    }
    public async Task<List<Conversation>> GetConversationByNegotationId(int negotiation_id)
    {
      return await dbContext.conversation.Where(c => c.negotiation_id == negotiation_id).ToListAsync();
    }
    public async Task<List<UserDTO>> GetUsers(int convoid, int companyId)
    {
      //the company name is same for all the users here since an admin can only add his own employees
      var participantUserIds = dbContext.participant
          .Where(p => p.ConversationId == convoid)
          .Select(p => p.UserId);
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
            fname = u.fname,
            lname = u.lname,
            designation = u.designation,
            company_name = companyName
          })
          .ToListAsync();
    }

  }

}
