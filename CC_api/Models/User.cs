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

    }
}
