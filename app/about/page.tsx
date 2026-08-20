import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Target, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  const goals = [
    "വായനാശീലം വളർത്തുക",
    "വിദ്യാർത്ഥികൾക്ക് പഠനസഹായം നൽകുക",
    "കുടുംബവായന പ്രോത്സാഹിപ്പിക്കുക",
    "കുട്ടികളിൽ പുസ്തകങ്ങളോടുള്ള താൽപര്യം വളർത്തുക",
    "ഡിജിറ്റൽ അറിവിലേക്കുള്ള പ്രവേശനം നൽകുക",
    "പത്രങ്ങളും ആനുകാലിക പ്രസിദ്ധീകരണങ്ങളും ലഭ്യമാക്കുക",
    "ചർച്ചകളും സാഹിത്യപരിപാടികളും സംഘടിപ്പിക്കുക",
    "പ്രാദേശിക കലാ-സാംസ്കാരിക പ്രവർത്തനങ്ങൾക്ക് വേദിയൊരുക്കുക",
    "സമൂഹത്തിലെ എല്ലാവർക്കും അറിവിന്റെ അവസരം ഒരുക്കുക"
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ഞങ്ങളെക്കുറിച്ച്</h1>
        <p className="text-xs text-slate-600 font-medium">{LIBRARY_CONFIG.name} — അറിവിന്റെ കേന്ദ്രം</p>
      </div>

      {/* Intro Box */}
      <div className="custom-card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-[#0d5c46]">
          നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയിലേക്ക് സ്വാഗതം
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          നെടുങ്കണ്ടം പ്രദേശത്തെ വായനക്കാരെയും വിദ്യാർത്ഥികളെയും കുടുംബങ്ങളെയും ഒരുമിപ്പിക്കുന്ന ഒരു അറിവിന്റെ കേന്ദ്രമാണ് നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി. പുസ്തകങ്ങൾ വായിക്കാനും വീട്ടിലേക്ക് കൊണ്ടുപോകാനും മാത്രമല്ല, പഠിക്കാനും ചർച്ച ചെയ്യാനും പുതിയ ആശയങ്ങൾ പങ്കുവയ്ക്കാനും സമൂഹവുമായി ബന്ധപ്പെടാനും കഴിയുന്ന ഒരു സൗഹൃദ ഇടമായി ഗ്രന്ഥശാലയെ വികസിപ്പിക്കുകയാണ് ഞങ്ങളുടെ ലക്ഷ്യം.
        </p>
      </div>

      {/* 9 Specific Goals from PDF */}
      <div className="custom-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Target className="w-6 h-6 text-[#0d5c46]" />
          <h2 className="text-lg font-bold text-slate-900">ഞങ്ങളുടെ ലക്ഷ്യങ്ങൾ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800 leading-relaxed">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Role Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
        <HeartHandshake className="w-8 h-8 text-[#0d5c46] mx-auto" />
        <h3 className="text-base font-bold text-[#0d5c46]">സമൂഹത്തോടൊപ്പം അറിവിലേക്ക്</h3>
        <p className="text-xs text-slate-700 max-w-2xl mx-auto">
          നാടിന്റെ സാംസ്കാരികവും വിദ്യാഭ്യാസപരവുമായ വളർച്ചയ്ക്ക് സഹായിക്കുക എന്ന ലക്ഷ്യത്തോടെ പ്രവർത്തിക്കുന്ന ഒരു ജനകീയ ഗ്രന്ഥശാലയാണ് ഇത്.
        </p>
      </div>
    </div>
  );
}
