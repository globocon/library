'use client';

import { useState, FormEvent } from 'react';
import { Heart, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    areaOfInterest: [] as string[],
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; referenceId?: string; message?: string; error?: string } | null>(null);

  const areas = [
    "പുസ്തക ക്രമീകരണം",
    "കുട്ടികളുടെ പരിപാടികൾ",
    "ഡിജിറ്റൽ സഹായം",
    "വായനാ പരിപാടികൾ",
    "സാമൂഹിക പ്രവർത്തനങ്ങൾ",
    "സാംസ്കാരിക പരിപാടികൾ"
  ];

  const handleCheckboxChange = (area: string) => {
    setFormData(prev => {
      const exists = prev.areaOfInterest.includes(area);
      return {
        ...prev,
        areaOfInterest: exists 
          ? prev.areaOfInterest.filter(a => a !== area)
          : [...prev.areaOfInterest, area]
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/volunteer', {
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
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">സന്നദ്ധ പ്രവർത്തകർ (Volunteer)</h1>
        <p className="text-xs text-slate-600">
          ഗ്രന്ഥശാലയുടെ വിവിധ പ്രവർത്തനങ്ങളിൽ സന്നദ്ധ പ്രവർത്തകരെയും യുവാക്കളെയും പങ്കെടുപ്പിക്കാം.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#0d5c46]">നിങ്ങൾക്കും സഹകരിക്കാം</h2>
          <div className="space-y-2">
            {areas.map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200">
                <Heart className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          {result?.success ? (
            <div className="custom-card p-6 text-center space-y-3 bg-emerald-50/50 border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-[#0d5c46] mx-auto" />
              <h3 className="text-lg font-bold text-[#0d5c46]">അപേക്ഷ സ്വീകരിച്ചു!</h3>
              <p className="text-xs text-slate-600">{result.message}</p>
              <div className="text-xs font-mono font-bold text-slate-700">Ref: {result.referenceId}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="custom-card p-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                [ Volunteer ആയി ചേരുക ]
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
                  placeholder="നിങ്ങളുടെ പേര്"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">മൊബൈൽ നമ്പർ *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">ഇ-മെയിൽ</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">സഹകരിക്കാൻ താല്പര്യമുള്ള മേഖല</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {areas.map((a, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2 rounded border border-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.areaOfInterest.includes(a)}
                        onChange={() => handleCheckboxChange(a)}
                        className="w-4 h-4 text-[#0d5c46] rounded"
                      />
                      <span>{a}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-xs py-2.5"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'അപേക്ഷ സമർപ്പിക്കുക'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
