namespace NedumkandomPublicLibrary.Options;

public class EmailOptions
{
    public const string SectionName = "Email";

    public string SmtpServer { get; set; } = "smtp.gmail.com";
    public int SmtpPort { get; set; } = 587;
    public bool UseSsl { get; set; } = false;
    public string SenderEmail { get; set; } = "nedumkandomlibrary@gmail.com";
    public string SenderDisplayName { get; set; } = "നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി";
    public string AppPassword { get; set; } = string.Empty;

    public string Recipient1 { get; set; } = "vineethsocialm@gmail.com";
    public string Recipient2 { get; set; } = "tomluckose.apn16@gmail.com";
    public string Recipient3 { get; set; } = "jino@globoconsofware.com";

    public IReadOnlyList<string> GetAllRecipients()
    {
        var list = new List<string>();
        if (!string.IsNullOrWhiteSpace(Recipient1)) list.Add(Recipient1.Trim());
        if (!string.IsNullOrWhiteSpace(Recipient2)) list.Add(Recipient2.Trim());
        if (!string.IsNullOrWhiteSpace(Recipient3)) list.Add(Recipient3.Trim());
        return list;
    }
}
