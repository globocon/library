import { Bell, Tag } from 'lucide-react';

export default function NewsPage() {
  const newsList = [
    { title: "അംഗത്വ രജിസ്ട്രേഷൻ ആരംഭിച്ചു", tag: "അറിയിപ്പ്" },
    { title: "പുതിയ പുസ്തകങ്ങൾ ലഭ്യമായി", tag: "ശേഖരം" },
    { title: "പുസ്തകമേള", tag: "പരിപാടി" },
    { title: "വായനാമത്സരം", tag: "മത്സരം" },
    { title: "ലൈബ്രറി അവധി", tag: "പ്രത്യേകം" },
    { title: "പ്രത്യേക പരിപാടി", tag: "അറിയിപ്പ്" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">വാർത്തകളും അറിയിപ്പുകളും</h1>
        <p className="text-xs text-slate-600">ലൈബ്രറിയിലെ ഏറ്റവും പുതിയ അറിയിപ്പുകൾ ഇവിടെ കാണാം.</p>
      </div>

      <div className="space-y-3">
        {newsList.map((n, idx) => (
          <div key={idx} className="custom-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs sm:text-sm text-slate-800">{n.title}</span>
            </div>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded">
              {n.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
