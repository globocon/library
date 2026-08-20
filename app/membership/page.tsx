import Link from 'next/link';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Users, UserPlus, CheckCircle2, Info, ArrowRight } from 'lucide-react';

export default function MembershipPage() {
  const eligibleCategories = [
    "കുട്ടികൾ", "വിദ്യാർത്ഥികൾ", "യുവാക്കൾ", "മുതിർന്നവർ", 
    "അധ്യാപകർ", "സർക്കാർ / സ്വകാര്യ ജീവനക്കാർ", "വിരമിച്ചവർ", 
    "വീട്ടമ്മമാർ", "മുതിർന്ന പൗരന്മാർ", "പുസ്തകവായനയിൽ താല്പര്യമുള്ള എല്ലാവരും"
  ];

  const processSteps = [
    { step: 1, title: "അപേക്ഷ സമർപ്പിക്കുക", desc: "ഓൺലൈനായി ലളിതമായി അപേക്ഷ പൂരിപ്പിച്ച് സമർപ്പിക്കുക." },
    { step: 2, title: "ലൈബ്രറി അധികൃതർ പരിശോധിക്കും", desc: "നൽകിയ രേഖകളും വിവരങ്ങളും പരിശോധിക്കും." },
    { step: 3, title: "അംഗത്വം അംഗീകരിക്കും", desc: "ഗ്രന്ഥശാല ഭരണസമിതി അംഗത്വം അംഗീകരിക്കും." },
    { step: 4, title: "ഫീസ് അടയ്ക്കുക", desc: "നിശ്ചിത പ്രവേശന ഫീസും ഡെപ്പോസിറ്റും അടയ്ക്കുക." },
    { step: 5, title: "Membership ID ലഭിക്കും", desc: "അംഗത്വ നമ്പറും ഐഡി കാർഡും കൈപ്പറ്റാം." },
    { step: 6, title: "പുസ്തകങ്ങൾ എടുക്കാം", desc: "പുസ്തകങ്ങൾ സ്വീകരിച്ച് വായന ആരംഭിക്കാം." },
  ];

  const feeRows = [
    { category: "കുട്ടികൾ", admission: "—", deposit: "—", books: "—" },
    { category: "വിദ്യാർത്ഥികൾ", admission: "—", deposit: "—", books: "—" },
    { category: "പൊതുഅംഗത്വം", admission: "—", deposit: "—", books: "—" },
    { category: "കുടുംബ അംഗത്വം", admission: "—", deposit: "—", books: "—" },
    { category: "മുതിർന്ന പൗരന്മാർ", admission: "—", deposit: "—", books: "—" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      {/* Title with Prominent CTA */}
      <div className="text-center space-y-4 border-b border-slate-200 pb-8">
        <h1 className="text-3xl font-bold text-slate-900">ഗ്രന്ഥശാലയിലെ അംഗത്വം</h1>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയിലെ അംഗത്വം എല്ലാവർക്കും ലഭ്യമാക്കുക എന്നതാണ് ലക്ഷ്യം.
        </p>

        {/* Primary CTA */}
        <div className="pt-2">
          <Link
            href="/membership-apply"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5 text-slate-950" />
            <span>അംഗത്വത്തിന് അപേക്ഷിക്കുക</span>
          </Link>
        </div>
      </div>

      {/* Eligible Categories */}
      <div className="custom-card p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Users className="w-5 h-5 text-[#0d5c46]" />
          <h2 className="text-base font-bold text-slate-900">അംഗത്വത്തിന് അർഹരായവർ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {eligibleCategories.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-800">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 6-Step Process Flowchart */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
          അംഗത്വ നടപടിക്രമം
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processSteps.map((s) => (
            <div key={s.step} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs relative border-l-4 border-l-[#0d5c46] space-y-1">
              <div className="text-xs font-bold text-[#0d5c46] uppercase tracking-wider">
                Step {s.step}
              </div>
              <div className="font-bold text-sm text-slate-900">{s.title}</div>
              <div className="text-xs text-slate-600 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Table */}
      <div className="custom-card p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
          അംഗത്വ ഫീസ് വിവരങ്ങൾ
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3 border border-slate-200">അംഗത്വം</th>
                <th className="p-3 border border-slate-200">പ്രവേശന ഫീസ്</th>
                <th className="p-3 border border-slate-200">ഡെപ്പോസിറ്റ്</th>
                <th className="p-3 border border-slate-200">ഒരേസമയം എടുക്കാവുന്ന പുസ്തകങ്ങൾ</th>
              </tr>
            </thead>
            <tbody>
              {feeRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-3 font-semibold text-slate-800 border border-slate-200">{row.category}</td>
                  <td className="p-3 border border-slate-200">₹ {row.admission}</td>
                  <td className="p-3 border border-slate-200">₹ {row.deposit}</td>
                  <td className="p-3 border border-slate-200">{row.books}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{LIBRARY_CONFIG.feesNote}</span>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
        <h3 className="text-lg font-bold text-[#0d5c46]">
          ഇന്ന് തന്നെ ഗ്രന്ഥശാലയിൽ അംഗമാകൂ!
        </h3>
        <p className="text-xs text-slate-700 max-w-lg mx-auto">
          ഓൺലൈൻ അപേക്ഷ സമർപ്പിച്ച ശേഷം ലൈബ്രറി അധികൃതർ പരിശോധന പൂർത്തിയാക്കി നിങ്ങളെ അറിയിക്കും.
        </p>
        <Link
          href="/membership-apply"
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2.5 px-6 rounded-lg inline-flex items-center gap-2 shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>അംഗത്വത്തിന് അപേക്ഷിക്കുക</span>
        </Link>
      </div>
    </div>
  );
}
