using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace NedumkandomPublicLibrary.Pages;

public class VolunteerModel : PageModel
{
    private readonly ILogger<VolunteerModel> _logger;

    public VolunteerModel(ILogger<VolunteerModel> logger)
    {
        _logger = logger;
    }

    public class VolunteerInput
    {
        [Required(ErrorMessage = "പേര് നൽകുക.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "മൊബൈൽ നമ്പർ നൽകുക.")]
        public string Mobile { get; set; } = string.Empty;

        public string? Email { get; set; }
        public List<string> AreaOfInterest { get; set; } = new();
        public string? Experience { get; set; }
    }

    [BindProperty]
    public VolunteerInput Form { get; set; } = new();

    public bool IsSubmitted { get; set; } = false;
    public string? ReferenceId { get; set; }
    public string? SuccessMessage { get; set; }
    public string? ErrorMessage { get; set; }

    public void OnGet()
    {
        IsSubmitted = false;
    }

    public IActionResult OnPost()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        try
        {
            var randomCode = Guid.NewGuid().ToString("N")[..4].ToUpperInvariant();
            ReferenceId = $"NPL-VOL-{randomCode}";
            SuccessMessage = "വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!";
            IsSubmitted = true;

            _logger.LogInformation("[VOLUNTEER REGISTRATION SUBMITTED] Ref: {Ref} | Name: {Name} | Areas: {Areas}",
                ReferenceId, Form.Name, string.Join(", ", Form.AreaOfInterest));

            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing volunteer registration from {Name}", Form.Name);
            ErrorMessage = "സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു.";
            return Page();
        }
    }
}
