using System.ComponentModel.DataAnnotations;
using NedumkandomPublicLibrary.Models;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class MembershipValidationTests
{
    private static List<ValidationResult> ValidateModel(object model)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(model, serviceProvider: null, items: null);
        Validator.TryValidateObject(model, context, results, validateAllProperties: true);
        return results;
    }

    private static MembershipApplicationModel CreateValidModel()
    {
        return new MembershipApplicationModel
        {
            Name = "വിനീത് കുമാർ",
            Mobile = "9446823434",
            Gender = "പുരുഷൻ",
            Address = "നെടുങ്കണ്ടം പി.ഒ, ഇടുക്കി",
            Panchayat = "നെടുങ്കണ്ടം",
            Ward = "12",
            Pincode = "685553",
            Email = "vineeth@example.com",
            Category = "പൊതുവിഭാഗം",
            AdmissionFee = "50",
            Deposit = "100",
            MonthlyFee = "20"
        };
    }

    [Fact]
    public void ValidApplication_ShouldPassValidation()
    {
        var model = CreateValidModel();
        var results = ValidateModel(model);
        Assert.Empty(results);
    }

    [Fact]
    public void MissingName_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Name = "";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "ദയവായി താങ്കളുടെ പേര് നൽകുക.");
    }

    [Fact]
    public void MissingMobile_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Mobile = "";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "ദയവായി മൊബൈൽ നമ്പർ നൽകുക.");
    }

    [Theory]
    [InlineData("12345")]
    [InlineData("94468234344")]
    [InlineData("abcdefghij")]
    public void InvalidMobile_ShouldFail_WithExactMalayalamMessage(string invalidMobile)
    {
        var model = CreateValidModel();
        model.Mobile = invalidMobile;

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.");
    }

    [Fact]
    public void MissingAddress_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Address = "";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "ദയവായി പൂർണ്ണ വിലാസം നൽകുക.");
    }

    [Fact]
    public void MissingPanchayat_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Panchayat = "";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "ദയവായി പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റിയുടെ പേര് നൽകുക.");
    }

    [Fact]
    public void MissingWard_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Ward = "";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "ദയവായി വാർഡ് നമ്പർ അല്ലെങ്കിൽ പേര് നൽകുക.");
    }

    [Theory]
    [InlineData("രക്ഷാധികാരി അംഗം")]
    [InlineData("ജീവകാല അംഗം")]
    [InlineData("സാധാരണ അംഗം")]
    public void MembershipCategory_WithoutGuardianName_ShouldPassValidation(string category)
    {
        var model = CreateValidModel();
        model.Category = category;
        model.GuardianName = null;

        var results = ValidateModel(model);
        Assert.Empty(results);
    }

    [Fact]
    public void OptionalPincodeAndEmail_CanBeEmpty()
    {
        var model = CreateValidModel();
        model.Pincode = null;
        model.Email = null;

        var results = ValidateModel(model);
        Assert.Empty(results);
    }

    [Fact]
    public void InvalidEmail_ShouldFail_WithExactMalayalamMessage()
    {
        var model = CreateValidModel();
        model.Email = "not-a-valid-email";

        var results = ValidateModel(model);
        Assert.Contains(results, r => r.ErrorMessage == "സാധുവായ ഇ-മെയിൽ വിലാസം നൽകുക.");
    }

    [Fact]
    public void OptionalPayments_CanBeEmptyOrHaveManualValues()
    {
        var model = CreateValidModel();
        model.AdmissionFee = null;
        model.Deposit = null;
        model.MonthlyFee = null;

        var results = ValidateModel(model);
        Assert.Empty(results);
    }
}
