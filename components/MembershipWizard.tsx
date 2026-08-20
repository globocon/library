'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  User, MapPin, GraduationCap, FileText, Upload, CheckCircle2, 
  ArrowRight, ArrowLeft, Loader2, ShieldCheck, AlertCircle, Sparkles, Check
} from 'lucide-react';

export default function MembershipWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  // Form State - accepts input in Malayalam or English seamlessly
  const [formData, setFormData] = useState({
    nameMl: '',
    nameEn: '',
    dob: '',
    gender: 'പുരുഷൻ',
    parentGuardianName: '',
    address: '',
    panchayat: '',
    ward: '',
    pincode: '',
    mobile: '',
    email: '',
    education: '',
    occupation: '',
    idType: 'Aadhaar',
    idNumber: '',
    category: 'പൊതുവിഭാഗം',
    guardianName: '',
    guardianMobile: '',
    guardianConsentAccepted: false,
    termsAccepted: false
  });

  const [files, setFiles] = useState<{ photo: File | null; idDocument: File | null }>({
    photo: null,
    idDocument: null
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isMinorOrStudent = formData.category === 'കുട്ടി' || formData.category === 'വിദ്യാർത്ഥി';

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: 'photo' | 'idDocument') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 5) {
        setFormError("ഫയൽ വലുപ്പം 5MB-ൽ താഴെയായിരിക്കണം.");
        return;
      }
      setFormError(null);
      setFiles(prev => ({ ...prev, [fieldName]: file }));

      if (fieldName === 'photo') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPhotoPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const validateStep = (step: number): boolean => {
    setFormError(null);

    if (step === 1) {
      if (!formData.nameMl.trim()) { 
        setFormError("പേര് നൽകേണ്ടത് നിർബന്ധമാണ്."); 
        return false; 
      }
      if (!formData.dob) { 
        setFormError("ജനന തീയതി നൽകേണ്ടത് നിർബന്ധമാണ്."); 
        return false; 
      }
    } else if (step === 2) {
      if (!formData.address.trim()) { 
        setFormError("പൂർണ്ണ വിലാസം നൽകേണ്ടത് നിർബന്ധമാണ്."); 
        return false; 
      }
      if (!formData.pincode.trim()) { 
        setFormError("പിൻകോഡ് നൽകേണ്ടത് നിർബന്ധമാണ്."); 
        return false; 
      }
      if (!formData.mobile.trim() || !/^[0-9]{10}$/.test(formData.mobile.trim())) { 
        setFormError("സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക."); 
        return false; 
      }
    } else if (step === 6) {
      if (isMinorOrStudent) {
        if (!formData.guardianName.trim()) { 
          setFormError("രക്ഷിതാവിന്റെ പേര് നൽകേണ്ടത് നിർബന്ധമാണ്."); 
          return false; 
        }
        if (!formData.guardianMobile.trim() || !/^[0-9]{10}$/.test(formData.guardianMobile.trim())) { 
          setFormError("രക്ഷിതാവിന്റെ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക."); 
          return false; 
        }
        if (!formData.guardianConsentAccepted) { 
          setFormError("രക്ഷിതാവിന്റെ സമ്മതപത്രം അംഗീകരിക്കേണ്ടതുണ്ട്."); 
          return false; 
        }
      }
      if (!formData.termsAccepted) {
        setFormError("ലൈബ്രറി നിബന്ധനകൾ അംഗീകരിച്ച് ചെക്ക് ചെയ്യുക."); 
        return false; 
      }
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(6)) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const data = new FormData();
      const payload = {
        ...formData,
        nameEn: formData.nameEn.trim() ? formData.nameEn : formData.nameMl
      };

      Object.entries(payload).forEach(([key, val]) => {
        data.append(key, String(val));
      });

      if (files.photo) data.append('photo', files.photo);
      if (files.idDocument) data.append('idDocument', files.idDocument);

      const res = await fetch('/api/membership', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setSubmitResult(result);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFormError(result.error || "അപേക്ഷ സമർപ്പിക്കുന്നതിൽ പിശക് സംഭവിച്ചു.");
      }
    } catch {
      setFormError("നെറ്റ്‌വർക്ക് പിശക്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean success confirmation without reference number as requested
  if (submitResult?.success) {
    return (
      <div className="globo-card p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 border-2 border-emerald-400 bg-white shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-[#064e3b] rounded-2xl flex items-center justify-center mx-auto shadow-md border-2 border-emerald-300">
          <CheckCircle2 className="w-12 h-12 text-[#059669]" />
        </div>

        <div className="space-y-3">
          <span className="inline-block bg-emerald-100 text-[#064e3b] px-4 py-1 rounded-full text-xs font-extrabold">
            വിജയകരം
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
            അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു!
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium max-w-lg mx-auto leading-relaxed">
            നിങ്ങളുടെ ഓൺലൈൻ രജിസ്ട്രേഷൻ അപേക്ഷ ലൈബ്രറിയിൽ ലഭിച്ചിട്ടുണ്ട്. ലൈബ്രറി അധികൃതരുടെ പരിശോധനയ്ക്ക് ശേഷം നിങ്ങളെ നേരിട്ട് ബന്ധപ്പെടുന്നതാണ്.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => window.location.href = '/'}
            className="btn-globo-emerald text-sm sm:text-base py-3 px-8 rounded-xl font-extrabold"
          >
            ഹോം പേജിലേക്ക് മടങ്ങുക
          </button>
        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, title: 'വ്യക്തിഗതം', icon: User },
    { num: 2, title: 'വിലാസം', icon: MapPin },
    { num: 3, title: 'വിദ്യാഭ്യാസം', icon: GraduationCap },
    { num: 4, title: 'തിരിച്ചറിയൽ', icon: FileText },
    { num: 5, title: 'രേഖകൾ', icon: Upload },
    { num: 6, title: 'സമ്മതം', icon: ShieldCheck },
    { num: 7, title: 'പരിശോധന', icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-4xl mx-auto my-6 px-2 sm:px-4">
      
      {/* Globocon-Style Step Navigation Tabs */}
      <div className="mb-6">
        <div className="flex justify-between items-center overflow-x-auto pb-3 gap-2 border-b-2 border-slate-200">
          {stepsList.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isDone = currentStep > s.num;
            return (
              <button 
                key={s.num} 
                type="button"
                onClick={() => isDone && setCurrentStep(s.num)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold shrink-0 transition-all ${
                  isActive ? 'bg-[#064e3b] text-white shadow-md ring-2 ring-emerald-400/40 scale-105' : 
                  isDone ? 'bg-emerald-100 text-[#064e3b] hover:bg-emerald-200' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>ഘട്ടം {s.num}: {s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3 text-red-900 text-sm font-bold shadow-sm animate-pulse">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <div>
            <span>{formError}</span>
          </div>
        </div>
      )}

      {/* Main Dual-Tone Card Form */}
      <form onSubmit={handleSubmit} className="globo-card overflow-hidden bg-white border-2 border-slate-200 shadow-xl">
        
        {/* Top Emerald Header Ribbon */}
        <div className="bg-gradient-to-r from-[#064e3b] to-[#043c2e] text-white px-6 py-4 flex justify-between items-center border-b-2 border-emerald-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <h3 className="text-base sm:text-lg font-extrabold">
              ഘട്ടം {currentStep}: {stepsList[currentStep - 1].title} വിവരങ്ങൾ
            </h3>
          </div>
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
            {currentStep} / 7
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* STEP 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    അപേക്ഷകന്റെ പേര് *
                  </label>
                  <input
                    type="text"
                    name="nameMl"
                    value={formData.nameMl}
                    onChange={handleInputChange}
                    placeholder="പേര് നൽകുക (Malayalam or English)"
                    className="globo-input font-medium"
                    required
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ടൈപ്പ് ചെയ്യാവുന്നതാണ്.
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    ജനന തീയതി *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="globo-input font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    ലിംഗം *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="globo-input font-medium"
                  >
                    <option value="പുരുഷൻ">പുരുഷൻ</option>
                    <option value="സ്ത്രീ">സ്ത്രീ</option>
                    <option value="മറ്റുള്ളവ">മറ്റുള്ളവ</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    പിതാവ് / മാതാവ് / രക്ഷിതാവിന്റെ പേര്
                  </label>
                  <input
                    type="text"
                    name="parentGuardianName"
                    value={formData.parentGuardianName}
                    onChange={handleInputChange}
                    placeholder="രക്ഷിതാവിന്റെ പേര്"
                    className="globo-input font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Address & Phone */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    പൂർണ്ണ വിലാസം *
                  </label>
                  <textarea
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="വീട്ടുപേര്, സ്ഥലം..."
                    className="globo-input font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    പഞ്ചായത്ത് / മുനിസിപ്പാലിറ്റി
                  </label>
                  <input
                    type="text"
                    name="panchayat"
                    value={formData.panchayat}
                    onChange={handleInputChange}
                    placeholder="ഉദാ: നെടുങ്കണ്ടം"
                    className="globo-input font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    വാർഡ്
                  </label>
                  <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleInputChange}
                    placeholder="വാർഡ് നമ്പർ / പേര്"
                    className="globo-input font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    പിൻകോഡ് *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="685553"
                    className="globo-input font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    മൊബൈൽ നമ്പർ *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="10 അക്ക മൊബൈൽ നമ്പർ"
                    className="globo-input font-medium"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    ഇ-മെയിൽ
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="globo-input font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Education & Occupation */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    വിദ്യാഭ്യാസ യോഗ്യത
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="ഉദാ: SSLC, Plus Two, Degree..."
                    className="globo-input font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    തൊഴിൽ / ജോലി
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="ഉദാ: വിദ്യാർത്ഥി, കർഷകൻ, ജീവനക്കാരൻ..."
                    className="globo-input font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ID Document & Category */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    തിരിച്ചറിയൽ രേഖ *
                  </label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleInputChange}
                    className="globo-input font-medium"
                  >
                    <option value="Aadhaar">Aadhaar (ആധാർ)</option>
                    <option value="Voter ID">Voter ID (തിരിച്ചറിയൽ കാർഡ്)</option>
                    <option value="Driving Licence">Driving Licence</option>
                    <option value="Passport">Passport</option>
                    <option value="മറ്റ് രേഖ">മറ്റ് രേഖ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    തിരിച്ചറിയൽ രേഖ നമ്പർ
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    placeholder="രേഖയുടെ നമ്പർ നൽകുക"
                    className="globo-input font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    അംഗത്വ വിഭാഗം *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="globo-input font-extrabold text-[#064e3b] bg-emerald-50/60"
                  >
                    <option value="പൊതുവിഭാഗം">പൊതുവിഭാഗം (General)</option>
                    <option value="കുട്ടി">കുട്ടി (Children)</option>
                    <option value="വിദ്യാർത്ഥി">വിദ്യാർത്ഥി (Student)</option>
                    <option value="കുടുംബ അംഗത്വം">കുടുംബ അംഗത്വം (Family)</option>
                    <option value="മുതിർന്ന പൗരൻ">മുതിർന്ന പൗരൻ (Senior Citizen)</option>
                    <option value="മറ്റ്">മറ്റ്</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Photo & Document Uploads */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 text-center hover:border-[#059669] transition-colors bg-emerald-50/40">
                  {photoPreview ? (
                    <div className="mb-3">
                      <img src={photoPreview} alt="Preview" className="w-28 h-32 object-cover rounded-xl mx-auto border-2 border-emerald-300 shadow-md" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-7 h-7" />
                    </div>
                  )}
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    അപേക്ഷകന്റെ ഫോട്ടോ
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleFileChange(e, 'photo')}
                    className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#064e3b] file:text-white"
                  />
                  {files.photo && (
                    <div className="mt-2 text-xs text-emerald-800 font-bold">
                      ✓ {files.photo.name}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">പരമാവധി വലുപ്പം: 5MB (JPG, PNG)</p>
                </div>

                <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 text-center hover:border-[#059669] transition-colors bg-emerald-50/40">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#064e3b] flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-7 h-7" />
                  </div>
                  <label className="block text-sm font-extrabold text-slate-900 mb-1.5">
                    തിരിച്ചറിയൽ രേഖ
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    onChange={(e) => handleFileChange(e, 'idDocument')}
                    className="text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#064e3b] file:text-white"
                  />
                  {files.idDocument && (
                    <div className="mt-2 text-xs text-emerald-800 font-bold">
                      ✓ {files.idDocument.name}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">പരമാവധി വലുപ്പം: 5MB (JPG, PNG, PDF)</p>
                </div>

              </div>
            </div>
          )}

          {/* STEP 6: Declarations & Consent */}
          {currentStep === 6 && (
            <div className="space-y-6">
              
              {/* Conditional Guardian Consent */}
              {isMinorOrStudent && (
                <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-2xl space-y-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                    <h4 className="text-sm font-extrabold text-amber-950">
                      രക്ഷിതാവിന്റെ സമ്മതപത്രം (കുട്ടി / വിദ്യാർത്ഥി അപേക്ഷകർക്ക്)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-amber-950 mb-1">രക്ഷിതാവിന്റെ പേര് *</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        placeholder="രക്ഷിതാവിന്റെ പൂർണ്ണ പേര്"
                        className="globo-input text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-amber-950 mb-1">രക്ഷിതാവിന്റെ മൊബൈൽ നമ്പർ *</label>
                      <input
                        type="tel"
                        name="guardianMobile"
                        value={formData.guardianMobile}
                        onChange={handleInputChange}
                        placeholder="10 അക്ക മൊബൈൽ"
                        className="globo-input text-sm"
                        required
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed pt-1 font-medium">
                    എന്റെ കുട്ടി (<strong>{formData.nameMl || '—'}</strong>) ഗ്രന്ഥശാലയിലെ അംഗമായി പുസ്തകങ്ങളും മറ്റ് സൗകര്യങ്ങളും ഉപയോഗിക്കുന്നതിന് ഞാൻ സമ്മതിക്കുന്നു.
                  </p>

                  <label className="flex items-center gap-2.5 cursor-pointer pt-2">
                    <input
                      type="checkbox"
                      name="guardianConsentAccepted"
                      checked={formData.guardianConsentAccepted}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#064e3b] rounded border-amber-400"
                      required
                    />
                    <span className="text-xs font-extrabold text-amber-950">
                      രക്ഷിതാവെന്ന നിലയിൽ ഞാൻ മുകളിലെ സമ്മതപത്രം പൂർണ്ണമായും അംഗീകരിക്കുന്നു.
                    </span>
                  </label>
                </div>
              )}

              {/* Applicant Declaration */}
              <div className="bg-slate-50 border-2 border-slate-200 p-6 rounded-2xl space-y-4">
                <h4 className="text-sm font-extrabold text-slate-900">
                  ✍️ അപേക്ഷകന്റെ പ്രഖ്യാപനം
                </h4>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                  <li>ഞാൻ നൽകിയിരിക്കുന്ന വിവരങ്ങൾ ശരിയാണെന്ന് ഇതിനാൽ പ്രഖ്യാപിക്കുന്നു.</li>
                  <li>ഗ്രന്ഥശാലയുടെ നിലവിലുള്ള നിയമങ്ങളും ചട്ടങ്ങളും പാലിക്കുമെന്ന് ഞാൻ സമ്മതിക്കുന്നു.</li>
                  <li>ഗ്രന്ഥശാലയിൽ നിന്ന് ലഭിക്കുന്ന പുസ്തകങ്ങൾ ഉത്തരവാദിത്തത്തോടെ ഉപയോഗിക്കുകയും നിശ്ചിത സമയത്തിനുള്ളിൽ തിരികെ നൽകുകയും ചെയ്യും.</li>
                </ul>

                <label className="flex items-center gap-2.5 cursor-pointer pt-3 border-t border-slate-200">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#064e3b] rounded border-slate-300"
                    required
                  />
                  <span className="text-xs sm:text-sm font-extrabold text-[#064e3b]">
                    [ ✓ ഞാൻ നിബന്ധനകൾ പൂർണ്ണമായും അംഗീകരിക്കുന്നു ]
                  </span>
                </label>
              </div>

            </div>
          )}

          {/* STEP 7: Review & Final Submit */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="bg-emerald-50/50 p-6 rounded-2xl border-2 border-emerald-300 space-y-4 text-xs sm:text-sm">
                <div className="font-extrabold text-[#064e3b] border-b border-emerald-200 pb-2 text-base flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>നൽകിയ വിവരങ്ങൾ പരിശോധിക്കുക:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 font-medium">
                  <div><span className="font-bold text-slate-500">പേര്:</span> {formData.nameMl}</div>
                  <div><span className="font-bold text-slate-500">ജനന തീയതി:</span> {formData.dob}</div>
                  <div><span className="font-bold text-slate-500">ലിംഗം:</span> {formData.gender}</div>
                  <div><span className="font-bold text-slate-500">മൊബൈൽ നമ്പർ:</span> {formData.mobile}</div>
                  <div><span className="font-bold text-slate-500">ഇ-മെയിൽ:</span> {formData.email || '—'}</div>
                  <div><span className="font-bold text-slate-500">പിൻകോഡ്:</span> {formData.pincode}</div>
                  <div className="sm:col-span-2"><span className="font-bold text-slate-500">പൂർണ്ണ വിലാസം:</span> {formData.address}</div>
                  <div><span className="font-bold text-slate-500">തിരിച്ചറിയൽ രേഖ:</span> {formData.idType} ({formData.idNumber || '—'})</div>
                  <div><span className="font-bold text-slate-500">അംഗത്വ വിഭാഗം:</span> {formData.category}</div>
                  <div><span className="font-bold text-slate-500">ഫോട്ടോ:</span> {files.photo ? files.photo.name : 'നൽകിയിട്ടില്ല'}</div>
                  <div><span className="font-bold text-slate-500">തിരിച്ചറിയൽ രേഖ:</span> {files.idDocument ? files.idDocument.name : 'നൽകിയിട്ടില്ല'}</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Wizard Footer Navigation Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t-2 border-slate-200 flex justify-between items-center">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              disabled={isSubmitting}
              className="bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs sm:text-sm py-3 px-5 rounded-xl border-2 border-slate-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>മുമ്പത്തെ ഘട്ടം</span>
            </button>
          ) : <div />}

          {currentStep < 7 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn-globo-emerald text-xs sm:text-sm py-3 px-7 rounded-xl font-extrabold shadow-md"
            >
              <span>അടുത്ത ഘട്ടം</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-globo-gold text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-xl flex items-center gap-2 font-extrabold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>അപേക്ഷ സമർപ്പിക്കുന്നു...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-slate-950" />
                  <span>അപേക്ഷ സമർപ്പിക്കുക</span>
                </>
              )}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}
