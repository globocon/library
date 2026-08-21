using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace NedumkandomPublicLibrary.Pages;

public class DonateBooksModel : PageModel
{
    private readonly ILogger<DonateBooksModel> _logger;

    public DonateBooksModel(ILogger<DonateBooksModel> logger)
    {
        _logger = logger;
    }

    public class DonateBooksInput
    {
        [Required(ErrorMessage = "പേര് നൽകുക.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "മൊബൈൽ നമ്പർ നൽകുക.")]
        public string Mobile { get; set; } = string.Empty;

        [Required(ErrorMessage = "പുസ്തകങ്ങളുടെ എണ്ണം നൽകുക.")]
        [Range(1, 10000, ErrorMessage = "സാധുവായ എണ്ണം നൽകുക.")]
        public int BookCount { get; set; } = 1;

        public string? PreferredTime { get; set; }
    }

    [BindProperty]
    public DonateBooksInput Form { get; set; } = new();

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
            ReferenceId = $"NPL-DON-{randomCode}";
            SuccessMessage = "വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!";
            IsSubmitted = true;

            _logger.LogInformation("[BOOK DONATION SUBMITTED] Ref: {Ref} | Donor: {Name} | Count: {Count}",
                ReferenceId, Form.Name, Form.BookCount);

            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing book donation from {Name}", Form.Name);
            ErrorMessage = "സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു.";
            return Page();
        }
    }
}
