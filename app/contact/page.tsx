'use client';

import { useState, FormEvent } from 'react';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; referenceId?: string; message?: string; error?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "സന്ദേശം അയയ്ക്കുന്നതിൽ പിശക് സംഭവിച്ചു." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "ആർക്കെല്ലാം അംഗമാകാം?",
      a: "നിലവിലുള്ള ലൈബ്രറി നിയമങ്ങൾക്ക് വിധേയമായി പ്രദേശത്തെ വായനക്കാർക്കും വിദ്യാർത്ഥികൾക്കും കുട്ടികൾക്കും പൊതുജനങ്ങൾക്കും അംഗത്വം നൽകാം. കേരളത്തിലെ പൊതുഗ്രന്ഥശാല നിയമപരമ്പരയിൽ അംഗത്വം പൊതുജനങ്ങൾക്ക് തുറന്നതായിരിക്കണമെന്ന വ്യവസ്ഥയും ഉണ്ട്. (E-LIS Repository)"
    },
    {
      q: "അംഗത്വത്തിന് എന്തെല്ലാം രേഖകൾ വേണം?",
      a: "ലൈബ്രറി നിശ്ചയിക്കുന്ന തിരിച്ചറിയൽ രേഖയും ആവശ്യമായ ഫോട്ടോയും നൽകണം. കൃത്യമായ രേഖകളുടെ പട്ടിക ഇവിടെ പ്രസിദ്ധീകരിക്കാം. കേരള സ്റ്റേറ്റ് സെൻട്രൽ ലൈബ്രറിയുടെ നിലവിലെ മാതൃകയിൽ ID proof, ഫോട്ടോ തുടങ്ങിയവ ആവശ്യപ്പെടുന്നുണ്ട്. (Kerala State Library)"
    },
    {
      q: "ഒരു സമയം എത്ര പുസ്തകം എടുക്കാം?",
      a: "അത് അംഗത്വ വിഭാഗവും ലൈബ്രറി നിയമങ്ങളും അനുസരിച്ചായിരിക്കും."
    },
    {
      q: "പുസ്തകം നഷ്ടപ്പെട്ടാൽ?",
      a: "ലൈബ്രറിയുടെ നിലവിലുള്ള നിയമപ്രകാരം പുസ്തകത്തിന്റെ വില/നഷ്ടപരിഹാരം ഈടാക്കാം."
    },
    {
      q: "ഓൺലൈനായി പുസ്തകം തിരയാമോ?",
      a: "അതെ — ലൈബ്രറിയുടെ OPAC/Online Catalogue ലഭ്യമാക്കിയാൽ വെബ്‌സൈറ്റിലൂടെ പുസ്തകങ്ങൾ തിരയാം."
    },
    {
      q: "അംഗത്വം പുതുക്കാമോ?",
      a: "നിലവിലുള്ള അംഗത്വ നിബന്ധനകൾ അനുസരിച്ച് renewal സൗകര്യം നൽകാം."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">ഞങ്ങളെ ബന്ധപ്പെടാം</h1>
        <p className="text-xs text-slate-600">{LIBRARY_CONFIG.name} — വിലാസവും സന്ദേശ ഫോമും</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="custom-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#0d5c46] border-b border-slate-100 pb-2">
              വിലാസം & വിവരങ്ങൾ
            </h2>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0d5c46] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">വിലാസം:</div>
                  <div>{LIBRARY_CONFIG.contact.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0d5c46] shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">ഫോൺ: </span>
                  <span>{LIBRARY_CONFIG.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">WhatsApp: </span>
                  <span>{LIBRARY_CONFIG.contact.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0d5c46] shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">Email: </span>
                  <span>{LIBRARY_CONFIG.contact.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href={LIBRARY_CONFIG.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs w-full text-center py-2"
              >
                📍 [ വഴി കണ്ടെത്തുക - Google Maps ]
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div>
          {result?.success ? (
            <div className="custom-card p-8 text-center space-y-3 bg-emerald-50/50 border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-[#0d5c46] mx-auto" />
              <h3 className="text-lg font-bold text-[#0d5c46]">സന്ദേശം അയച്ചു!</h3>
              <p className="text-xs text-slate-600">{result.message}</p>
              <div className="text-xs font-mono font-bold text-slate-700">Ref: {result.referenceId}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="custom-card p-6 md:p-8 space-y-4">
              <h2 className="text-base font-bold text-[#0d5c46] border-b border-slate-100 pb-2">
                [ ഞങ്ങൾക്ക് സന്ദേശം അയയ്ക്കുക ]
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">വിഷയം</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="സന്ദേശത്തിന്റെ വിഷയം"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">സന്ദേശം</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-xs py-2.5"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : '[ സന്ദേശം അയയ്ക്കുക ]'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section from PDF */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <HelpCircle className="w-5 h-5 text-[#0d5c46]" />
          <h2>❓ പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ (FAQ)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="custom-card p-5 space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#0d5c46]">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
