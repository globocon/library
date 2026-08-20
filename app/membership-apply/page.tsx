import MembershipWizard from '@/components/MembershipWizard';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';

export default function MembershipApplyPage() {
  return (
    <div className="py-8 px-4 space-y-6">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          ഓൺലൈൻ അംഗത്വ അപേക്ഷ
        </h1>
        <p className="text-xs text-slate-600">
          {LIBRARY_CONFIG.name} — അംഗത്വ അപേക്ഷാ ഫോം. എല്ലാ വിവരങ്ങളും ശരിയായി പൂരിപ്പിച്ച് സമർപ്പിക്കുക.
        </p>
      </div>

      <MembershipWizard />
    </div>
  );
}
