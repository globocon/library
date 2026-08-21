using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using NedumkandomPublicLibrary.Models;
using NedumkandomPublicLibrary.Options;
using NedumkandomPublicLibrary.Pages;
using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class IndexPageModelTests
{
    private class FakePdfService : IPdfService
    {
        public GeneratePdfRequest? LastRequest { get; private set; }
        public Task<byte[]> GenerateApplicationPdfAsync(GeneratePdfRequest request, CancellationToken cancellationToken = default)
        {
            LastRequest = request;
            return Task.FromResult("%PDF-1.4 Mock PDF Content %%EOF"u8.ToArray());
        }
    }

    private class FakeEmailService : IEmailService
    {
        public SendEmailRequest? LastRequest { get; private set; }
        public bool ShouldSucceed { get; set; } = true;
        public string? FailureError { get; set; } = "SMTP failure";

        public Task<EmailResult> SendApplicationEmailAsync(SendEmailRequest request, CancellationToken cancellationToken = default)
        {
            LastRequest = request;
            if (!ShouldSucceed)
            {
                return Task.FromResult(new EmailResult(false, Error: FailureError));
            }
            return Task.FromResult(new EmailResult(true, MessageId: "<test-msg-id@gmail.com>"));
        }
    }

    private class FakeArchiveService : IApplicationArchiveService
    {
        public string? LastReferenceId { get; private set; }
        public Task<bool> ArchiveApplicationPdfAsync(string referenceId, byte[] pdfBytes, CancellationToken cancellationToken = default)
        {
            LastReferenceId = referenceId;
            return Task.FromResult(true);
        }
    }

    private readonly IReferenceNumberGenerator _refGenerator = new ReferenceNumberGenerator();
    private readonly IOptions<LibraryOptions> _libraryOptions = Microsoft.Extensions.Options.Options.Create(new LibraryOptions());

    private (IndexModel model, FakePdfService pdf, FakeEmailService email, FakeArchiveService archive) CreatePageModel()
    {
        var httpContext = new DefaultHttpContext();
        var modelState = new ModelStateDictionary();
        var actionContext = new ActionContext(httpContext, new RouteData(), new PageActionDescriptor(), modelState);
        var modelMetadataProvider = new EmptyModelMetadataProvider();
        var viewData = new ViewDataDictionary(modelMetadataProvider, modelState);
        var pageContext = new PageContext(actionContext)
        {
            ViewData = viewData
        };

        var fakePdf = new FakePdfService();
        var fakeEmail = new FakeEmailService();
        var fakeArchive = new FakeArchiveService();

        var model = new IndexModel(
            _refGenerator,
            fakePdf,
            fakeEmail,
            fakeArchive,
            _libraryOptions,
            NullLogger<IndexModel>.Instance)
        {
            PageContext = pageContext
        };

        return (model, fakePdf, fakeEmail, fakeArchive);
    }

    [Fact]
    public async Task OnPostAsync_ValidStandardApplication_ShouldExecuteCompleteWorkflowWithSingleReferenceNumber()
    {
        // Arrange
        var (pageModel, fakePdf, fakeEmail, fakeArchive) = CreatePageModel();
        pageModel.Form = new MembershipApplicationModel
        {
            Name = "വിനീത് കുമാർ",
            Mobile = "9446823434",
            Gender = "പുരുഷൻ",
            Address = "നെടുങ്കണ്ടം പി.ഒ, ഇടുക്കി",
            Panchayat = "നെടുങ്കണ്ടം",
            Ward = "12",
            Pincode = "685553",
            Email = "vineeth@example.com",
            Category = "പൊതുവിഭാഗം",
            AdmissionFee = "50",
            Deposit = "100",
            MonthlyFee = "20"
        };

        // Act
        var result = await pageModel.OnPostAsync(CancellationToken.None);

        // Assert
        Assert.IsType<PageResult>(result);
        Assert.True(pageModel.IsSubmitted);
        Assert.NotNull(pageModel.ReferenceId);
        Assert.Matches(@"^NPL-\d{4}-[A-F0-9]{4}$", pageModel.ReferenceId);

        // Verify single reference number used consistently across all services
        Assert.Equal(pageModel.ReferenceId, fakePdf.LastRequest?.ReferenceId);
        Assert.Equal(pageModel.ReferenceId, fakeArchive.LastReferenceId);
        Assert.Equal(pageModel.ReferenceId, fakeEmail.LastRequest?.ReferenceId);
        Assert.Equal($"Application_{pageModel.ReferenceId}.pdf", fakeEmail.LastRequest?.PdfFileName);
    }

    [Fact]
    public async Task OnPostAsync_EmailServiceFailure_ShouldSetErrorMessageAndNotReportSuccess()
    {
        // Arrange
        var (pageModel, fakePdf, fakeEmail, fakeArchive) = CreatePageModel();
        fakeEmail.ShouldSucceed = false;
        fakeEmail.FailureError = "Gmail authentication failure";

        pageModel.Form = new MembershipApplicationModel
        {
            Name = "വിനീത് കുമാർ",
            Mobile = "9446823434",
            Gender = "പുരുഷൻ",
            Address = "നെടുങ്കണ്ടം പി.ഒ, ഇടുക്കി",
            Panchayat = "നെടുങ്കണ്ടം",
            Ward = "12",
            Pincode = "685553",
            Category = "പൊതുവിഭാഗം"
        };

        // Act
        var result = await pageModel.OnPostAsync(CancellationToken.None);

        // Assert
        Assert.IsType<PageResult>(result);
        Assert.False(pageModel.IsSubmitted);
        Assert.NotNull(pageModel.ErrorMessage);
        Assert.Contains("അപേക്ഷ സമർപ്പിക്കുന്നതിൽ തടസ്സം നേരിട്ടു", pageModel.ErrorMessage);
    }

    [Fact]
    public async Task OnPostAsync_InvalidModel_ShouldNotInvokeServicesOrGenerateRef()
    {
        // Arrange
        var (pageModel, fakePdf, fakeEmail, fakeArchive) = CreatePageModel();
        pageModel.ModelState.AddModelError("Form.Name", "ദയവായി താങ്കളുടെ പേര് നൽകുക.");

        // Act
        var result = await pageModel.OnPostAsync(CancellationToken.None);

        // Assert
        Assert.IsType<PageResult>(result);
        Assert.False(pageModel.IsSubmitted);
        Assert.Null(pageModel.ReferenceId);

        // Services should not be called
        Assert.Null(fakePdf.LastRequest);
        Assert.Null(fakeArchive.LastReferenceId);
        Assert.Null(fakeEmail.LastRequest);
    }
}
