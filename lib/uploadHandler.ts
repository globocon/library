import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const MAX_SIZE_MB = parseInt(process.env.MAX_UPLOAD_SIZE_MB || '5', 10);
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];

export interface ProcessedUpload {
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  tempPath: string;
  base64Data?: string;
}

export async function processSecureUpload(file: File): Promise<{ success: boolean; data?: ProcessedUpload; error?: string }> {
  try {
    if (!file || file.size === 0) {
      return { success: false, error: "ഫയൽ നൽകിയിട്ടില്ല." };
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      return { success: false, error: `ഫയൽ വലുപ്പം ${MAX_SIZE_MB}MB-ൽ കൂടാൻ പാടില്ല.` };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return { success: false, error: "അനുവദനീയമായ ഫയൽ ഫോർമാറ്റുകൾ: JPEG, PNG, PDF മാത്രം." };
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return { success: false, error: "അസാധുവായ ഫയൽ എക്സ്റ്റൻഷൻ." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = path.join(process.cwd(), 'tmp', 'uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const safeFileName = `${crypto.randomUUID()}${ext}`;
    const tempPath = path.join(tempDir, safeFileName);
    fs.writeFileSync(tempPath, buffer);

    const base64Data = buffer.toString('base64');

    return {
      success: true,
      data: {
        originalName: path.basename(file.name),
        mimeType: file.type,
        sizeBytes: file.size,
        tempPath,
        base64Data
      }
    };
  } catch (err) {
    return { success: false, error: "ഫയൽ അപ്‌ലോഡ് ചെയ്യുന്നതിൽ പിശക് സംഭവിച്ചു." };
  }
}

export function safeDeleteTempFile(filePath?: string) {
  if (filePath && fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch {
      // Ignore cleanup error
    }
  }
}
