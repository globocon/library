import Link from 'next/link';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Heart, BookOpen, DollarSign, Laptop, Armchair, Users } from 'lucide-react';

export default function SupportPage() {
  const supportOptions = [
    { title: "പുസ്തകങ്ങൾ സംഭാവന ചെയ്യാം", href: "/donate-books", icon: BookOpen, desc: "നല്ല പുസ്തകങ്ങൾ ഗ്രന്ഥശാലയ്ക്ക് സംഭാവനയായി നൽകാം." },
    { title: "സാമ്പത്തിക സഹായം നൽകാം", href: "/contact", icon: DollarSign, desc: "ലൈബ്രറിയുടെ വികസനത്തിനായി സാമ്പത്തിക സഹായം നൽകാം." },
    { title: "ഡിജിറ്റൽ സൗകര്യങ്ങൾക്കായി സഹായിക്കാം", href: "/contact", icon: Laptop, desc: "കമ്പ്യൂട്ടറുകളും ഇന്റർനെറ്റ് സൗകര്യങ്ങളും വികസിപ്പിക്കാൻ സഹായിക്കാം." },
    { title: "ഫർണിച്ചർ / ഉപകരണങ്ങൾ നൽകാം", href: "/contact", icon: Armchair, desc: "വായനമുറിക്കായുള്ള ഫർണിച്ചറുകൾ നൽകാം." },
    { title: "സന്നദ്ധ പ്രവർത്തകനാകാം", href: "/volunteer", icon: Users, desc: "പ്രവർത്തനങ്ങളിൽ സന്നദ്ധ പ്രവർത്തകനായി പങ്കാളിയാകാം." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-2">
        <Heart className="w-10 h-10 text-[#0d5c46] mx-auto" />
        <h1 className="text-3xl font-bold text-[#0d5c46]">ഗ്രന്ഥശാലയെ പിന്തുണയ്ക്കാം</h1>
        <p className="text-xs text-slate-700 max-w-2xl mx-auto leading-relaxed">
          നമ്മുടെ പ്രദേശത്തെ ഒരു മികച്ച അറിവിന്റെ കേന്ദ്രമായി ഗ്രന്ഥശാലയെ വളർത്താൻ നിങ്ങളുടെ പിന്തുണ ആവശ്യമാണ്.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
          നിങ്ങൾക്ക് സഹായിക്കാം:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportOptions.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div key={idx} className="custom-card p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-[#0d5c46] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{opt.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{opt.desc}</p>
                </div>
                <div>
                  <Link href={opt.href} className="btn-secondary text-xs py-1.5 px-3">
                    [ Support the Library ]
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
