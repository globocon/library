'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: 'പുരുഷൻ',
    address: '',
    panchayat: '',
    ward: '',
    pincode: '',
    email: '',
    category: 'പൊതുവിഭാഗം',
    // Minor / Guardian Details (shown when category === 'കുട്ടി')
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    // 3 Manual Payment Fields (അപേക്ഷയോടൊപ്പം അടച്ച തുക)
    admissionFee: '',
    deposit: '',
    monthlyFee: ''
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    referenceId?: string;
    submittedAt?: string;
    emailSent?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error on edit
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "ദയവായി താങ്കളുടെ പേര് നൽകുക.";
    }

    if (!formData.mobile.trim()) {
      errors.mobile = "ദയവായി മൊബൈൽ നമ്പർ നൽകുക.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      errors.mobile = "സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.";
    }

    if (!formData.address.trim()) {
      errors.address = "ദയവായി പൂർണ്ണ വിലാസം നൽകുക.";
    }

    if (!formData.panchayat.trim()) {
      errors.panchayat = "ദയവായി പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റിയുടെ പേര് നൽകുക.";
    }

    if (!formData.ward.trim()) {
      errors.ward = "ദയവായി വാർഡ് നമ്പർ അല്ലെങ്കിൽ പേര് നൽകുക.";
    }

    // Guardian validation for minor
    if (formData.category === 'കുട്ടി' && !formData.guardianName.trim()) {
      errors.guardianName = "മൈനർ ആയതിനാൽ രക്ഷകർത്താവിന്റെ പേര് നൽകുക.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, String(val));
      });

      const res = await fetch('/api/membership', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setSubmitResult(result);
        const el = document.getElementById('apply-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setGeneralError(result.error || "അപേക്ഷ സമർപ്പിക്കുന്നതിൽ തടസ്സം നേരിട്ടു. ദയവായി വീണ്ടും ശ്രമിക്കുക.");
      }
    } catch {
      setGeneralError("നെറ്റ്‌വർക്ക് പ്രശ്നം നേരിട്ടു. ദയവായി അല്പം കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      mobile: '',
      gender: 'പുരുഷൻ',
      address: '',
      panchayat: '',
      ward: '',
      pincode: '',
      email: '',
      category: 'പൊതുവിഭാഗം',
      guardianName: '',
      guardianRelation: '',
      guardianPhone: '',
      admissionFee: '',
      deposit: '',
      monthlyFee: ''
    });
    setFieldErrors({});
    setSubmitResult(null);
    setGeneralError(null);
  };

  // SUCCESS CONFIRMATION CONTAINER
  if (submitResult?.success) {
    return (
      <div className="bg-white border-2 border-emerald-600 rounded-3xl p-6 sm:p-12 text-center shadow-lg space-y-6 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-emerald-50 text-[#064e3b] rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
            അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു.
          </h3>
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 inline-block text-center w-full max-w-sm mx-auto">
            <div className="text-sm font-bold text-slate-600 mb-1">
              താങ്കളുടെ അപേക്ഷാ നമ്പർ:
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#064e3b] tracking-wider">
              {submitResult.referenceId}
            </div>
          </div>

          <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-md mx-auto">
            അപേക്ഷ ലൈബ്രറിയിൽ ലഭിച്ചിട്ടുണ്ട്. ലൈബ്രറി അധികൃതർ പരിശോധിച്ച് തുടർനടപടികൾ സ്വീകരിക്കുന്നതാണ്.
          </p>

          <p className="text-lg font-bold text-slate-900 pt-2">
            നന്ദി.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={handleReset}
            className="bg-[#064e3b] hover:bg-[#043c2e] text-white font-bold text-base py-3.5 px-8 rounded-xl shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>മറ്റൊരു അപേക്ഷ സമർപ്പിക്കുക</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ONE VISUAL CONTAINER APPLICATION FORM
  return (
    <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-10 md:p-12 shadow-sm space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-5 sm:pb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
          അംഗത്വ അപേക്ഷാ ഫോം
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
          ദയവായി താഴെ പറയുന്ന വിവരങ്ങൾ പൂരിപ്പിച്ച് സമർപ്പിക്കുക. (* അടയാളപ്പെടുത്തിയവ നിർബന്ധമാണ്)
        </p>
      </div>

      {/* General Error Notice */}
      {generalError && (
        <div className="p-4 bg-red-50 border border-red-300 rounded-xl flex items-center gap-3 text-red-900 text-sm sm:text-base font-bold">
          <AlertCircle className="w-6 h-6 shrink-0 text-red-600" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Form Fields Container */}
      <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>

        {/* 1. പേര് * */}
        <div>
          <label className="block text-base sm:text-lg font-extrabold text-slate-900 mb-2">
            1. പേര് *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="പൂർണ്ണ പേര് നൽകുക"
            className={`form-input-box ${fieldErrors.name ? 'border-red-500 bg-red-50/30' : ''}`}
            required
          />
          {fieldErrors.name && (
            <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {fieldErrors.name}
            </p>
          )}
        </div>

        {/* 2. മൊബൈൽ നമ്പർ * */}
        <div>
          <label className="block text-base sm:text-lg font-extrabold text-slate-900 mb-2">
            2. മൊബൈൽ നമ്പർ *
          </label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="10 അക്ക മൊബൈൽ നമ്പർ"
            className={`form-input-box ${fieldErrors.mobile ? 'border-red-500 bg-red-50/30' : ''}`}
            required
          />
          {fieldErrors.mobile && (
            <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {fieldErrors.mobile}
            </p>
          )}
        </div>

        {/* 3. ലിംഗം */}
        <div>
          <label className="block text-base sm:text-lg font-extrabold text-slate-900 mb-2.5">
            3. ലിംഗം
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['പുരുഷൻ', 'സ്ത്രീ', 'മറ്റുള്ളവ'].map((option) => (
              <label 
                key={option} 
                className={`radio-card min-h-[52px] ${formData.gender === option ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleInputChange}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 4. പൂർണ്ണ വിലാസം * */}
        <div>
          <label className="block text-base sm:text-lg font-extrabold text-slate-900 mb-2">
            4. പൂർണ്ണ വിലാസം *
          </label>
          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleInputChange}
            placeholder="വീട്ടുപേര്, സ്ഥലം..."
            className={`form-input-box ${fieldErrors.address ? 'border-red-500 bg-red-50/30' : ''}`}
            required
          />
          {fieldErrors.address && (
            <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {fieldErrors.address}
            </p>
          )}
        </div>

        {/* 5. പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി * & 6. വാർഡ് * (Aligned Baselines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
          <div className="flex flex-col">
            <div className="sm:min-h-[2.75rem] flex items-end mb-2">
              <label className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                5. പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി *
              </label>
            </div>
            <input
              type="text"
              name="panchayat"
              value={formData.panchayat}
              onChange={handleInputChange}
              placeholder="ഉദാ: നെടുങ്കണ്ടം"
              className={`form-input-box ${fieldErrors.panchayat ? 'border-red-500 bg-red-50/30' : ''}`}
              required
            />
            {fieldErrors.panchayat && (
              <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {fieldErrors.panchayat}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <div className="sm:min-h-[2.75rem] flex items-end mb-2">
              <label className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                6. വാർഡ് *
              </label>
            </div>
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleInputChange}
              placeholder="വാർഡ് നമ്പർ / പേര്"
              className={`form-input-box ${fieldErrors.ward ? 'border-red-500 bg-red-50/30' : ''}`}
              required
            />
            {fieldErrors.ward && (
              <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {fieldErrors.ward}
              </p>
            )}
          </div>
        </div>

        {/* 7. പിൻകോഡ് & 8. ഇ-മെയിൽ (Aligned Baselines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
          <div className="flex flex-col">
            <div className="sm:min-h-[2rem] flex items-end mb-2">
              <label className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                7. പിൻകോഡ്
              </label>
            </div>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="685553"
              className="form-input-box"
            />
          </div>

          <div className="flex flex-col">
            <div className="sm:min-h-[2rem] flex items-end mb-2">
              <label className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                8. ഇ-മെയിൽ
              </label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="form-input-box"
            />
          </div>
        </div>

        {/* 9. അംഗത്വ വിഭാഗം (Uniform Height & Aligned Radio Grid) */}
        <div>
          <label className="block text-base sm:text-lg font-extrabold text-slate-900 mb-2.5">
            9. അംഗത്വ വിഭാഗം
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'കുട്ടി',
              'വിദ്യാർത്ഥി',
              'പൊതുവിഭാഗം',
              'കുടുംബ അംഗത്വം',
              'മുതിർന്ന പൗരൻ',
              'മറ്റ്'
            ].map((cat) => (
              <label 
                key={cat} 
                className={`radio-card min-h-[58px] sm:min-h-[64px] ${formData.category === cat ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={formData.category === cat}
                  onChange={handleInputChange}
                  className="shrink-0"
                />
                <span className="leading-snug">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ===================================================================
            രക്ഷകർത്താവിന്റെ വിവരങ്ങൾ (കുട്ടി / മൈനർ ആണെങ്കിൽ മാത്രം കാണിക്കുന്നത്)
            =================================================================== */}
        {formData.category === 'കുട്ടി' && (
          <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="border-b border-amber-200 pb-2.5">
              <h3 className="text-lg sm:text-xl font-extrabold text-amber-950">
                രക്ഷകർത്താവിന്റെ വിവരങ്ങൾ (മൈനർ ആണെങ്കിൽ)
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 font-bold mt-0.5">
                * കുട്ടി വിഭാഗം തെരഞ്ഞെടുത്തതിനാൽ രക്ഷകർത്താവിന്റെ വിവരങ്ങൾ നൽകുക:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              {/* രക്ഷകർത്താവിന്റെ പേര് */}
              <div className="flex flex-col">
                <div className="sm:min-h-[2.5rem] flex items-end mb-1.5">
                  <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    രക്ഷകർത്താവിന്റെ പേര് *
                  </label>
                </div>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleInputChange}
                  placeholder="രക്ഷകർത്താവിന്റെ പൂർണ്ണ പേര്"
                  className={`form-input-box ${fieldErrors.guardianName ? 'border-red-500 bg-red-50/30' : ''}`}
                  required
                />
                {fieldErrors.guardianName && (
                  <p className="text-red-600 text-sm font-bold mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> {fieldErrors.guardianName}
                  </p>
                )}
              </div>

              {/* ബന്ധം */}
              <div className="flex flex-col">
                <div className="sm:min-h-[2.5rem] flex items-end mb-1.5">
                  <label className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    ബന്ധം (അച്ഛൻ / അമ്മ / രക്ഷിതാവ്)
                  </label>
                </div>
                <input
                  type="text"
                  name="guardianRelation"
                  value={formData.guardianRelation}
                  onChange={handleInputChange}
                  placeholder="ഉദാ: അച്ഛൻ / അമ്മ / രക്ഷിതാവ്"
                  className="form-input-box"
                />
              </div>

              {/* രക്ഷകർത്താവിന്റെ ഫോൺ */}
              <div className="sm:col-span-2 flex flex-col pt-1">
                <label className="block text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  രക്ഷകർത്താവിന്റെ മൊബൈൽ / ഫോൺ നമ്പർ (ഓപ്ഷണൽ)
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleInputChange}
                  placeholder="10 അക്ക മൊബൈൽ നമ്പർ"
                  className="form-input-box"
                />
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            അപേക്ഷയോടൊപ്പം അടച്ച തുക (3 Manual Payment Fields Reverted)
            =================================================================== */}
        <div className="bg-emerald-50/50 border-2 border-emerald-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="border-b border-emerald-200 pb-2.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#064e3b]">
              അപേക്ഷയോടൊപ്പം അടച്ച തുക
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
              അപേക്ഷയോടൊപ്പം തുക അടച്ചിട്ടുണ്ടെങ്കിൽ താഴെ നൽകുക (ഓപ്ഷണൽ):
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
            
            {/* അംഗത്വ ഫീസ് */}
            <div className="flex flex-col">
              <div className="min-h-[1.75rem] flex items-end mb-1.5">
                <label className="text-sm sm:text-base font-bold text-slate-900">
                  അംഗത്വ ഫീസ്
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold">
                  ₹
                </div>
                <input
                  type="number"
                  name="admissionFee"
                  value={formData.admissionFee}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="w-full pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#064e3b] focus:ring-3 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            {/* ജാമ്യ നിക്ഷേപം */}
            <div className="flex flex-col">
              <div className="min-h-[1.75rem] flex items-end mb-1.5">
                <label className="text-sm sm:text-base font-bold text-slate-900">
                  ജാമ്യ നിക്ഷേപം
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold">
                  ₹
                </div>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="w-full pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#064e3b] focus:ring-3 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            {/* മാസവരി */}
            <div className="flex flex-col">
              <div className="min-h-[1.75rem] flex items-end mb-1.5">
                <label className="text-sm sm:text-base font-bold text-slate-900">
                  മാസവരി
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold">
                  ₹
                </div>
                <input
                  type="number"
                  name="monthlyFee"
                  value={formData.monthlyFee}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  step="1"
                  className="w-full pl-8 pr-3.5 py-2.5 text-base font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-[#064e3b] focus:ring-3 focus:ring-emerald-500/15"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Final Submit Action */}
        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-h-[56px] bg-[#064e3b] hover:bg-[#043c2e] text-white font-extrabold text-lg sm:text-xl py-4 px-12 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer mx-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span>അപേക്ഷ സമർപ്പിക്കുന്നു...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 text-amber-300" />
                <span>അപേക്ഷ സമർപ്പിക്കുക</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
