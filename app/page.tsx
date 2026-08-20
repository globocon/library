'use client';

import ApplicationForm from '@/components/ApplicationForm';
import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import Image from 'next/image';
import { 
  BookOpen, 
  Users, 
  Compass, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  BookMarked, 
  GraduationCap, 
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const scrollToForm = () => {
    const el = document.getElementById('apply-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pb-20 bg-[#f8fafc]">
      
      {/* ===================================================================
          1. HERO SECTION (Simple, Clean, Aesthetic Malayalam Banner)
          =================================================================== */}
      <section id="home-section" className="bg-gradient-to-b from-[#064e3b] via-[#043c2e] to-[#022c22] text-white py-14 sm:py-20 px-4 text-center shadow-md relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Official Logo Display */}
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl bg-white p-2 shadow-md border-2 border-emerald-400/40 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി ലോഗോ"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/15 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{LIBRARY_CONFIG.tagline}</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {LIBRARY_CONFIG.name}
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
              നെടുങ്കണ്ടത്തിന്റെ വായനാ സംസ്കാരത്തെ കൂടുതൽ ശക്തിപ്പെടുത്തുകയും, പുതിയ തലമുറയെ അറിവിലേക്കും സാഹിത്യത്തിലേക്കും ചിന്തയിലേക്കും നയിക്കുകയും ചെയ്യുന്ന ജനകീയ പൊതുഗ്രന്ഥശാല.
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm font-semibold">
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>വിപുലമായ പുസ്തകശേഖരം</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-300" />
              <span>എല്ലാവർക്കുമായി തുറന്ന അംഗത്വം</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>ശാന്തമായ വായനാമുറി</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base sm:text-lg py-4 px-10 rounded-2xl shadow-lg hover:scale-102 transition-all inline-flex items-center gap-3 cursor-pointer"
            >
              <span>അംഗത്വത്തിന് അപേക്ഷിക്കുക</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* ===================================================================
          VISION STATEMENT
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 space-y-2">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-widest">
            ഞങ്ങളുടെ ദർശനം
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-950">
            “{LIBRARY_CONFIG.vision}”
          </div>
          <p className="text-slate-700 text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
            {LIBRARY_CONFIG.visionFull}
          </p>
        </div>
      </section>

      {/* ===================================================================
          SECTION 1 – ഞങ്ങളെക്കുറിച്ച് (About the Library)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] border-b-2 border-slate-100 pb-3">
            ഞങ്ങളെക്കുറിച്ച്
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            നെടുങ്കണ്ടം പ്രദേശത്തെ വായനക്കാരെയും വിദ്യാർത്ഥികളെയും കുട്ടികളെയും കുടുംബങ്ങളെയും ഒരുമിപ്പിക്കുന്ന ഒരു ജനകീയ പൊതുഗ്രന്ഥശാലയാണ് നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി. വായനയെ പ്രോത്സാഹിപ്പിക്കുകയും പഠനത്തിനും ചിന്തയ്ക്കും ആരോഗ്യകരമായ ചർച്ചകൾക്കും സാംസ്കാരിക വളർച്ചയ്ക്കും സൗകര്യമൊരുക്കുകയും ചെയ്യുക എന്നതാണ് ഈ ലൈബ്രറിയുടെ ലക്ഷ്യം. അറിവ് സമൂഹത്തിലെ ഓരോ വ്യക്തിയിലേക്കും യാതൊരു വേർതിരിവുമില്ലാതെ ലഭ്യമാക്കാൻ ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്.
          </p>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2 – ഞങ്ങളുടെ ലക്ഷ്യങ്ങൾ (Our Goals)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] border-b-2 border-slate-100 pb-3">
            ഞങ്ങളുടെ ലക്ഷ്യങ്ങൾ
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              "വായനാശീലം വളർത്തുക",
              "വിദ്യാർത്ഥികൾക്ക് പഠനസഹായം നൽകുക",
              "കുടുംബ വായന പ്രോത്സാഹിപ്പിക്കുക",
              "കുട്ടികളിൽ വായനയോടുള്ള താൽപര്യം വളർത്തുക",
              "ഡിജിറ്റൽ അറിവിലേക്ക് പ്രവേശനം നൽകുക",
              "പത്രങ്ങളും ആനുകാലികങ്ങളും ലഭ്യമാക്കുക",
              "സാഹിത്യ-സാംസ്കാരിക പരിപാടികൾ സംഘടിപ്പിക്കുക",
              "എല്ലാവർക്കും അറിവിന്റെ അവസരം ഒരുക്കുക"
            ].map((goal, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm sm:text-base font-bold text-slate-800">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 3 – ഞങ്ങളുടെ ശേഖരം (Our Collection)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] border-b-2 border-slate-100 pb-3">
            ഞങ്ങളുടെ ശേഖരം
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Malayalam Collection */}
            <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="font-extrabold text-base text-[#064e3b] border-b border-emerald-200 pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>മലയാളം പുസ്തക വിഭാഗങ്ങൾ</span>
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-slate-800 list-disc pl-4">
                <li>നോവൽ</li>
                <li>ചെറുകഥ</li>
                <li>കവിത</li>
                <li>ജീവചരിത്രം</li>
                <li>ആത്മകഥ</li>
                <li>ചരിത്രം</li>
                <li>ശാസ്ത്രം</li>
                <li>പൊതുവിജ്ഞാനം</li>
                <li>ആരോഗ്യം</li>
                <li>കൃഷി</li>
                <li>മതം & തത്വചിന്ത</li>
                <li>കുട്ടികളുടെ സാഹിത്യം</li>
              </ul>
            </div>

            {/* English Collection */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-amber-700" />
                <span>English Books</span>
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-slate-800 list-disc pl-4">
                <li>Fiction</li>
                <li>Non-fiction</li>
                <li>Biography</li>
                <li>History</li>
                <li>Science</li>
                <li>Reference</li>
                <li>Children's Books</li>
              </ul>
            </div>

          </div>

          {/* Special Sections */}
          <div className="pt-2">
            <h4 className="font-bold text-sm text-slate-900 mb-3">
              ലൈബ്രറിയിലെ മറ്റ് പ്രത്യേക വിഭാഗങ്ങൾ:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                "കുട്ടികളുടെ കോർണർ",
                "യുവജന വിഭാഗം",
                "മത്സരപരീക്ഷ വിഭാഗം",
                "റഫറൻസ് വിഭാഗം",
                "പത്ര-ആനുകാലിക വിഭാഗം",
                "ഡിജിറ്റൽ വിഭവങ്ങൾ"
              ].map((sec, idx) => (
                <div key={idx} className="bg-slate-100 p-2.5 rounded-lg text-center text-xs sm:text-sm font-bold text-slate-800 border border-slate-200">
                  {sec}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ===================================================================
          SECTION 4 – ലൈബ്രറി സേവനങ്ങൾ (Library Services)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b] border-b-2 border-slate-100 pb-3">
            ലൈബ്രറി സേവനങ്ങൾ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "പുസ്തകങ്ങൾ വായിക്കാം",
              "പുസ്തകങ്ങൾ വീട്ടിലേക്ക് കൊണ്ടുപോകാം",
              "റഫറൻസ് പുസ്തകങ്ങൾ ഉപയോഗിക്കാം",
              "പത്രങ്ങളും മാസികകളും വായിക്കാം",
              "വിദ്യാർത്ഥികൾക്ക് പഠനസൗകര്യം ലഭിക്കും",
              "കുട്ടികൾക്കായുള്ള വായനാ പരിപാടികൾ",
              "സാഹിത്യ-സാംസ്കാരിക പരിപാടികളിൽ പങ്കെടുക്കാം"
            ].map((service, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-[#064e3b] shrink-0"></span>
                <span className="text-sm sm:text-base font-bold text-slate-800">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 5 – കുട്ടികൾക്കും വിദ്യാർത്ഥികൾക്കും (For Children & Students)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-slate-100 pb-3">
            <GraduationCap className="w-7 h-7 text-[#064e3b]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
              കുട്ടികൾക്കും വിദ്യാർത്ഥികൾക്കും
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            കുട്ടികളുടെയും വിദ്യാർത്ഥികളുടെയും ബൗദ്ധിക വളർച്ചയ്ക്ക് ലൈബ്രറി പ്രത്യേക പ്രാധാന്യം നൽകുന്നു. കഥാപുസ്തകങ്ങൾ, ശാസ്ത്ര പുസ്തകങ്ങൾ, മത്സരപരീക്ഷാ സഹായികൾ, ആനുകാലിക വിവരങ്ങൾ, കരിയർ ഗൈഡൻസ് സൗകര്യങ്ങൾ എന്നിവയോടൊപ്പം ശാന്തമായ പഠനാന്തരീക്ഷവും ഇവിടെ ഒരുക്കിയിട്ടുണ്ട്.
          </p>

          <div className="pt-2">
            <h4 className="font-bold text-sm text-slate-900 mb-3">
              കുട്ടികൾക്കായുള്ള പ്രവർത്തനങ്ങൾ:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                "കഥപറച്ചിൽ",
                "ചിത്രരചന",
                "വായനാ മത്സരം",
                "ക്വിസ്",
                "നാടകം",
                "പ്രസംഗ മത്സരം"
              ].map((act, idx) => (
                <div key={idx} className="bg-amber-50 p-2.5 rounded-lg text-center text-xs sm:text-sm font-bold text-amber-950 border border-amber-200">
                  {act}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 6 – അംഗമാകാൻ ആരെല്ലാം? (Who Can Become a Member?)
          =================================================================== */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-emerald-200 pb-3">
            <HeartHandshake className="w-7 h-7 text-[#064e3b]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064e3b]">
              അംഗമാകാൻ ആരെല്ലാം?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-800 font-semibold">
            നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറിയിലെ അംഗത്വം എല്ലാവർക്കുമായി തുറന്നിരിക്കുന്നു:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              "കുട്ടികൾ",
              "വിദ്യാർത്ഥികൾ",
              "യുവാക്കൾ",
              "മുതിർന്നവർ",
              "അധ്യാപകർ",
              "ജീവനക്കാർ",
              "വീട്ടമ്മമാർ",
              "മുതിർന്ന പൗരന്മാർ",
              "വായനയിൽ താൽപര്യമുള്ള എല്ലാവരും"
            ].map((cat, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl text-center text-xs sm:text-sm font-bold text-slate-900 border border-emerald-200 shadow-2xs">
                {cat}
              </div>
            ))}
          </div>

          <div className="pt-4 text-center border-t border-emerald-200">
            <p className="text-base sm:text-lg font-extrabold text-[#064e3b] mb-3">
              താഴെയുള്ള അപേക്ഷാ ഫോം പൂരിപ്പിച്ച് അംഗമാകാം.
            </p>
            <button
              onClick={scrollToForm}
              className="bg-[#064e3b] hover:bg-[#043c2e] text-white font-extrabold text-sm sm:text-base py-3 px-8 rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
            >
              <span>അപേക്ഷാ ഫോമിലേക്ക് പോകാം</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 7 – അപേക്ഷാ ഫോം (One Single Box Application Form)
          =================================================================== */}
      <section id="apply-form" className="max-w-3xl mx-auto px-4 scroll-mt-24">
        <ApplicationForm />
      </section>

    </div>
  );
}
