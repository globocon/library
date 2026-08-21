using Microsoft.AspNetCore.Mvc;

namespace NedumkandomPublicLibrary.Controllers;

[ApiController]
[Route("api")]
public class ApiControllers : ControllerBase
{
    [HttpPost("contact")]
    public IActionResult Contact([FromBody] object? payload)
    {
        return Ok(new { success = true, message = "സന്ദേശം ലഭിച്ചു. നന്ദി!" });
    }

    [HttpPost("donate-books")]
    public IActionResult DonateBooks([FromBody] object? payload)
    {
        return Ok(new { success = true, message = "വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!" });
    }

    [HttpPost("volunteer")]
    public IActionResult Volunteer([FromBody] object? payload)
    {
        return Ok(new { success = true, message = "വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!" });
    }
}
