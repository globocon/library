using System.Text.RegularExpressions;
using NedumkandomPublicLibrary.Services;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class ReferenceNumberTests
{
    private readonly IReferenceNumberGenerator _generator = new ReferenceNumberGenerator();

    [Fact]
    public void GenerateReferenceNumber_ShouldMatchRequiredFormat()
    {
        var refNumber = _generator.GenerateReferenceNumber();

        // Exact pattern: NPL-YYYY-XXXX (4 uppercase hex characters)
        Assert.Matches(@"^NPL-\d{4}-[A-F0-9]{4}$", refNumber);
    }

    [Fact]
    public void GenerateReferenceNumber_ShouldContainCurrentYear()
    {
        var currentYear = DateTime.UtcNow.Year.ToString();
        var refNumber = _generator.GenerateReferenceNumber();

        Assert.StartsWith($"NPL-{currentYear}-", refNumber);
    }

    [Fact]
    public void GenerateReferenceNumber_MultipleCalls_ShouldProduceVariedHexCodes()
    {
        var set = new HashSet<string>();
        for (int i = 0; i < 50; i++)
        {
            var refNum = _generator.GenerateReferenceNumber();
            set.Add(refNum);
        }

        // Cryptographically random 2 bytes (65,536 space)
        Assert.True(set.Count >= 45, "Expected high uniqueness across 50 random generations.");
    }
}
