using Microsoft.AspNetCore.Mvc;

namespace CC_api.Controllers
{
  public class HomeController : Controller
  {
    [HttpGet("")]
    public IActionResult MyEndpoint()
    {
      string message = "The Container conundrum API is UP and RUNNING";
      return Json(new { message });
    }
  }
}
