using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace NedumkandomPublicLibrary.Services;

public class ApplicationArchiveService : IApplicationArchiveService
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ApplicationArchiveService> _logger;

    public ApplicationArchiveService(IWebHostEnvironment env, ILogger<ApplicationArchiveService> logger)
    {
        _env = env;
        _logger = logger;
    }

    public async Task<bool> ArchiveApplicationPdfAsync(string referenceId, byte[] pdfBytes, CancellationToken cancellationToken = default)
    {
        try
        {
            // Directory is outside wwwroot in content root path
            var archiveDir = Path.Combine(_env.ContentRootPath, "applications");
            if (!Directory.Exists(archiveDir))
            {
                Directory.CreateDirectory(archiveDir);
            }

            // Path traversal protection: sanitize filename
            var safeFileName = Path.GetFileName($"Application_{referenceId}.pdf");
            var filePath = Path.Combine(archiveDir, safeFileName);

            await File.WriteAllBytesAsync(filePath, pdfBytes, cancellationToken);
            _logger.LogInformation("[ARCHIVE SUCCESS] Saved archive PDF copy to: {FilePath} ({Size} bytes)", filePath, pdfBytes.Length);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "[ARCHIVE WARNING] Could not save archive PDF copy for Ref: {Ref}", referenceId);
            return false; // Defensive: Allow submission to proceed even if archive disk write fails
        }
    }
}
