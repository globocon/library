using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NedumkandomPublicLibrary.Models;
using NedumkandomPublicLibrary.Options;
using NedumkandomPublicLibrary.Services;

namespace NedumkandomPublicLibrary.Pages;

public abstract class MembershipPageBase : PageModel
{
    protected readonly IReferenceNumberGenerator RefGenerator;
    protected readonly IPdfService PdfService;
    protected readonly IEmailService EmailService;
    protected readonly IApplicationArchiveService ArchiveService;
    protected readonly LibraryOptions LibraryOptions;
    protected readonly ILogger Logger;

    protected MembershipPageBase(
        IReferenceNumberGenerator refGenerator,
        IPdfService pdfService,
        IEmailService emailService,
        IApplicationArchiveService archiveService,
        IOptions<LibraryOptions> libraryOptions,
        ILogger logger)
    {
        RefGenerator = refGenerator;
        PdfService = pdfService;
        EmailService = emailService;
        ArchiveService = archiveService;
        LibraryOptions = libraryOptions.Value;
        Logger = logger;
    }

    [BindProperty]
    public MembershipApplicationModel Form { get; set; } = new();

    public bool IsSubmitted { get; set; } = false;
    public string? ReferenceId { get; set; }
    public string? ErrorMessage { get; set; }

    public LibraryOptions Library => LibraryOptions;

    public virtual void OnGet()
    {
        IsSubmitted = false;
    }

    public virtual async Task<IActionResult> ProcessMembershipSubmissionAsync(CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            Logger.LogWarning("Membership form submission failed model validation with {ErrorCount} errors.", ModelState.ErrorCount);
            return Page();
        }

        try
        {
            // 1. Generate single authoritative reference number
            var refId = RefGenerator.GenerateReferenceNumber();

            // 2. Generate single authoritative submission timestamp (IST)
            string submittedAt;
            try
            {
                var istZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
                var istTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, istZone);
                submittedAt = istTime.ToString("dd/MM/yyyy, hh:mm:ss tt");
            }
            catch
            {
                submittedAt = DateTime.UtcNow.AddHours(5.5).ToString("dd/MM/yyyy, hh:mm:ss tt");
            }

            Logger.LogInformation("[MEMBERSHIP SUBMISSION START] Ref: {Ref} | Name: {Name} | Category: {Cat}",
                refId, Form.Name, Form.Category);

            // 3. Generate official Malayalam A4 PDF
            var pdfRequest = new GeneratePdfRequest(
                ReferenceId: refId,
                SubmittedAt: submittedAt,
                Name: Form.Name,
                Mobile: Form.Mobile,
                Gender: Form.Gender,
                Address: Form.Address,
                Panchayat: Form.Panchayat,
                Ward: Form.Ward,
                Pincode: Form.Pincode,
                Email: Form.Email,
                Category: Form.Category,
                GuardianName: Form.GuardianName,
                GuardianRelation: Form.GuardianRelation,
                GuardianPhone: Form.GuardianPhone,
                AdmissionFee: Form.AdmissionFee,
                Deposit: Form.Deposit,
                MonthlyFee: Form.MonthlyFee
            );

            var pdfBytes = await PdfService.GenerateApplicationPdfAsync(pdfRequest, cancellationToken);
            if (pdfBytes == null || pdfBytes.Length == 0)
            {
                throw new InvalidOperationException("Generated PDF buffer was empty.");
            }

            // 4. Attempt permanent local PDF archive
            var pdfFileName = $"Application_{refId}.pdf";
            await ArchiveService.ArchiveApplicationPdfAsync(refId, pdfBytes, cancellationToken);

            // 5. Send PDF by email to all 3 designated recipients
            var emailRequest = new SendEmailRequest(
                ReferenceId: refId,
                FormType: "അംഗത്വ അപേക്ഷ",
                ApplicantName: Form.Name,
                SubmittedAt: submittedAt,
                PdfBytes: pdfBytes,
                PdfFileName: pdfFileName
            );

            var emailResult = await EmailService.SendApplicationEmailAsync(emailRequest, cancellationToken);
            if (!emailResult.Success)
            {
                Logger.LogError("[EMAIL DISPATCH FAILED] Ref: {Ref} | Error: {Error}", refId, emailResult.Error);
                ErrorMessage = "അപേക്ഷ സമർപ്പിക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.";
                return Page();
            }

            // 6. Set success state ONLY when email successfully dispatches
            ReferenceId = refId;
            IsSubmitted = true;

            Logger.LogInformation("[MEMBERSHIP SUBMISSION COMPLETE] Ref: {Ref} | Success State Rendered", refId);
            return Page();
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Unexpected error processing membership application for {Name}.", Form.Name);
            ErrorMessage = "അപേക്ഷ സമർപ്പിക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.";
            return Page();
        }
    }
}
