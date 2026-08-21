using System.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace NedumkandomPublicLibrary.Services;

public class PdfService : IPdfService
{
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<PdfService> _logger;
    private static string? _cachedExecutablePath;
    private static readonly SemaphoreSlim _browserInitLock = new(1, 1);

    public PdfService(IWebHostEnvironment env, ILogger<PdfService> logger)
    {
        _env = env;
        _logger = logger;
    }

    public async Task<byte[]> GenerateApplicationPdfAsync(GeneratePdfRequest request, CancellationToken cancellationToken = default)
    {
        var logoBase64 = GetLogoBase64();
        var htmlContent = BuildHtmlTemplate(request, logoBase64);
        var executablePath = await EnsureBrowserExecutablePathAsync(cancellationToken);

        var launchOptions = new LaunchOptions
        {
            Headless = true,
            ExecutablePath = executablePath,
            Args = new[] { "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage" }
        };

        await using var browser = await Puppeteer.LaunchAsync(launchOptions);
        await using var page = await browser.NewPageAsync();

        await page.SetContentAsync(htmlContent, new SetContentOptions
        {
            WaitUntil = new[] { WaitUntilNavigation.Load }
        });

        // Ensure Noto Sans Malayalam web fonts are fully rendered
        try
        {
            await page.EvaluateExpressionHandleAsync("document.fonts.ready");
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "document.fonts.ready evaluation encountered an issue; proceeding with PDF render.");
        }

        var pdfOptions = new PdfOptions
        {
            Format = PaperFormat.A4,
            PrintBackground = true,
            MarginOptions = new MarginOptions
            {
                Top = "12mm",
                Bottom = "12mm",
                Left = "14mm",
                Right = "14mm"
            }
        };

        var pdfData = await page.PdfDataAsync(pdfOptions);
        _logger.LogInformation("[PDF GENERATED] Ref: {Ref} | Size: {Size} bytes", request.ReferenceId, pdfData.Length);
        return pdfData;
    }

    private string GetLogoBase64()
    {
        try
        {
            var logoPath = Path.Combine(_env.WebRootPath, "images", "logo.png");
            if (File.Exists(logoPath))
            {
                var bytes = File.ReadAllBytes(logoPath);
                return $"data:image/png;base64,{Convert.ToBase64String(bytes)}";
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Could not load logo.png for PDF embedding.");
        }
        return string.Empty;
    }

    private async Task<string> EnsureBrowserExecutablePathAsync(CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(_cachedExecutablePath) && File.Exists(_cachedExecutablePath))
        {
            return _cachedExecutablePath;
        }

        await _browserInitLock.WaitAsync(cancellationToken);
        try
        {
            if (!string.IsNullOrEmpty(_cachedExecutablePath) && File.Exists(_cachedExecutablePath))
            {
                return _cachedExecutablePath;
            }

            // 1. Check environment variable override
            var envPath = Environment.GetEnvironmentVariable("CHROME_PATH") 
                          ?? Environment.GetEnvironmentVariable("PUPPETEER_EXECUTABLE_PATH");
            if (!string.IsNullOrEmpty(envPath) && File.Exists(envPath))
            {
                _cachedExecutablePath = envPath;
                return _cachedExecutablePath;
            }

            // 2. Check standard Windows installations of Chrome / Edge
            var standardPaths = new[]
            {
                @"C:\Program Files\Google\Chrome\Application\chrome.exe",
                @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
                @"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
            };

            foreach (var p in standardPaths)
            {
                if (File.Exists(p))
                {
                    _cachedExecutablePath = p;
                    _logger.LogInformation("Found browser executable for PDF generation: {Path}", p);
                    return _cachedExecutablePath;
                }
            }

            // 3. Fallback: Download bundled Chromium via BrowserFetcher
            _logger.LogInformation("No local browser found. Downloading Chromium via BrowserFetcher...");
            var browserFetcher = new BrowserFetcher();
            var installedBrowser = await browserFetcher.DownloadAsync();
            _cachedExecutablePath = installedBrowser.GetExecutablePath();
            return _cachedExecutablePath;
        }
        finally
        {
            _browserInitLock.Release();
        }
    }

    public static string BuildHtmlTemplate(GeneratePdfRequest request, string logoBase64)
    {
        var refId = HttpUtility.HtmlEncode(request.ReferenceId ?? string.Empty);
        var submittedAt = HttpUtility.HtmlEncode(request.SubmittedAt ?? string.Empty);
        var name = HttpUtility.HtmlEncode(request.Name ?? "—");
        var mobile = HttpUtility.HtmlEncode(request.Mobile ?? "—");
        var gender = HttpUtility.HtmlEncode(request.Gender ?? "—");
        var address = HttpUtility.HtmlEncode(request.Address ?? "—");
        var panchayat = HttpUtility.HtmlEncode(request.Panchayat ?? "—");
        var ward = HttpUtility.HtmlEncode(request.Ward ?? "—");
        var pincode = HttpUtility.HtmlEncode(string.IsNullOrWhiteSpace(request.Pincode) ? "—" : request.Pincode);
        var email = HttpUtility.HtmlEncode(string.IsNullOrWhiteSpace(request.Email) ? "—" : request.Email);
        var category = HttpUtility.HtmlEncode(string.IsNullOrWhiteSpace(request.Category) ? "പൊതുവിഭാഗം" : request.Category);

        var guardianName = HttpUtility.HtmlEncode(request.GuardianName ?? string.Empty);
        var guardianRelation = HttpUtility.HtmlEncode(request.GuardianRelation ?? string.Empty);
        var guardianPhone = HttpUtility.HtmlEncode(request.GuardianPhone ?? string.Empty);

        var admissionFee = string.IsNullOrWhiteSpace(request.AdmissionFee) ? "₹ 0" : $"₹ {HttpUtility.HtmlEncode(request.AdmissionFee)}";
        var deposit = string.IsNullOrWhiteSpace(request.Deposit) ? "₹ 0" : $"₹ {HttpUtility.HtmlEncode(request.Deposit)}";
        var monthlyFee = string.IsNullOrWhiteSpace(request.MonthlyFee) ? "₹ 0" : $"₹ {HttpUtility.HtmlEncode(request.MonthlyFee)}";

        var guardianSectionHtml = string.Empty;
        if (!string.IsNullOrWhiteSpace(request.GuardianName))
        {
            var relationText = string.IsNullOrWhiteSpace(guardianRelation) ? "" : $" ({guardianRelation})";
            guardianSectionHtml = $@"
        <tr>
          <th style=""background-color: #fef3c7; color: #92400e;"">രക്ഷകർത്താവിന്റെ പേര്</th>
          <td><strong>{guardianName}</strong>{relationText}</td>
        </tr>";

            if (!string.IsNullOrWhiteSpace(guardianPhone))
            {
                guardianSectionHtml += $@"
        <tr>
          <th style=""background-color: #fef3c7; color: #92400e;"">രക്ഷകർത്താവിന്റെ ഫോൺ</th>
          <td>{guardianPhone}</td>
        </tr>";
            }
        }

        var logoImgTag = string.IsNullOrEmpty(logoBase64)
            ? ""
            : $@"<img src=""{logoBase64}"" class=""logo-img"" alt=""NPL Logo"" />";

        return $@"<!DOCTYPE html>
<html lang=""ml"">
<head>
  <meta charset=""UTF-8"">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;600;700;800&display=swap');
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Noto Sans Malayalam', sans-serif;
      background-color: #ffffff;
      color: #0f172a;
      padding: 24px 30px;
      line-height: 1.45;
      font-size: 12px;
    }}

    .header {{
      text-align: center;
      border-bottom: 2px solid #064e3b;
      padding-bottom: 10px;
      margin-bottom: 12px;
    }}

    .logo-img {{
      width: 64px;
      height: 64px;
      object-fit: contain;
      margin-bottom: 4px;
    }}

    .header h1 {{
      color: #064e3b;
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 2px;
    }}

    .header h2 {{
      color: #1e293b;
      font-size: 14px;
      font-weight: 700;
    }}

    .meta-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }}

    .meta-table td {{
      padding: 4px 6px;
      font-size: 11px;
    }}

    .ref-box {{
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 4px 10px;
      font-weight: bold;
      color: #064e3b;
      font-size: 13px;
      border-radius: 4px;
    }}

    .section-title {{
      font-size: 12px;
      font-weight: 800;
      color: #064e3b;
      margin-bottom: 6px;
      margin-top: 10px;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
    }}

    .details-table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
    }}

    .details-table th, .details-table td {{
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      font-size: 11px;
      vertical-align: middle;
    }}

    .details-table th {{
      background-color: #f8fafc;
      color: #334155;
      font-weight: 700;
      width: 40%;
      text-align: left;
    }}

    .details-table td {{
      color: #0f172a;
      font-weight: 600;
    }}

    .declaration-box {{
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      margin-top: 8px;
      margin-bottom: 16px;
      font-size: 10.5px;
      color: #334155;
      line-height: 1.5;
    }}

    .signature-grid {{
      display: table;
      width: 100%;
      margin-top: 20px;
    }}

    .signature-col {{
      display: table-cell;
      width: 50%;
      text-align: center;
      font-size: 11px;
      font-weight: bold;
      color: #334155;
    }}

    .sig-line {{
      border-top: 1px dashed #94a3b8;
      width: 70%;
      margin: 25px auto 5px auto;
    }}

    .footer-note {{
      text-align: center;
      font-size: 9.5px;
      color: #64748b;
      margin-top: 16px;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
    }}
  </style>
</head>
<body>
  
  <!-- Header with Official Logo -->
  <div class=""header"">
    {logoImgTag}
    <h1>നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി</h1>
    <h2>അംഗത്വ അപേക്ഷാ ഫോം</h2>
  </div>

  <!-- Application Info Bar -->
  <table class=""meta-table"">
    <tr>
      <td style=""width: 55%;"">
        <strong>അപേക്ഷാ നമ്പർ:</strong> <span class=""ref-box"">{refId}</span>
      </td>
      <td style=""text-align: right; width: 45%;"">
        <strong>തീയതി:</strong> {submittedAt}
      </td>
    </tr>
  </table>

  <!-- 1. അപേക്ഷകന്റെ വിവരങ്ങൾ -->
  <div class=""section-title"">അപേക്ഷകന്റെ വിവരങ്ങൾ</div>
  <table class=""details-table"">
    <tr>
      <th>1. പേര്</th>
      <td>{name}</td>
    </tr>
    <tr>
      <th>2. മൊബൈൽ നമ്പർ</th>
      <td>{mobile}</td>
    </tr>
    <tr>
      <th>3. ലിംഗം</th>
      <td>{gender}</td>
    </tr>
    <tr>
      <th>4. പൂർണ്ണ വിലാസം</th>
      <td>{address}</td>
    </tr>
    <tr>
      <th>5. പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി</th>
      <td>{panchayat}</td>
    </tr>
    <tr>
      <th>6. വാർഡ്</th>
      <td>{ward}</td>
    </tr>
    <tr>
      <th>7. പിൻകോഡ്</th>
      <td>{pincode}</td>
    </tr>
    <tr>
      <th>8. ഇ-മെയിൽ</th>
      <td>{email}</td>
    </tr>
    <tr>
      <th>9. അംഗത്വ വിഭാഗം</th>
      <td><strong>{category}</strong></td>
    </tr>
    {guardianSectionHtml}
  </table>

  <!-- 2. അപേക്ഷയോടൊപ്പം അടച്ച തുക (3 Payment Fields) -->
  <div class=""section-title"">അപേക്ഷയോടൊപ്പം അടച്ച തുക</div>
  <table class=""details-table"">
    <tr>
      <th>അംഗത്വ ഫീസ്</th>
      <td>{admissionFee}</td>
    </tr>
    <tr>
      <th>ജാമ്യ നിക്ഷേപം</th>
      <td>{deposit}</td>
    </tr>
    <tr>
      <th>മാസവരി</th>
      <td>{monthlyFee}</td>
    </tr>
  </table>

  <!-- Declaration -->
  <div class=""declaration-box"">
    <strong>പ്രഖ്യാപനം:</strong> ഞാൻ നൽകിയിരിക്കുന്ന വിവരങ്ങൾ ശരിയാണെന്ന് ഇതിനാൽ സാക്ഷ്യപ്പെടുത്തുന്നു. നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയുടെ നിയമങ്ങളും ചട്ടങ്ങളും പാലിച്ചുകൊള്ളാമെന്ന് പൂർണ്ണമായി സമ്മതിക്കുന്നു.
  </div>

  <!-- Signatures -->
  <div class=""signature-grid"">
    <div class=""signature-col"">
      <div class=""sig-line""></div>
      <div>അപേക്ഷകന്റെ / രക്ഷിതാവിന്റെ ഒപ്പ്</div>
    </div>
    <div class=""signature-col"">
      <div class=""sig-line""></div>
      <div>ലൈബ്രേറിയൻ / അധികൃതരുടെ ഒപ്പ്</div>
    </div>
  </div>

  <!-- Footer -->
  <div class=""footer-note"">
    നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി, ഇടുക്കി, കേരളം — ഔദ്യോഗിക അംഗത്വ അപേക്ഷാ രേഖ
  </div>

</body>
</html>";
    }
}
