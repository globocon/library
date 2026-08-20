import { Shield, Check } from 'lucide-react';

export default function RulesPage() {
  const rules = [
    "ലൈബ്രറി അംഗത്വ കാർഡ് അംഗം തന്നെ ഉപയോഗിക്കണം.",
    "പുസ്തകങ്ങൾ ശ്രദ്ധയോടെ കൈകാര്യം ചെയ്യണം.",
    "നിശ്ചിത തീയതിക്ക് മുമ്പ് പുസ്തകങ്ങൾ തിരികെ നൽകണം.",
    "പുസ്തകത്തിന്റെ പേജുകൾ കീറുകയോ എഴുതുകയോ ചെയ്യരുത്.",
    "പുസ്തകം നഷ്ടപ്പെട്ടാൽ ലൈബ്രറി നിയമപ്രകാരം നഷ്ടപരിഹാരം നൽകണം.",
    "വായനാമുറിയിൽ ശാന്തത പാലിക്കണം.",
    "ലൈബ്രറി ജീവനക്കാരുടെ നിർദ്ദേശങ്ങൾ പാലിക്കണം.",
    "അംഗത്വവുമായി ബന്ധപ്പെട്ട വിവരങ്ങൾ പുതുക്കി നൽകണം.",
    "ലൈബ്രറി കമ്മിറ്റി കാലാകാലങ്ങളിൽ മാറ്റുന്ന നിയമങ്ങൾ അംഗങ്ങൾ പാലിക്കണം."
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ലൈബ്രറി നിയമങ്ങൾ</h1>
        <p className="text-xs text-slate-600">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയുടെ സുഗമമായ പ്രവർത്തനത്തിന് അംഗങ്ങൾ പാലിക്കേണ്ട നിയമങ്ങൾ</p>
      </div>

      <div className="custom-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-3">
          <Shield className="w-5 h-5" />
          <span>പ്രധാന ചട്ടങ്ങൾ & നിയമങ്ങൾ</span>
        </div>

        <div className="space-y-3">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0d5c46] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
