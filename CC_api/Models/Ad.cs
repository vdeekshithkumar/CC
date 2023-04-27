namespace CC_api.Models
{
  public class Ad
  {
    //public int Id { get; set; }
    public string port_of_arrival { get; set; }
    public string port_of_departure{ get; set;}
    public DateTime from_date { get; set; }
    public string type { get; set; }
    public decimal price { get; set; }
    public int free_days { get; set;}
    public int per_diem { get; set;}
    public int pick_up_charges { get; set;}
    public string content { get; set; }
    public string file { get; set;}
  }
}

