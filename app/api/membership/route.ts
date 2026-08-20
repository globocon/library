import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { generateApplicationPdf } from '@/lib/pdfService';
import { sendApplicationEmail } from '@/lib/emailService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract 9 main fields
    const name = formData.get('name')?.toString().trim();
    const mobile = formData.get('mobile')?.toString().trim();
    const gender = formData.get('gender')?.toString().trim() || 'പുരുഷൻ';
    const address = formData.get('address')?.toString().trim();
    const panchayat = formData.get('panchayat')?.toString().trim();
    const ward = formData.get('ward')?.toString().trim();
    const pincode = formData.get('pincode')?.toString().trim() || '—';
    const email = formData.get('email')?.toString().trim() || '—';
    const category = formData.get('category')?.toString().trim() || 'പൊതുവിഭാഗം';

    // Guardian details for minor / child
    const guardianName = formData.get('guardianName')?.toString().trim() || '';
    const guardianRelation = formData.get('guardianRelation')?.toString().trim() || '';
    const guardianPhone = formData.get('guardianPhone')?.toString().trim() || '';

    // Extract manual 3 payment amounts (അപേക്ഷയോടൊപ്പം അടച്ച തുക)
    const admissionFee = formData.get('admissionFee')?.toString().trim() || '';
    const deposit = formData.get('deposit')?.toString().trim() || '';
    const monthlyFee = formData.get('monthlyFee')?.toString().trim() || '';

    // Required Field Validations in Malayalam
    if (!name) {
      return NextResponse.json({ success: false, error: 'ദയവായി പേര് നൽകുക' }, { status: 400 });
    }
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      return NextResponse.json({ success: false, error: 'സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക' }, { status: 400 });
    }
    if (!address) {
      return NextResponse.json({ success: false, error: 'പൂർണ്ണ വിലാസം നൽകുക' }, { status: 400 });
    }
    if (!panchayat) {
      return NextResponse.json({ success: false, error: 'പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി നൽകുക' }, { status: 400 });
    }
    if (!ward) {
      return NextResponse.json({ success: false, error: 'വാർഡ് നൽകുക' }, { status: 400 });
    }

    if (category === 'കുട്ടി' && !guardianName) {
      return NextResponse.json({ success: false, error: 'മൈനർ ആയതിനാൽ രക്ഷകർത്താവിന്റെ പേര് നൽകുക' }, { status: 400 });
    }

    // Generate Application Reference Number: NPL-2026-XXXX
    const randomCode = crypto.randomBytes(2).toString('hex').toUpperCase();
    const currentYear = new Date().getFullYear();
    const referenceId = `NPL-${currentYear}-${randomCode}`;
    const submittedAt = new Date().toLocaleString('ml-IN', { timeZone: 'Asia/Kolkata' });

    console.log(`[SUBMISSION] Ref: ${referenceId} | Name: ${name} | Category: ${category} | Guardian: ${guardianName || 'N/A'}`);

    // Generate Malayalam PDF with fields, guardian details & 3 fee amounts
    const pdfBuffer = await generateApplicationPdf({
      referenceId,
      submittedAt,
      name,
      mobile,
      gender,
      address,
      panchayat,
      ward,
      pincode,
      email,
      category,
      guardianName,
      guardianRelation,
      guardianPhone,
      admissionFee,
      deposit,
      monthlyFee
    });

    // Save permanent archive copy of the generated PDF
    try {
      const archiveDir = path.join(process.cwd(), 'applications');
      if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
      }
      fs.writeFileSync(path.join(archiveDir, `Application_${referenceId}.pdf`), pdfBuffer);
    } catch (saveErr) {
      console.error('Failed to save archive PDF copy:', saveErr);
    }

    // Send Email to 3 receiver accounts with PDF Attachment
    const emailResult = await sendApplicationEmail({
      referenceId,
      formType: 'അംഗത്വ അപേക്ഷ',
      applicantName: name,
      submittedAt,
      pdfBuffer,
      pdfFileName: `Application_${referenceId}.pdf`
    });

    return NextResponse.json({
      success: true,
      referenceId,
      submittedAt,
      emailSent: emailResult.success,
      message: 'അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു.'
    });

  } catch (err: any) {
    console.error(`[ERROR] Membership submission failed: ${err?.message || 'Unknown server error'}`);
    return NextResponse.json({ success: false, error: 'അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.' }, { status: 500 });
  }
}
