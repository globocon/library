import { Smile, Palette, Mic, HelpCircle, BookOpen, PenTool, Award } from 'lucide-react';

export default function ChildrenPage() {
  const categories = [
    "കുട്ടികളുടെ കഥാപുസ്തകങ്ങൾ",
    "ചിത്രകഥകൾ",
    "ബാലസാഹിത്യം",
    "വിജ്ഞാന പുസ്തകങ്ങൾ",
    "ശാസ്ത്ര പുസ്തകങ്ങൾ",
    "പ്രവർത്തന പുസ്തകങ്ങൾ",
    "കുട്ടികളുടെ വായനാ മത്സരങ്ങൾ"
  ];

  const activities = [
    { title: "ചിത്രരചന", icon: Palette },
    { title: "കഥപറച്ചിൽ", icon: Mic },
    { title: "വായനാ മത്സരം", icon: BookOpen },
    { title: "എഴുത്ത് മത്സരം", icon: PenTool },
    { title: "ക്വിസ് (Quiz)", icon: HelpCircle },
    { title: "നാടകം", icon: Award },
    { title: "പ്രസംഗ മത്സരം", icon: Mic },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 text-center space-y-2">
        <Smile className="w-10 h-10 text-pink-600 mx-auto" />
        <h1 className="text-3xl font-bold text-pink-950">കുട്ടികളുടെ വായനാകേന്ദ്രം</h1>
        <p className="text-xs text-pink-800">
          കുട്ടികളിൽ ചെറുപ്പം മുതൽ വായനാശീലം വളർത്തുന്നതിനായി പ്രത്യേക വായനാലോകം.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
          ബാലസാഹിത്യ ശേഖരങ്ങൾ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat, idx) => (
            <div key={idx} className="custom-card p-3.5 text-center text-xs font-semibold text-slate-800 bg-slate-50">
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
          കുട്ടികൾക്കായുള്ള പരിപാടികൾ
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="custom-card p-4 text-center space-y-2 hover:border-pink-300">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-slate-800">{act.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
