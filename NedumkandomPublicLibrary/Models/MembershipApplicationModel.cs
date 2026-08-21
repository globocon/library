using System.ComponentModel.DataAnnotations;

namespace NedumkandomPublicLibrary.Models;

public class MembershipApplicationModel : IValidatableObject
{
    [Required(ErrorMessage = "ദയവായി താങ്കളുടെ പേര് നൽകുക.")]
    [Display(Name = "പേര്")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "ദയവായി മൊബൈൽ നമ്പർ നൽകുക.")]
    [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.")]
    [Display(Name = "മൊബൈൽ നമ്പർ")]
    public string Mobile { get; set; } = string.Empty;

    [Display(Name = "ലിംഗം")]
    public string Gender { get; set; } = "പുരുഷൻ";

    [Required(ErrorMessage = "ദയവായി പൂർണ്ണ വിലാസം നൽകുക.")]
    [Display(Name = "പൂർണ്ണ വിലാസം")]
    public string Address { get; set; } = string.Empty;

    [Required(ErrorMessage = "ദയവായി പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റിയുടെ പേര് നൽകുക.")]
    [Display(Name = "പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി")]
    public string Panchayat { get; set; } = string.Empty;

    [Required(ErrorMessage = "ദയവായി വാർഡ് നമ്പർ അല്ലെങ്കിൽ പേര് നൽകുക.")]
    [Display(Name = "വാർഡ്")]
    public string Ward { get; set; } = string.Empty;

    [Display(Name = "പിൻകോഡ്")]
    public string? Pincode { get; set; }

    [EmailAddress(ErrorMessage = "സാധുവായ ഇ-മെയിൽ വിലാസം നൽകുക.")]
    [Display(Name = "ഇ-മെയിൽ")]
    public string? Email { get; set; }

    [Display(Name = "അംഗത്വ വിഭാഗം")]
    public string Category { get; set; } = "പൊതുവിഭാഗം";

    // Minor / Guardian Details (Required when Category == "കുട്ടി")
    [Display(Name = "രക്ഷകർത്താവിന്റെ പേര്")]
    public string? GuardianName { get; set; }

    [Display(Name = "ബന്ധം")]
    public string? GuardianRelation { get; set; }

    [Display(Name = "രക്ഷകർത്താവിന്റെ മൊബൈൽ / ഫോൺ നമ്പർ")]
    public string? GuardianPhone { get; set; }

    // 3 Manual Payment Fields (അപേക്ഷയോടൊപ്പം അടച്ച തുക - ഓപ്ഷണൽ)
    [Display(Name = "അംഗത്വ ഫീസ്")]
    public string? AdmissionFee { get; set; }

    [Display(Name = "ജാമ്യ നിക്ഷേപം")]
    public string? Deposit { get; set; }

    [Display(Name = "മാസവരി")]
    public string? MonthlyFee { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.Equals(Category?.Trim(), "കുട്ടി", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(GuardianName))
            {
                yield return new ValidationResult(
                    "മൈനർ ആയതിനാൽ രക്ഷകർത്താവിന്റെ പേര് നൽകുക.",
                    new[] { nameof(GuardianName) }
                );
            }
        }
    }
}
