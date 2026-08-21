namespace NedumkandomPublicLibrary.Services;

public record EmailAttachment(string FileName, byte[] Content, string ContentType);

public record SendEmailRequest(
    string ReferenceId,
    string FormType,
    string? ApplicantName,
    string SubmittedAt,
    byte[] PdfBytes,
    string PdfFileName
);

public record EmailResult(bool Success, string? MessageId = null, string? Error = null);

public interface IEmailService
{
    Task<EmailResult> SendApplicationEmailAsync(SendEmailRequest request, CancellationToken cancellationToken = default);
}
