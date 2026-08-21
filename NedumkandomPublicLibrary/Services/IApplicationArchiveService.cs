namespace NedumkandomPublicLibrary.Services;

public interface IApplicationArchiveService
{
    Task<bool> ArchiveApplicationPdfAsync(string referenceId, byte[] pdfBytes, CancellationToken cancellationToken = default);
}
