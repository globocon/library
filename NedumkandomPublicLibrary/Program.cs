using NedumkandomPublicLibrary.Options;
using NedumkandomPublicLibrary.Services;

// Load local .env / .env.local files if present (for local dev / inspection)
LoadLocalEnvFiles();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();

// Configure strongly-typed options with environment variable fallbacks
builder.Services.Configure<EmailOptions>(options =>
{
    builder.Configuration.GetSection(EmailOptions.SectionName).Bind(options);

    var envAppPassword = Environment.GetEnvironmentVariable("Email__AppPassword")
        ?? Environment.GetEnvironmentVariable("GMAIL_APP_PASSWORD")
        ?? Environment.GetEnvironmentVariable("SMTP_PASSWORD")
        ?? builder.Configuration["Email:AppPassword"]
        ?? builder.Configuration["GMAIL_APP_PASSWORD"]
        ?? builder.Configuration["SMTP_PASSWORD"];

    if (!string.IsNullOrWhiteSpace(envAppPassword))
    {
        options.AppPassword = envAppPassword.Trim();
    }

    var envGmailUser = Environment.GetEnvironmentVariable("Email__SenderEmail")
        ?? Environment.GetEnvironmentVariable("GMAIL_USER")
        ?? Environment.GetEnvironmentVariable("SMTP_USERNAME")
        ?? builder.Configuration["Email:SenderEmail"]
        ?? builder.Configuration["GMAIL_USER"];

    if (!string.IsNullOrWhiteSpace(envGmailUser))
    {
        options.SenderEmail = envGmailUser.Trim();
    }

    var envRec1 = Environment.GetEnvironmentVariable("Email__Recipient1")
        ?? Environment.GetEnvironmentVariable("LIBRARY_EMAIL_1")
        ?? builder.Configuration["Email:Recipient1"]
        ?? builder.Configuration["LIBRARY_EMAIL_1"];
    if (!string.IsNullOrWhiteSpace(envRec1)) options.Recipient1 = envRec1.Trim();

    var envRec2 = Environment.GetEnvironmentVariable("Email__Recipient2")
        ?? Environment.GetEnvironmentVariable("LIBRARY_EMAIL_2")
        ?? builder.Configuration["Email:Recipient2"]
        ?? builder.Configuration["LIBRARY_EMAIL_2"];
    if (!string.IsNullOrWhiteSpace(envRec2)) options.Recipient2 = envRec2.Trim();

    var envRec3 = Environment.GetEnvironmentVariable("Email__Recipient3")
        ?? Environment.GetEnvironmentVariable("LIBRARY_EMAIL_3")
        ?? builder.Configuration["Email:Recipient3"]
        ?? builder.Configuration["LIBRARY_EMAIL_3"];
    if (!string.IsNullOrWhiteSpace(envRec3)) options.Recipient3 = envRec3.Trim();
});

builder.Services.Configure<LibraryOptions>(builder.Configuration.GetSection(LibraryOptions.SectionName));

// Configure dependency injection for core services
builder.Services.AddSingleton<IReferenceNumberGenerator, ReferenceNumberGenerator>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IPdfService, PdfService>();
builder.Services.AddScoped<IApplicationArchiveService, ApplicationArchiveService>();

// Antiforgery configuration
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-CSRF-TOKEN";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();

static void LoadLocalEnvFiles()
{
    try
    {
        var searchDirs = new[]
        {
            Directory.GetCurrentDirectory(),
            AppDomain.CurrentDomain.BaseDirectory,
            Path.Combine(Directory.GetCurrentDirectory(), "..")
        };

        foreach (var dir in searchDirs)
        {
            if (!Directory.Exists(dir)) continue;
            var envFiles = new[] { Path.Combine(dir, ".env.local"), Path.Combine(dir, ".env") };
            foreach (var file in envFiles)
            {
                if (File.Exists(file))
                {
                    foreach (var line in File.ReadAllLines(file))
                    {
                        var trimmed = line.Trim();
                        if (string.IsNullOrWhiteSpace(trimmed) || trimmed.StartsWith('#')) continue;
                        var eqIdx = trimmed.IndexOf('=');
                        if (eqIdx > 0)
                        {
                            var key = trimmed[..eqIdx].Trim();
                            var val = trimmed[(eqIdx + 1)..].Trim();
                            if (string.IsNullOrEmpty(Environment.GetEnvironmentVariable(key)))
                            {
                                Environment.SetEnvironmentVariable(key, val);
                            }
                        }
                    }
                }
            }
        }
    }
    catch
    {
        // Safe ignore for production environments where env vars come from Azure
    }
}

public partial class Program { }
