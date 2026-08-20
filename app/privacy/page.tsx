import { Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">സ്വകാര്യതാ നയം</h1>
        <p className="text-xs text-slate-600">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി — സ്വകാര്യതാ വിവരങ്ങൾ</p>
      </div>

      <div className="custom-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-3">
          <Lock className="w-5 h-5" />
          <span>വ്യക്തിഗത വിവര സുരക്ഷാ ഉറപ്പ്</span>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">1. വിവര ശേഖരണം & ഉപയോഗം</h3>
            <p>
              അംഗത്വത്തിനായി ശേഖരിക്കുന്ന വ്യക്തിഗത വിവരങ്ങൾ ലൈബ്രറി സേവനങ്ങൾ നൽകുന്നതിനും അംഗത്വം നിയന്ത്രിക്കുന്നതിനും മാത്രം ഉപയോഗിക്കും.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">2. വിവര പങ്കിടൽ തടയൽ</h3>
            <p>
              അംഗങ്ങളുടെ വ്യക്തിഗത വിവരങ്ങൾ അനാവശ്യമായി മൂന്നാം കക്ഷികളുമായി പങ്കിടില്ല.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <h3 className="font-bold text-slate-900">3. സാങ്കേതിക സുരക്ഷാ നടപടികൾ</h3>
            <p>
              വെബ്‌സൈറ്റിൽ ശേഖരിക്കുന്ന വിവരങ്ങളുടെ സുരക്ഷ ഉറപ്പാക്കാൻ ആവശ്യമായ സാങ്കേതിക നടപടികൾ സ്വീകരിക്കും.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
