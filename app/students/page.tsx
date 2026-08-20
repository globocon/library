import { GraduationCap, BookMarked, Compass, CheckCircle2 } from 'lucide-react';

export default function StudentsPage() {
  const services = [
    { title: "Reference Books", desc: "പഠനത്തിനും ഗവേഷണത്തിനുമുള്ള റഫറൻസ് ഗ്രന്ഥങ്ങൾ" },
    { title: "General Knowledge", desc: "പൊതുവിജ്ഞാന പുസ്തകങ്ങളും ഗൈഡുകളും" },
    { title: "Current Affairs", desc: "തത്സമയ വിവരങ്ങളും മാസികകളും" },
    { title: "Competitive Examination Books", desc: "PSC, UPSC, SSC, Bank പരീക്ഷാ പുസ്തകങ്ങൾ" },
    { title: "Career Guidance", desc: "തൊഴിൽ മാർഗ്ഗനിർദ്ദേശങ്ങൾ" },
    { title: "Study Materials", desc: "പഠന സഹായികളും നോട്ട്സുകളും" },
    { title: "Quiet Reading Area", desc: "പഠനത്തിനായി ശാന്തമായ വായനാമുറി" }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center space-y-2">
        <GraduationCap className="w-10 h-10 text-blue-700 mx-auto" />
        <h1 className="text-3xl font-bold text-blue-950">വിദ്യാർത്ഥികൾക്കായി</h1>
        <p className="text-xs text-blue-800">
          പഠനത്തിനും മത്സരപ്പരീക്ഷകൾക്കും ആവശ്യമായ പുസ്തകങ്ങളും റഫറൻസ് സൗകര്യങ്ങളും.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((item, idx) => (
          <div key={idx} className="custom-card p-5 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
