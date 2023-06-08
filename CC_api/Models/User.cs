using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace CC_api.Models
{
  public class User
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int user_id { get; set; }

    public int company_id { get; set; }
    public string fname { get; set; }
    public string lname { get; set; }
    public string address { get; set; }
    public string email { get; set; }
    public string phone_no { get; set; }

    [Column("password")]
    public string password { get; set; }

    public bool VerifyPassword(string password)
{
    using (var sha256 = SHA256.Create())
    {
        byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        string hashedInput = Convert.ToBase64String(hashedBytes);
        return hashedInput == this.password; // Compare with the stored hashed password
    }
}



    public int is_verified { get; set; }
    public int is_approved { get; set; }
    public int is_active { get; set; }
    public DateTime last_login { get; set; }
    public string designation { get; set; }
    public int otp { get; set; }
  }
}
