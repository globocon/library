import { Calendar, Clock, MapPin } from 'lucide-react';

export default function EventsPage() {
  const categories = [
    "സാഹിത്യ സംഗമം", "പുസ്തക പ്രകാശനം", "പ്രഭാഷണം", 
    "സാംസ്കാരിക പരിപാടികൾ", "കുട്ടികളുടെ പരിപാടികൾ", 
    "വിദ്യാഭ്യാസ സെമിനാർ", "മത്സരങ്ങൾ", "പരിസ്ഥിതി പരിപാടികൾ", 
    "ദേശീയ ദിന പരിപാടികൾ"
  ];

  const calendarEvents = [
    { date: "//2026", event: "വായനാദിനം", time: ":", location: "ലൈബ്രറി ഹാൾ" },
    { date: "//2026", event: "സാഹിത്യ ചർച്ച", time: ":", location: "വായനാമുറി" },
    { date: "//2026", event: "കുട്ടികളുടെ പരിപാടി", time: ":", location: "ലൈബ്രറി" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">പരിപാടികൾ</h1>
        <p className="text-xs text-slate-600">ഗ്രന്ഥശാലയിൽ സംഘടിപ്പിക്കുന്ന എല്ലാ പരിപാടികളും ഇവിടെ പ്രസിദ്ധീകരിക്കുന്നു.</p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">പരിപാടികളുടെ വിഭാഗങ്ങൾ</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <span key={idx} className="bg-[#0d5c46] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Event Calendar Table from PDF */}
      <div className="custom-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-[#0d5c46]">
          <Calendar className="w-5 h-5" />
          <span>പരിപാടി കലണ്ടർ</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-200">
                <th className="p-3 border border-slate-200">തീയതി</th>
                <th className="p-3 border border-slate-200">പരിപാടി</th>
                <th className="p-3 border border-slate-200">സമയം</th>
                <th className="p-3 border border-slate-200">സ്ഥലം</th>
              </tr>
            </thead>
            <tbody>
              {calendarEvents.map((ev, idx) => (
                <tr key={idx} className="hover:bg-slate-50 border-b border-slate-200">
                  <td className="p-3 font-mono border border-slate-200">{ev.date}</td>
                  <td className="p-3 font-semibold text-slate-800 border border-slate-200">{ev.event}</td>
                  <td className="p-3 border border-slate-200">{ev.time}</td>
                  <td className="p-3 border border-slate-200">{ev.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
