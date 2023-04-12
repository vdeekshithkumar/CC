namespace CC_api.Models
{
    public class AuthenticationModel
    {
        public string email { get; set; }

        public string password { get; set; }
    public User User { get; set; }
    public string Message { get; set; }
    
    public DateTime TokenExpiryDate { get; set; }
    public string Token { get; set; } = null!;



  }
}
