using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging.Abstractions;
using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class ArchiveServiceTests
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
    public async Task ArchiveApplicationPdf_ShouldSaveFileInApplicationsFolderOutsideWwwroot()
    {
        // Arrange
        var tempDir = Path.Combine(Path.GetTempPath(), "npl_test_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(tempDir);

        try
        {
            var env = new MockWebHostEnvironment
            {
                ContentRootPath = tempDir,
                WebRootPath = Path.Combine(tempDir, "wwwroot")
            };

            var service = new ApplicationArchiveService(env, NullLogger<ApplicationArchiveService>.Instance);
            var refId = "NPL-2026-TEST";
            var testBytes = "%PDF-1.4 Mock PDF Content %%EOF"u8.ToArray();

            // Act
            var result = await service.ArchiveApplicationPdfAsync(refId, testBytes);

            // Assert
            Assert.True(result);
            var expectedPath = Path.Combine(tempDir, "applications", $"Application_{refId}.pdf");
            Assert.True(File.Exists(expectedPath));

            var savedBytes = await File.ReadAllBytesAsync(expectedPath);
            Assert.Equal(testBytes, savedBytes);

            // Verify it is NOT under wwwroot
            Assert.DoesNotContain("wwwroot", expectedPath);
        }
        finally
        {
            if (Directory.Exists(tempDir))
            {
                Directory.Delete(tempDir, recursive: true);
            }
        }
    }
}
