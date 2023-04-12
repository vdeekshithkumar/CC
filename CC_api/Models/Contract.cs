

using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

 

namespace CC_api.Models

{

  public class Contract

  {



    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]



    [Key]

    public int contract_id { get; set; }

    public int company_id { get; set; }

    public int user_id { get; set; }

    public string content { get; set; }

    public string title { get; set; }

    public byte[] upload_file { get; set; }

    public int updated_by { get; set; }



    public DateTime updated_date_time { get; set; }



  }

}





