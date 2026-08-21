using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class PdfServiceTests
{
    [Fact]
    public void BuildHtmlTemplate_StandardApplicant_ShouldContainAllRequiredMalayalamSections()
    {
        // Arrange
        var request = new GeneratePdfRequest(
            ReferenceId: "NPL-2026-8F2B",
            SubmittedAt: "21/08/2026, 10:30:00 AM",
            Name: "വിനീത് കുമാർ",
            Mobile: "9446823434",
            Gender: "പുരുഷൻ",
            Address: "നെടുങ്കണ്ടം പി.ഒ, ഇടുക്കി",
            Panchayat: "നെടുങ്കണ്ടം",
            Ward: "12",
            Pincode: "685553",
            Email: "vineeth@example.com",
            Category: "പൊതുവിഭാഗം",
            GuardianName: null,
            GuardianRelation: null,
            GuardianPhone: null,
            AdmissionFee: "50",
            Deposit: "100",
            MonthlyFee: "20"
        );

        // Act
        var html = PdfService.BuildHtmlTemplate(request, "data:image/png;base64,MOCK_LOGO");

        // Assert
        Assert.Contains("നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി", html);
        Assert.Contains("അംഗത്വ അപേക്ഷാ ഫോം", html);
        Assert.Contains("NPL-2026-8F2B", html);
        Assert.Contains("21/08/2026, 10:30:00 AM", html);
        Assert.Contains("വിനീത് കുമാർ", html);
        Assert.Contains("9446823434", html);
        Assert.Contains("പൊതുവിഭാഗം", html);
        Assert.Contains("₹ 50", html);
        Assert.Contains("₹ 100", html);
        Assert.Contains("₹ 20", html);
        Assert.Contains("ഞാൻ നൽകിയിരിക്കുന്ന വിവരങ്ങൾ ശരിയാണെന്ന് ഇതിനാൽ സാക്ഷ്യപ്പെടുത്തുന്നു", html);
        Assert.Contains("അപേക്ഷകന്റെ / രക്ഷിതാവിന്റെ ഒപ്പ്", html);
        Assert.Contains("ലൈബ്രേറിയൻ / അധികൃതരുടെ ഒപ്പ്", html);
        Assert.Contains("നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി, ഇടുക്കി, കേരളം — ഔദ്യോഗിക അംഗത്വ അപേക്ഷാ രേഖ", html);

        // Guardian details should not be present
        Assert.DoesNotContain("രക്ഷകർത്താവിന്റെ പേര്", html);
    }

    [Fact]
    public void BuildHtmlTemplate_ChildApplicant_ShouldIncludeGuardianDetails()
    {
        // Arrange
        var request = new GeneratePdfRequest(
            ReferenceId: "NPL-2026-3A1D",
            SubmittedAt: "21/08/2026, 11:00:00 AM",
            Name: "അനന്തു തോമസ്",
            Mobile: "9446823434",
            Gender: "പുരുഷൻ",
            Address: "നെടുങ്കണ്ടം",
            Panchayat: "നെടുങ്കണ്ടം",
            Ward: "4",
            Pincode: null,
            Email: null,
            Category: "കുട്ടി",
            GuardianName: "തോമസ് ലൂക്കോസ്",
            GuardianRelation: "അച്ഛൻ",
            GuardianPhone: "9446823434",
            AdmissionFee: null,
            Deposit: null,
            MonthlyFee: null
        );

        // Act
        var html = PdfService.BuildHtmlTemplate(request, string.Empty);

        // Assert
        Assert.Contains("കുട്ടി", html);
        Assert.Contains("രക്ഷകർത്താവിന്റെ പേര്", html);
        Assert.Contains("തോമസ് ലൂക്കോസ്", html);
        Assert.Contains("(അച്ഛൻ)", html);
        Assert.Contains("രക്ഷകർത്താവിന്റെ ഫോൺ", html);
        
        // Blank payments should render as ₹ 0
        Assert.Contains("₹ 0", html);
    }
}
