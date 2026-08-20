import { Image as ImageIcon, Camera } from 'lucide-react';

export default function GalleryPage() {
  const categories = [
    "കെട്ടിടം", "വായനാമുറി", "പുസ്തക ശേഖരം", 
    "കുട്ടികളുടെ പരിപാടികൾ", "സാഹിത്യ പരിപാടികൾ", 
    "അംഗങ്ങൾ", "പുരസ്കാരങ്ങൾ", "പ്രത്യേക പരിപാടികൾ"
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ഫോട്ടോ ഗാലറി</h1>
        <p className="text-xs text-slate-600">നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയുടെ വിവിധ ചിത്രങ്ങൾ ഇവിടെ കാണാം.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat, idx) => (
          <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-md">
            {cat}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="custom-card p-6 text-center space-y-3 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
            <div className="w-12 h-12 bg-emerald-100 text-[#0d5c46] rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-bold text-xs text-slate-800">{cat}</div>
            <div className="text-[10px] text-slate-400">ലൈബ്രറി ചിത്രങ്ങൾ</div>
          </div>
        ))}
      </div>
    </div>
  );
}
