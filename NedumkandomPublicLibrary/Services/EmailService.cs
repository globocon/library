using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using NedumkandomPublicLibrary.Options;

namespace NedumkandomPublicLibrary.Services;

public class EmailService : IEmailService
{
    private readonly EmailOptions _options;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailOptions> options, ILogger<EmailService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task<EmailResult> SendApplicationEmailAsync(SendEmailRequest request, CancellationToken cancellationToken = default)
    {
        var recipients = _options.GetAllRecipients();

        // 1. Defensive validation of required configurations
        if (string.IsNullOrWhiteSpace(_options.SenderEmail))
        {
            const string errorMsg = "Email configuration error: SenderEmail is not configured.";
            _logger.LogError("[EMAIL CONFIG ERROR] Ref: {Ref} | {Error}", request.ReferenceId, errorMsg);
            return new EmailResult(false, Error: errorMsg);
        }

        if (string.IsNullOrWhiteSpace(_options.AppPassword))
        {
            const string errorMsg = "Email configuration error: AppPassword is not configured.";
            _logger.LogError("[EMAIL CONFIG ERROR] Ref: {Ref} | {Error}", request.ReferenceId, errorMsg);
            return new EmailResult(false, Error: errorMsg);
        }

        if (recipients.Count == 0)
        {
            const string errorMsg = "Email configuration error: No recipient email addresses configured.";
            _logger.LogError("[EMAIL CONFIG ERROR] Ref: {Ref} | {Error}", request.ReferenceId, errorMsg);
            return new EmailResult(false, Error: errorMsg);
        }

        // 2. Build MimeMessage
        var message = CreateMimeMessage(request, _options, recipients);

        _logger.LogInformation("[EMAIL INITIATED] Ref: {Ref} | From: {From} | Recipients: {Recipients} | Timestamp: {Timestamp}",
            request.ReferenceId, _options.SenderEmail, string.Join(", ", recipients), request.SubmittedAt);

        // 3. Dispatch via MailKit SmtpClient
        try
        {
            using var client = new SmtpClient();
            
            // Connect to Gmail SMTP (Port 587 STARTTLS)
            var secureSocketOption = _options.UseSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls;
            await client.ConnectAsync(_options.SmtpServer, _options.SmtpPort, secureSocketOption, cancellationToken);
            
            // Authenticate with Gmail App Password (trimmed of whitespace)
            var cleanAppPassword = _options.AppPassword.Trim().Replace(" ", string.Empty);
            await client.AuthenticateAsync(_options.SenderEmail.Trim(), cleanAppPassword, cancellationToken);

            var response = await client.SendAsync(message, cancellationToken);
            await client.DisconnectAsync(true, cancellationToken);

            _logger.LogInformation("[EMAIL SUCCESS] Ref: {Ref} | Server Response: {Response}", request.ReferenceId, response);
            return new EmailResult(true, MessageId: message.MessageId);
        }
        catch (Exception ex)
        {
            var errorMessage = ex.Message;
            _logger.LogError(ex, "[EMAIL FAILURE] Ref: {Ref} | Status: Failed | Error: {Error}", request.ReferenceId, errorMessage);
            return new EmailResult(false, Error: errorMessage);
        }
    }

    public static MimeMessage CreateMimeMessage(SendEmailRequest request, EmailOptions options, IReadOnlyList<string> recipients)
    {
        var message = new MimeMessage();
        
        // Sender & Reply-To
        var senderName = string.IsNullOrWhiteSpace(options.SenderDisplayName) ? "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി" : options.SenderDisplayName;
        message.From.Add(new MailboxAddress(senderName, options.SenderEmail.Trim()));
        message.ReplyTo.Add(new MailboxAddress(senderName, options.SenderEmail.Trim()));

        // Exactly 3 Recipients
        foreach (var recipient in recipients)
        {
            message.To.Add(MailboxAddress.Parse(recipient.Trim()));
        }

        // Subject
        var applicantName = string.IsNullOrWhiteSpace(request.ApplicantName) ? "അപേക്ഷകൻ" : request.ApplicantName;
        message.Subject = $"അംഗത്വ അപേക്ഷ: {applicantName} - [{request.ReferenceId}]";

        // Custom Anti-Spam / Tracing Headers
        message.Headers.Add("X-Mailer", "Nedumkandom-Public-Library-Portal");
        message.Headers.Add("X-Entity-Ref-ID", request.ReferenceId);

        // Body Construction (Multipart Plain + HTML + Attachment)
        var bodyBuilder = new BodyBuilder
        {
            TextBody = $@"നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി - പുതിയ {request.FormType}

റഫറൻസ് നമ്പർ: {request.ReferenceId}
അപേക്ഷകന്റെ പേര്: {request.ApplicantName ?? "—"}
സമർപ്പിച്ച തീയതി: {request.SubmittedAt}

അപേക്ഷയുടെ ഔദ്യോഗിക PDF കോപ്പി ഈ ഇമെയിലിൽ അറ്റാച്ച് ചെയ്തിട്ടുണ്ട്.

ഈ സന്ദേശം നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി ഔദ്യോഗിക വെബ്സൈറ്റ് വഴി അയച്ചതാണ്.",

            HtmlBody = $@"
<div style=""font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;"">
  <div style=""text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 16px;"">
    <h2 style=""color: #064e3b; margin: 0; font-size: 20px;"">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി</h2>
    <p style=""font-size: 14px; color: #475569; margin: 4px 0 0 0;"">ഔദ്യോഗിക അംഗത്വ അപേക്ഷാ സന്ദേശം</p>
  </div>

  <p style=""font-size: 15px; margin-bottom: 12px;""><strong>പുതിയ അംഗത്വ അപേക്ഷ വിജയകരമായി ലഭിച്ചിട്ടുണ്ട്:</strong></p>
  
  <table style=""width: 100%; border-collapse: collapse; margin: 15px 0; background-color: #f8fafc; border-radius: 8px; overflow: hidden;"">
    <tr>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%; color: #334155;"">അപേക്ഷാ നമ്പർ:</td>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #064e3b;"">{request.ReferenceId}</td>
    </tr>
    <tr>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;"">അപേക്ഷയുടെ തരം:</td>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"">{request.FormType}</td>
    </tr>
    {(string.IsNullOrWhiteSpace(request.ApplicantName) ? "" : $@"
    <tr>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;"">അപേക്ഷകന്റെ പേര്:</td>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"">{request.ApplicantName}</td>
    </tr>")}
    <tr>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;"">സമർപ്പിച്ച തീയതി:</td>
      <td style=""padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"">{request.SubmittedAt}</td>
    </tr>
  </table>

  <p style=""font-size: 13px; color: #334155;"">അപേക്ഷയുടെ ഔദ്യോഗിക A4 PDF കോപ്പി ഈ ഇമെയിലിൽ അറ്റാച്ച് ചെയ്തിട്ടുണ്ട്.</p>
  
  <div style=""border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 12px; text-align: center;"">
    <p style=""font-size: 11px; color: #94a3b8; margin: 0;"">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി, ഇടുക്കി, കേരളം — ഔദ്യോഗിക വെബ് പോർട്ടൽ</p>
  </div>
</div>"
        };

        // Attach Generated PDF
        if (request.PdfBytes != null && request.PdfBytes.Length > 0)
        {
            var fileName = string.IsNullOrWhiteSpace(request.PdfFileName) ? $"Application_{request.ReferenceId}.pdf" : request.PdfFileName;
            var attachment = bodyBuilder.Attachments.Add(fileName, request.PdfBytes, ContentType.Parse("application/pdf"));
            attachment.ContentDisposition = new ContentDisposition(ContentDisposition.Attachment);
        }

        message.Body = bodyBuilder.ToMessageBody();
        return message;
    }
}
