import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Users, Landmark } from 'lucide-react';

export default function CommitteePage() {
  const basicInfo = [
    { label: "ലൈബ്രറിയുടെ പേര്", value: LIBRARY_CONFIG.name },
    { label: "സ്ഥാപിതമായ വർഷം", value: LIBRARY_CONFIG.establishedYear },
    { label: "രജിസ്ട്രേഷൻ നമ്പർ", value: LIBRARY_CONFIG.registrationNo },
    { label: "ലൈബ്രറി കൗൺസിൽ", value: LIBRARY_CONFIG.libraryCouncilNo },
    { label: "ജില്ല", value: LIBRARY_CONFIG.district },
    { label: "താലൂക്ക്", value: LIBRARY_CONFIG.taluk },
    { label: "പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി", value: LIBRARY_CONFIG.panchayat },
    { label: "പുസ്തകങ്ങളുടെ എണ്ണം", value: LIBRARY_CONFIG.bookCount },
    { label: "അംഗങ്ങളുടെ എണ്ണം", value: LIBRARY_CONFIG.memberCount },
    { label: "പ്രവർത്തന സമയം", value: LIBRARY_CONFIG.openingHours.weekday },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ലൈബ്രറി കമ്മിറ്റി & വിവരങ്ങൾ</h1>
        <p className="text-xs text-slate-600">{LIBRARY_CONFIG.name} — ഭരണസമിതിയും അടിസ്ഥാന വിവരങ്ങളും</p>
      </div>

      {/* Executive Committee Table */}
      <div className="custom-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-3">
          <Users className="w-5 h-5" />
          <span>ഭരണസമിതി (Executive Committee)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-200 text-slate-800">
                <th className="p-3 border border-slate-200">ചുമതല</th>
                <th className="p-3 border border-slate-200">പേര്</th>
              </tr>
            </thead>
            <tbody>
              {LIBRARY_CONFIG.committeeRoles.map((role, idx) => (
                <tr key={idx} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-3 font-semibold text-slate-800 border border-slate-200">{role.title}</td>
                  <td className="p-3 border border-slate-200">{role.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Basic Library Facts Table */}
      <div className="custom-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-3">
          <Landmark className="w-5 h-5" />
          <span>അടിസ്ഥാന വിവരങ്ങൾ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-200 text-slate-800">
                <th className="p-3 border border-slate-200">വിവരങ്ങൾ</th>
                <th className="p-3 border border-slate-200">വിശദാംശം</th>
              </tr>
            </thead>
            <tbody>
              {basicInfo.map((info, idx) => (
                <tr key={idx} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-3 font-semibold text-slate-800 border border-slate-200">{info.label}</td>
                  <td className="p-3 border border-slate-200">{info.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
