import Link from 'next/link';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { BookOpen, Search, Bookmark } from 'lucide-react';

export default function BooksPage() {
  const malayalamCategories = [
    "നോവൽ", "ചെറുകഥ", "കവിത", "ജീവചരിത്രം", "ആത്മകഥ", 
    "ചരിത്രം", "യാത്രാവിവരണം", "ശാസ്ത്രം", "പൊതുവിജ്ഞാനം", 
    "ആരോഗ്യം", "കൃഷി", "മതം & തത്വചിന്ത", "കുട്ടികളുടെ സാഹിത്യം"
  ];

  const englishCategories = [
    "Fiction", "Non-fiction", "Biography", "History", 
    "Science", "Reference", "Children’s Books"
  ];

  const specialCollections = [
    { title: "കുട്ടികളുടെ കോർണർ", desc: "കഥകളും ചിത്രകഥകളും ബാലസാഹിത്യവും", href: "/children" },
    { title: "യുവജന വിഭാഗം", desc: "യുവ വായനക്കാർക്കായുള്ള പുസ്തകങ്ങൾ", href: "/students" },
    { title: "മത്സരപ്പരീക്ഷാ വിഭാഗം", desc: "PSC, UPSC, Bank ട്രാക്കിംഗ് പഠന പുസ്തകങ്ങൾ", href: "/students" },
    { title: "റഫറൻസ് വിഭാഗം", desc: "ഡിക്ഷണറികൾ, എൻസൈക്ലോപീഡിയകൾ", href: "/books" },
    { title: "പത്ര-ആനുകാലിക വിഭാഗം", desc: "ദിനപത്രങ്ങളും വാരികകളും മാസികകളും", href: "/periodicals" },
    { title: "ഡിജിറ്റൽ വിഭവങ്ങൾ", desc: "ഇ-ബുക്കുകളും ഓൺലൈൻ വിഭവങ്ങളും", href: "/digital-library" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Title Header */}
      <div className="text-center space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ഞങ്ങളുടെ പുസ്തക ശേഖരം</h1>
        <p className="text-xs text-slate-600">ഗ്രന്ഥശാലയിൽ വിവിധ വിഭാഗങ്ങളിലായി നിരവധി പുസ്തകങ്ങളും പ്രസിദ്ധീകരണങ്ങളും ലഭ്യമാണ്.</p>
        <div className="pt-2">
          <Link href="/search" className="btn-primary text-xs">
            <Search className="w-4 h-4" />
            <span>ഓൺലൈനായി പുസ്തകം തിരയാം</span>
          </Link>
        </div>
      </div>

      {/* Malayalam Categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <BookOpen className="w-5 h-5 text-[#0d5c46]" />
          <h2 className="text-lg font-bold text-slate-900">മലയാളം പുസ്തക വിഭാഗങ്ങൾ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {malayalamCategories.map((cat, idx) => (
            <div key={idx} className="custom-card p-3.5 flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-800">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* English Categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <BookOpen className="w-5 h-5 text-[#0d5c46]" />
          <h2 className="text-lg font-bold text-slate-900">ഇംഗ്ലീഷ് പുസ്തക വിഭാഗങ്ങൾ</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {englishCategories.map((cat, idx) => (
            <div key={idx} className="custom-card p-3.5 flex items-center gap-2.5 bg-slate-50">
              <Bookmark className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-800">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Collections */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
          പ്രത്യേക ശേഖരങ്ങൾ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialCollections.map((sc, idx) => (
            <Link key={idx} href={sc.href} className="custom-card p-5 block hover:border-[#0d5c46] transition-colors">
              <div className="font-bold text-sm text-[#0d5c46] mb-1">{sc.title}</div>
              <div className="text-xs text-slate-600">{sc.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
