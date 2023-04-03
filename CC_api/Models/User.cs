using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security;

namespace CC_api.Models
{
    public class User

    {
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        //[Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key] 
        public int user_id { get; set; }
        public int company_id { get; set; }

        public string fname { get; set; }

        public string lname { get; set; }
        public string address { get; set; }

        public string email { get; set; }
        public string phone_no { get; set; }
        public string password { get; set; }
        public int is_verified { get; set; }
        public int is_approved { get; set; }
        public int is_active { get; set; }
        public DateTime last_login { get; set; }
        public string designation { get; set; }
       
        
    }
}
