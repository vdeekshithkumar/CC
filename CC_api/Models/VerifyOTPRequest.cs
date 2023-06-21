namespace CC_api.Models
{
  public class VerifyOTPRequest
  {
    public int UserId { get; set; }
    public int otp { get; set; }
    public string email { get; set; }
  }
}
