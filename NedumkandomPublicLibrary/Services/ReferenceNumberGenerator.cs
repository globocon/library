using System.Security.Cryptography;

namespace NedumkandomPublicLibrary.Services;

public interface IReferenceNumberGenerator
{
    string GenerateReferenceNumber();
}

public class ReferenceNumberGenerator : IReferenceNumberGenerator
{
    public string GenerateReferenceNumber()
    {
        var year = DateTime.UtcNow.Year;
        var randomBytes = RandomNumberGenerator.GetBytes(2);
        var hex = Convert.ToHexString(randomBytes).ToUpperInvariant();
        return $"NPL-{year}-{hex}";
    }
}
