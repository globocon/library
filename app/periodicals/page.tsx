import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Newspaper, BookOpen, Layers } from 'lucide-react';

export default function PeriodicalsPage() {
  const sections = [
    { title: "മലയാളം ദിനപത്രങ്ങൾ", icon: Newspaper, desc: "പ്രധാന മലയാളം ദിനപത്രങ്ങൾ ദിവസേന ലഭ്യമാണ്." },
    { title: "ഇംഗ്ലീഷ് ദിനപത്രങ്ങൾ", icon: Newspaper, desc: "ദേശീയ ഇംഗ്ലീഷ് ദിനപത്രങ്ങൾ വായിക്കാം." },
    { title: "വാരികകൾ", icon: BookOpen, desc: "വാരാന്ത്യ സാംസ്കാരിക-സാഹിത്യ വാരികകൾ." },
    { title: "മാസികകൾ", icon: Layers, desc: "വിദ്യാഭ്യാസ, സാഹിത്യ, ശാസ്ത്ര, പൊതുവിജ്ഞാന മാസികകൾ." },
    { title: "പ്രത്യേക പ്രസിദ്ധീകരണങ്ങൾ", icon: BookOpen, desc: "മത്സരപ്പരീക്ഷാ ഗൈഡുകളും പ്രത്യേക പത്രികകളും." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">പത്രങ്ങളും ആനുകാലിക പ്രസിദ്ധീകരണങ്ങളും</h1>
        <p className="text-xs text-slate-600">
          പ്രതിദിന പത്രങ്ങളും വിവിധ ആനുകാലിക പ്രസിദ്ധീകരണങ്ങളും വായനക്കാർക്ക് ലഭ്യമാക്കുക എന്നത് ഗ്രന്ഥശാലയുടെ പ്രധാന സേവനങ്ങളിൽ ഒന്നാണ്.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="custom-card p-5 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#0d5c46] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">{sec.title}</h3>
              </div>
              <p className="text-xs text-slate-600 pl-12">{sec.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-100 p-4 rounded-lg text-center text-xs text-slate-600">
        ലഭ്യമായ പ്രസിദ്ധീകരണങ്ങളുടെ പട്ടിക ലൈബ്രറി അധികൃതർക്ക് ആവശ്യാനുസരണം അപ്ഡേറ്റ് ചെയ്യാം.
      </div>
    </div>
  );
}
