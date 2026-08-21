namespace NedumkandomPublicLibrary.Services;

public record GeneratePdfRequest(
    string ReferenceId,
    string SubmittedAt,
    string Name,
    string Mobile,
    string Gender,
    string Address,
    string Panchayat,
    string Ward,
    string? Pincode,
    string? Email,
    string Category,
    string? GuardianName,
    string? GuardianRelation,
    string? GuardianPhone,
    string? AdmissionFee,
    string? Deposit,
    string? MonthlyFee
);

public interface IPdfService
{
    Task<byte[]> GenerateApplicationPdfAsync(GeneratePdfRequest request, CancellationToken cancellationToken = default);
}
