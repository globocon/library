using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NedumkandomPublicLibrary.Options;

namespace NedumkandomPublicLibrary.Pages;

public class ContactModel : PageModel
{
    private readonly LibraryOptions _libraryOptions;
    private readonly ILogger<ContactModel> _logger;

    public ContactModel(IOptions<LibraryOptions> libraryOptions, ILogger<ContactModel> logger)
    {
        _libraryOptions = libraryOptions.Value;
        _logger = logger;
    }

    public class ContactFormInput
    {
        [Required(ErrorMessage = "പേര് നൽകുക.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "മൊബൈൽ നമ്പർ നൽകുക.")]
        public string Mobile { get; set; } = string.Empty;

        public string? Email { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }
    }

    [BindProperty]
    public ContactFormInput Form { get; set; } = new();

    public bool IsSubmitted { get; set; } = false;
    public string? ReferenceId { get; set; }
    public string? SuccessMessage { get; set; }
    public string? ErrorMessage { get; set; }

    public LibraryOptions Library => _libraryOptions;

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
            ReferenceId = $"NPL-MSG-{randomCode}";
            SuccessMessage = "സന്ദേശം ലഭിച്ചു. നന്ദി!";
            IsSubmitted = true;

            _logger.LogInformation("[CONTACT FORM SUBMITTED] Ref: {Ref} | From: {Name} | Mobile: {Mobile}",
                ReferenceId, Form.Name, Form.Mobile);

            return Page();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact message from {Name}", Form.Name);
            ErrorMessage = "സന്ദേശം അയയ്ക്കുന്നതിൽ പിശക് സംഭവിച്ചു.";
            return Page();
        }
    }
}
