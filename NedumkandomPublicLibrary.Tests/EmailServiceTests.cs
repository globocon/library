using NedumkandomPublicLibrary.Options;
using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class EmailServiceTests
{
    [Fact]
    public void CreateMimeMessage_ShouldConstructValidMessageWithThreeRecipientsAndPdfAttachment()
    {
        // Arrange
        var options = new EmailOptions
        {
            SenderEmail = "nedumkandomlibrary@gmail.com",
            SenderDisplayName = "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി",
            Recipient1 = "vineethsocialm@gmail.com",
            Recipient2 = "tomluckose.apn16@gmail.com",
            Recipient3 = "jino@globoconsofware.com"
        };

        var recipients = options.GetAllRecipients();
        var dummyPdfBytes = "%PDF-1.4 Mock PDF Content %%EOF"u8.ToArray();

        var request = new SendEmailRequest(
            ReferenceId: "NPL-2026-8F2B",
            FormType: "അംഗത്വ അപേക്ഷ",
            ApplicantName: "വിനീത് കുമാർ",
            SubmittedAt: "21/08/2026, 10:30:00 AM",
            PdfBytes: dummyPdfBytes,
            PdfFileName: "Application_NPL-2026-8F2B.pdf"
        );

        // Act
        var message = EmailService.CreateMimeMessage(request, options, recipients);

        // Assert
        Assert.NotNull(message);
        Assert.Contains("നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി", message.From.ToString());
        Assert.Contains("nedumkandomlibrary@gmail.com", message.From.ToString());
        
        // Exactly 3 recipients
        Assert.Equal(3, message.To.Count);
        Assert.Contains(message.To.Mailboxes, m => m.Address == "vineethsocialm@gmail.com");
        Assert.Contains(message.To.Mailboxes, m => m.Address == "tomluckose.apn16@gmail.com");
        Assert.Contains(message.To.Mailboxes, m => m.Address == "jino@globoconsofware.com");

        // Subject
        Assert.Equal("അംഗത്വ അപേക്ഷ: വിനീത് കുമാർ - [NPL-2026-8F2B]", message.Subject);

        // Custom headers
        Assert.Equal("Nedumkandom-Public-Library-Portal", message.Headers["X-Mailer"]);
        Assert.Equal("NPL-2026-8F2B", message.Headers["X-Entity-Ref-ID"]);

        // Attachments
        Assert.Single(message.Attachments);
        var attachment = message.Attachments.First() as MimeKit.MimePart;
        Assert.NotNull(attachment);
        Assert.Equal("Application_NPL-2026-8F2B.pdf", attachment.FileName);
        Assert.Equal("application/pdf", attachment.ContentType.MimeType);
    }
}
