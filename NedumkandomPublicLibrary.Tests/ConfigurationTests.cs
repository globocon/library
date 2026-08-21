using NedumkandomPublicLibrary.Options;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class ConfigurationTests
{
    [Fact]
    public void EmailOptions_ShouldContainThreeConfiguredRecipients()
    {
        // Arrange
        var options = new EmailOptions
        {
            Recipient1 = "vineethsocialm@gmail.com",
            Recipient2 = "tomluckose.apn16@gmail.com",
            Recipient3 = "jino@globoconsofware.com"
        };

        // Act
        var recipients = options.GetAllRecipients();

        // Assert
        Assert.Equal(3, recipients.Count);
        Assert.Contains("vineethsocialm@gmail.com", recipients);
        Assert.Contains("tomluckose.apn16@gmail.com", recipients);
        Assert.Contains("jino@globoconsofware.com", recipients);
    }

    [Fact]
    public void LibraryOptions_ShouldHaveDefaultValuesMatchingSourceOfTruth()
    {
        // Arrange
        var options = new LibraryOptions();

        // Assert
        Assert.Equal("നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി", options.Name);
        Assert.Equal("9446823434", options.Phone);
        Assert.Equal("3:00 PM – 8:00 PM", options.WeekdayHours);
    }
}
