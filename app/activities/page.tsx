import { Users, Heart, BookOpen, Sparkles, Sun } from 'lucide-react';

export default function ActivitiesPage() {
  const activities = [
    { title: "Community Programmes", desc: "സമൂഹത്തിനൊപ്പം ചേർന്നുള്ള സാംസ്കാരിക വികസന പരിപാടികൾ." },
    { title: "Reading Campaigns", desc: "വായനാ സംസ്കാരം പ്രോത്സാഹിപ്പിക്കുന്ന ക്യാമ്പയിനുകൾ." },
    { title: "Educational Activities", desc: "വിദ്യാർത്ഥികൾക്കുള്ള സെമിനാറുകളും പഠന പരിപാടികളും." },
    { title: "Children’s Activities", desc: "കുട്ടികൾക്കായുള്ള ചിത്രരചന, ക്വിസ്, നാടക മത്സരങ്ങൾ." },
    { title: "Family Reading", desc: "കുടുംബവായന പ്രോത്സാഹിപ്പിക്കുന്ന സംരംഭങ്ങൾ." },
    { title: "Social Awareness", desc: "സാമൂഹിക ബോധവൽക്കരണ പരിപാടികൾ." },
    { title: "Cultural Activities", desc: "പ്രാദേശിക കലാ-സാംസ്കാരിക പരിപാടികൾ." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ഞങ്ങളുടെ പ്രവർത്തനങ്ങൾ</h1>
        <p className="text-xs text-slate-600">ഗ്രന്ഥശാല പുസ്തകങ്ങൾ നൽകുന്ന ഒരു ഇടം മാത്രമല്ല — സമൂഹത്തിനൊപ്പം വളരുന്ന സംരംഭമാണ്.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((act, idx) => (
          <div key={idx} className="custom-card p-5 space-y-1">
            <h3 className="font-bold text-sm text-[#0d5c46]">{act.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
