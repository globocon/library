'use client';

import { useState, FormEvent } from 'react';
import { BookOpen, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function BookDonationPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    bookCount: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; referenceId?: string; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.bookCount) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/donate-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">പുസ്തക സംഭാവന</h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          നിങ്ങളുടെ വീട്ടിൽ വായിച്ചുകഴിഞ്ഞ് മറ്റുള്ളവർക്ക് പ്രയോജനപ്പെടുന്ന നല്ല പുസ്തകങ്ങളുണ്ടോ? അവ ഗ്രന്ഥശാലയ്ക്ക് സംഭാവന ചെയ്യാം.
        </p>
      </div>

      {result?.success ? (
        <div className="custom-card p-8 text-center space-y-3 bg-emerald-50/50 border-emerald-200">
          <CheckCircle2 className="w-12 h-12 text-[#0d5c46] mx-auto" />
          <h2 className="text-lg font-bold text-[#0d5c46]">വിവരം ലഭിച്ചു!</h2>
          <p className="text-xs text-slate-600">{result.message}</p>
          <div className="text-xs font-mono font-bold text-slate-700">Ref: {result.referenceId}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="custom-card p-6 md:p-8 space-y-4">
          <h2 className="text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-2">
            [ പുസ്തകം സംഭാവന ചെയ്യാം ]
          </h2>

          {result?.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">പേര് *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="പേര് നൽകുക"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">മൊബൈൽ *</label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="10 അക്ക മൊബൈൽ"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">പുസ്തകങ്ങളുടെ എണ്ണം *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.bookCount}
                onChange={(e) => setFormData({ ...formData, bookCount: e.target.value })}
                placeholder="ഉദാ: 5"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ബന്ധപ്പെടാനുള്ള സമയം</label>
            <input
              type="text"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              placeholder="ഉദാ: വൈകുന്നേരം 4 - 6 PM"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full text-xs py-2.5"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '[ പുസ്തകം സംഭാവന ചെയ്യാം ]'}
          </button>
        </form>
      )}
    </div>
  );
}
