using CC_api.Models;
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

    public async Task<List<Message>> GetMessagesByConversationId(int conversationId)
    {
      return await dbContext.message.Where(m => m.ConversationId == conversationId).ToListAsync();
    }

    public async Task<Message> SendMessage(Message message)
    {
      dbContext.message.Add(message);
      await dbContext.SaveChangesAsync();
      return message;
    }
    public async Task<List<Conversation>> GetConversationByCompanyId(int companyId)
    {
      return await dbContext.conversation.Where(c => c.company_id == companyId).ToListAsync();
    }
    public async Task<List<UserDTO>> GetUsers(int conversationId, int companyId)
    {
      //the company name is same for all the users here since an admin can only add his own employees
      var participantUserIds = dbContext.participant
          .Where(p => p.ConversationId == conversationId)
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
