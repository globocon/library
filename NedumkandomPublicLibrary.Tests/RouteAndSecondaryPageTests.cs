using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace NedumkandomPublicLibrary.Tests;

public class RouteAndSecondaryPageTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public RouteAndSecondaryPageTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Theory]
    [InlineData("/")]
    [InlineData("/membership-apply")]
    [InlineData("/membership")]
    [InlineData("/about")]
    [InlineData("/books")]
    [InlineData("/new-arrivals")]
    [InlineData("/children")]
    [InlineData("/students")]
    [InlineData("/periodicals")]
    [InlineData("/digital-library")]
    [InlineData("/events")]
    [InlineData("/activities")]
    [InlineData("/gallery")]
    [InlineData("/committee")]
    [InlineData("/rules")]
    [InlineData("/contact")]
    [InlineData("/donate-books")]
    [InlineData("/volunteer")]
    [InlineData("/support")]
    [InlineData("/news")]
    [InlineData("/search")]
    [InlineData("/privacy")]
    [InlineData("/future-features")]
    public async Task GetAllFrontendRoutes_ShouldReturnSuccessStatusCodeAndValidHtml(string route)
    {
        // Act
        var response = await _client.GetAsync(route);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി", content);
    }

    [Fact]
    public async Task StandaloneMembershipApplyPage_ShouldContainSingleContainerFormAndFields()
    {
        // Act
        var response = await _client.GetAsync("/membership-apply");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("membershipForm", content);
        Assert.Contains("Form.Name", content);
        Assert.Contains("Form.Mobile", content);
        Assert.Contains("Form.Gender", content);
        Assert.Contains("Form.Address", content);
        Assert.Contains("Form.Panchayat", content);
        Assert.Contains("Form.Ward", content);
        Assert.Contains("Form.Category", content);
        Assert.DoesNotContain("guardianSection", content);
        Assert.Contains("Form.AdmissionFee", content);
        Assert.Contains("Form.Deposit", content);
        Assert.Contains("Form.MonthlyFee", content);
    }

    [Fact]
    public async Task PostApiContact_ShouldReturnSuccessJson()
    {
        var response = await _client.PostAsJsonAsync("/api/contact", new
        {
            name = "വിനീത്",
            mobile = "9446823434",
            message = "ടെസ്റ്റ് സന്ദേശം"
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadFromJsonAsync<ApiResponse>();
        Assert.NotNull(json);
        Assert.True(json.Success);
        Assert.Equal("സന്ദേശം ലഭിച്ചു. നന്ദി!", json.Message);
    }

    [Fact]
    public async Task PostApiDonateBooks_ShouldReturnSuccessJson()
    {
        var response = await _client.PostAsJsonAsync("/api/donate-books", new
        {
            name = "വിനീത്",
            mobile = "9446823434",
            bookCount = 5
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadFromJsonAsync<ApiResponse>();
        Assert.NotNull(json);
        Assert.True(json.Success);
        Assert.Equal("വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!", json.Message);
    }

    [Fact]
    public async Task PostApiVolunteer_ShouldReturnSuccessJson()
    {
        var response = await _client.PostAsJsonAsync("/api/volunteer", new
        {
            name = "വിനീത്",
            mobile = "9446823434",
            areaOfInterest = new[] { "വായനാ പരിപാടികൾ" }
        });

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var json = await response.Content.ReadFromJsonAsync<ApiResponse>();
        Assert.NotNull(json);
        Assert.True(json.Success);
        Assert.Equal("വിവരങ്ങൾ ലഭിച്ചു. നന്ദി!", json.Message);
    }

    private class ApiResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
    }
}
