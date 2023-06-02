using System.Net;
using System.Net.Mail;



namespace CC_api
{
  public class EmailService
  {
    public async Task SendOTPAsync(string email, int otp)
    {
      try
      {
        var fromAddress = new MailAddress("vishruthaacharya23@gmail.com", "Ivoyant Systems PVT LTD");
        var toAddress = new MailAddress(email);
        const string fromPassword = "exqyonulvbzfdduv";
        const string subject = "One Time Password (OTP) for registration";
        string body = $"Your OTP is {otp}";



        var smtp = new SmtpClient
        {
          Host = "smtp.gmail.com",
          Port = 587,
          EnableSsl = true,
          DeliveryMethod = SmtpDeliveryMethod.Network,
          UseDefaultCredentials = false,
          Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        };
        using (var message = new MailMessage(fromAddress, toAddress)
        {
          Subject = subject,
          Body = body
        })
        {
          await smtp.SendMailAsync(message);
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}




//using MailKit.Net.Smtp;
//using MimeKit;



//namespace CC_api
//{
//  public class EmailService



//  {



//        private readonly EmailSettings _emailSettings;



//    public EmailService(EmailSettings emailSettings)
//    {
//      _emailSettings = emailSettings;
//    }



//    public async Task SendEmailAsync(string to, string subject, string body)
//    {
//      var message = new MimeMessage();
//      message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
//      message.To.Add(new MailboxAddress("", to));
//      message.Subject = subject;
//      message.Body = new TextPart("html") { Text = body };



//      using var client = new SmtpClient();
//      await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.SmtpPort, useSsl: false);
//      await client.AuthenticateAsync(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword);
//      await client.SendAsync(message);
//      await client.DisconnectAsync(quit: true);
//    }
//  }



//  public interface IEmailService
//  {
//    Task SendEmailAsync(string to, string subject, string body);
//  }



//  public class EmailSettings
//  {
//    public string SmtpServer { get; set; }
//    public int SmtpPort { get; set; }
//    public string SmtpUsername { get; set; }
//    public string SmtpPassword { get; set; }
//    public string SenderName { get; set; }
//    public string SenderEmail { get; set; }
//  }
//}
