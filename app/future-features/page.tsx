import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Sparkles, QrCode, CreditCard, Lock, Smartphone, Bell, LayoutDashboard } from 'lucide-react';

export default function FutureFeaturesPage() {
  const features = [
    {
      title: "Member Login & Account Dashboard",
      desc: "ഓരോ അംഗത്തിനും സ്വന്തം അക്കൗണ്ടിൽ പ്രവേശിച്ച് കൈവശമുള്ള പുസ്തകങ്ങളും റിട്ടേൺ തീയതികളും പരിശോധിക്കാനുള്ള സൗകര്യം.",
      icon: Lock
    },
    {
      title: "Digital Membership Card",
      desc: "മൊബൈലിൽ തന്നെ ഡിജിറ്റൽ അംഗത്വ കാർഡ് ലഭ്യമാക്കുന്ന സംവിധാനം.",
      icon: Smartphone
    },
    {
      title: "QR Code Integration",
      desc: "അംഗത്വ കാർഡിലും പുസ്തകങ്ങളിലും QR കോഡ് സ്കാനിംഗ് സൗകര്യം.",
      icon: QrCode
    },
    {
      title: "Online Book Reservation",
      desc: "വീട്ടിൽ ഇരുന്ന് തന്നെ ആവശ്യമായ പുസ്തകം മുൻകൂട്ടി Reserve ചെയ്യാനുള്ള സൗകര്യം.",
      icon: Sparkles
    },
    {
      title: "SMS / WhatsApp Alerts",
      desc: "പുസ്തകം ലഭിക്കുമ്പോഴും റിട്ടേൺ തീയതി അടുത്തുവരുമ്പോഴും ലഭിക്കുന്ന ഓട്ടോമാറ്റിക് അറിയിപ്പുകൾ.",
      icon: Bell
    },
    {
      title: "Online Payment Gateway",
      desc: "അംഗത്വ ഫീസും പുതുക്കൽ തുകയും ഓൺലൈനായി അടയ്ക്കാനുള്ള സൗകര്യം.",
      icon: CreditCard
    },
    {
      title: "Admin Dashboard",
      desc: "ലൈബ്രറി ജീവനക്കാർക്ക് അംഗങ്ങൾ, സർക്കുലേഷൻ, ഫൈൻ, റിപ്പോർട്ടുകൾ എന്നിവ കൈകാര്യം ചെയ്യാനുള്ള പൂർണ്ണ അഡ്മിൻ പാനൽ.",
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Header Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-amber-950">
          ഭാവിയിൽ ചേർക്കാവുന്ന സൗകര്യങ്ങൾ
        </h1>
        <p className="text-xs text-slate-700 max-w-2xl mx-auto leading-relaxed">
          {LIBRARY_CONFIG.name} കൂടുതൽ ആധുനികവൽക്കരിക്കുന്നതിന്റെ ഭാഗമായി ഭാവി ഘട്ടങ്ങളിൽ ഉൾപ്പെടുത്താൻ ഉദ്ദേശിക്കുന്ന ഡിജിറ്റൽ സൗകര്യങ്ങളുടെ വിവരം താഴെ നൽകുന്നു.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="custom-card p-5 space-y-2 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{f.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {f.desc}
              </p>
              <div className="pt-1">
                <span className="inline-block text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  ഭാവി പദ്ധതിയധിഷ്ഠിതം (Upcoming Scope)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
