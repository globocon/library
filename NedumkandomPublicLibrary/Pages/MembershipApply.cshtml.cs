using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NedumkandomPublicLibrary.Options;
using NedumkandomPublicLibrary.Services;

namespace NedumkandomPublicLibrary.Pages;

public class MembershipApplyModel : MembershipPageBase
{
    public MembershipApplyModel(
        IReferenceNumberGenerator refGenerator,
        IPdfService pdfService,
        IEmailService emailService,
        IApplicationArchiveService archiveService,
        IOptions<LibraryOptions> libraryOptions,
        ILogger<MembershipApplyModel> logger)
        : base(refGenerator, pdfService, emailService, archiveService, libraryOptions, logger)
    {
    }

    public Task<IActionResult> OnPostAsync(CancellationToken cancellationToken)
    {
        return ProcessMembershipSubmissionAsync(cancellationToken);
    }
}
