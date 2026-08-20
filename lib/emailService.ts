import nodemailer from 'nodemailer';

export interface EmailOptions {
  referenceId: string;
  formType: string;
  applicantName?: string;
  submittedAt: string;
  pdfBuffer: Buffer;
  pdfFileName: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendApplicationEmail(options: EmailOptions): Promise<EmailResult> {
  // Sender credentials from environment variables
  const gmailUser = (process.env.GMAIL_USER || process.env.SMTP_USERNAME || '').trim();
  const gmailAppPassword = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD || '').trim().replace(/\s+/g, '');
  const senderEmail = gmailUser || 'nedumkandomlibrary@gmail.com';
  const senderName = 'നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി';

  // Three designated receiver accounts
  const recipient1 = (process.env.LIBRARY_EMAIL_1 || 'vineethsocialm@gmail.com').trim();
  const recipient2 = (process.env.LIBRARY_EMAIL_2 || 'tomluckose.apn16@gmail.com').trim();
  const recipient3 = (process.env.LIBRARY_EMAIL_3 || 'jino@globoconsofware.com').trim();

  const recipients = [recipient1, recipient2, recipient3].filter(Boolean);

  // Defensive validation: Ensure required sender & receiver configurations exist
  if (!gmailUser) {
    const errorMsg = 'Email configuration error: GMAIL_USER is not defined in environment variables.';
    console.error(`[EMAIL CONFIG ERROR] Ref: ${options.referenceId} | ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  if (!gmailAppPassword) {
    const errorMsg = 'Email configuration error: GMAIL_APP_PASSWORD is not defined in environment variables.';
    console.error(`[EMAIL CONFIG ERROR] Ref: ${options.referenceId} | ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  if (recipients.length === 0) {
    const errorMsg = 'Email configuration error: No recipient email addresses configured.';
    console.error(`[EMAIL CONFIG ERROR] Ref: ${options.referenceId} | ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  // Operational log (NO sensitive credentials logged)
  console.log(`[EMAIL INITIATED] Ref: ${options.referenceId} | From: ${senderEmail} | Recipients: ${recipients.join(', ')} | Timestamp: ${options.submittedAt}`);

  // Create Nodemailer transport with official Gmail service
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const subject = `അംഗത്വ അപേക്ഷ: ${options.applicantName || 'അപേക്ഷകൻ'} - [${options.referenceId}]`;
  const textBody = `നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി - പുതിയ ${options.formType}\n\nറഫറൻസ് നമ്പർ: ${options.referenceId}\nഅപേക്ഷകന്റെ പേര്: ${options.applicantName || '—'}\nസമർപ്പിച്ച തീയതി: ${options.submittedAt}\n\nഅപേക്ഷയുടെ ഔദ്യോഗിക PDF കോപ്പി ഈ ഇമെയിലിൽ അറ്റാച്ച് ചെയ്തിട്ടുണ്ട്.\n\nഈ സന്ദേശം നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി ഔദ്യോഗിക വെബ്സൈറ്റ് വഴി അയച്ചതാണ്.`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #064e3b; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #064e3b; margin: 0; font-size: 20px;">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി</h2>
        <p style="font-size: 14px; color: #475569; margin: 4px 0 0 0;">ഔദ്യോഗിക അംഗത്വ അപേക്ഷാ സന്ദേശം</p>
      </div>

      <p style="font-size: 15px; margin-bottom: 12px;"><strong>പുതിയ അംഗത്വ അപേക്ഷ വിജയകരമായി ലഭിച്ചിട്ടുണ്ട്:</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%; color: #334155;">അപേക്ഷാ നമ്പർ:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #064e3b;">${options.referenceId}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">അപേക്ഷയുടെ തരം:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${options.formType}</td>
        </tr>
        ${options.applicantName ? `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">അപേക്ഷകന്റെ പേര്:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${options.applicantName}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #334155;">സമർപ്പിച്ച തീയതി:</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${options.submittedAt}</td>
        </tr>
      </table>

      <p style="font-size: 13px; color: #334155;">അപേക്ഷയുടെ ഔദ്യോഗിക A4 PDF കോപ്പി ഈ ഇമെയിലിൽ അറ്റാച്ച് ചെയ്തിട്ടുണ്ട്.</p>
      
      <div style="border-top: 1px solid #e2e8f0; margin-top: 20px; padding-top: 12px; text-align: center;">
        <p style="font-size: 11px; color: #94a3b8; margin: 0;">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി, ഇടുക്കി, കേരളം — ഔദ്യോഗിക വെബ് പോർട്ടൽ</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      replyTo: senderEmail,
      to: recipients.join(', '),
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Mailer': 'Nedumkandom-Public-Library-Portal',
        'X-Entity-Ref-ID': options.referenceId,
      },
      attachments: [
        {
          filename: options.pdfFileName,
          content: options.pdfBuffer,
          contentType: 'application/pdf',
          contentDisposition: 'attachment',
        },
      ],
    });

    console.log(`[EMAIL SUCCESS] Ref: ${options.referenceId} | MessageID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    const errorMessage = err?.message || 'SMTP transmission error';
    console.error(`[EMAIL FAILURE] Ref: ${options.referenceId} | Status: Failed | Error: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}
