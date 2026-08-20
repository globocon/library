import { Sparkles, Star, BookOpen } from 'lucide-react';

export default function NewArrivalsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">പുതിയ പുസ്തകങ്ങൾ</h1>
        <p className="text-xs text-slate-600">ഗ്രന്ഥശാലയിൽ പുതുതായി എത്തിയ പുസ്തകങ്ങളുടെ വിവരങ്ങൾ</p>
      </div>

      {/* Book of the Week Spotlight Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 md:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          <span>⭐ ഈ ആഴ്ചയിലെ പുസ്തകം</span>
        </div>
        <p className="text-xs text-slate-700">ഓരോ ആഴ്ചയും ലൈബ്രറി തിരഞ്ഞെടുക്കുന്ന ഒരു മികച്ച പുസ്തകം പരിചയപ്പെടുത്താം.</p>

        <div className="bg-white p-4 rounded-lg border border-amber-200 space-y-2 text-xs text-slate-800">
          <div><strong>പുസ്തകം:</strong> __________________</div>
          <div><strong>എഴുത്തുകാരൻ:</strong> __________________</div>
          <div><strong>വിഭാഗം:</strong> __________________</div>
        </div>

        <div className="text-xs font-bold text-amber-900 italic text-center pt-2">
          “ഒരു നല്ല പുസ്തകം ഒരു നല്ല സുഹൃത്താണ്.”
        </div>
      </div>

      {/* New Arrivals list */}
      <div className="custom-card p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-sm text-[#0d5c46]">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>ഈ മാസത്തെ പുതിയ പുസ്തകങ്ങൾ</span>
        </div>

        <div className="space-y-3 text-xs">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-800">പുസ്തകത്തിന്റെ പേര്: __________</div>
                <div className="text-slate-500">എഴുത്തുകാരൻ: __________</div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-[#0d5c46] font-semibold px-2 py-0.5 rounded">
                ലഭ്യമാണ്
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
