using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CC_api.Models
{
    public class User
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        //[Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
     
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        public string Country { get; set; } 
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public string Password { get; set; }

<<<<<<< HEAD
        public string email { get; set; }
        public string phone_no { get; set; }

       
        public string password { get; set; }
        public int is_verified { get; set; }
        public int is_approved { get; set; }
        public int is_active { get; set; }
        public DateTime last_login { get; set; }
        public string designation { get; set; }

        
       
        
=======
>>>>>>> deekshith_iv
    }
}
