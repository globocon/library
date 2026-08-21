using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class PdfGenerationIntegrationTests
{
    private class MockWebHostEnvironment : IWebHostEnvironment
    {
        public string WebRootPath { get; set; } = string.Empty;
        public Microsoft.Extensions.FileProviders.IFileProvider WebRootFileProvider { get; set; } = null!;
        public string ApplicationName { get; set; } = "NedumkandomPublicLibrary";
        public Microsoft.Extensions.FileProviders.IFileProvider ContentRootFileProvider { get; set; } = null!;
        public string ContentRootPath { get; set; } = string.Empty;
        public string EnvironmentName { get; set; } = "Development";
    }

    [Fact]
    public async Task GenerateRealPdfs_ShouldProduceValidNonEmptyA4PdfFiles()
    {
        // Find wwwroot path
        var solutionDir = Directory.GetCurrentDirectory();
        while (solutionDir != null && !File.Exists(Path.Combine(solutionDir, "NedumkandomPublicLibrary.sln")))
        {
            solutionDir = Directory.GetParent(solutionDir)?.FullName;
        }

        var webRoot = Path.Combine(solutionDir ?? "", "NedumkandomPublicLibrary", "wwwroot");
        var env = new MockWebHostEnvironment
        {
            WebRootPath = webRoot,
            ContentRootPath = Path.Combine(solutionDir ?? "", "NedumkandomPublicLibrary")
        };

        var pdfService = new PdfService(env, NullLogger<PdfService>.Instance);
        var testOutDir = Path.Combine(Path.GetTempPath(), "npl_pdf_tests");
        Directory.CreateDirectory(testOutDir);

        // 1. Test PDF A: Standard Adult Applicant
        var requestA = new GeneratePdfRequest(
            ReferenceId: "NPL-2026-TESTA",
            SubmittedAt: "21/08/2026, 11:00:00 AM",
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

        var pdfBytesA = await pdfService.GenerateApplicationPdfAsync(requestA);
        Assert.NotNull(pdfBytesA);
        Assert.True(pdfBytesA.Length > 10000, "Expected generated PDF A to be substantial in size");
        Assert.Equal(0x25, pdfBytesA[0]); // %
        Assert.Equal(0x50, pdfBytesA[1]); // P
        Assert.Equal(0x44, pdfBytesA[2]); // D
        Assert.Equal(0x46, pdfBytesA[3]); // F

        var pathA = Path.Combine(testOutDir, "Application_NPL-2026-TESTA.pdf");
        await File.WriteAllBytesAsync(pathA, pdfBytesA);

        // 2. Test PDF B: Child with Guardian Details
        var requestB = new GeneratePdfRequest(
            ReferenceId: "NPL-2026-TESTB",
            SubmittedAt: "21/08/2026, 11:15:00 AM",
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

        var pdfBytesB = await pdfService.GenerateApplicationPdfAsync(requestB);
        Assert.NotNull(pdfBytesB);
        Assert.True(pdfBytesB.Length > 10000, "Expected generated PDF B to be substantial in size");
        
        var pathB = Path.Combine(testOutDir, "Application_NPL-2026-TESTB.pdf");
        await File.WriteAllBytesAsync(pathB, pdfBytesB);
    }
}
