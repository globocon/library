'use client';

import Image from 'next/image';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Name (Clicking goes to Home) */}
          <button 
            onClick={() => scrollToSection('home-section')} 
            className="flex items-center gap-2 sm:gap-3 text-left cursor-pointer focus:outline-none min-w-0"
            aria-label="ഹോം പേജിലേക്ക്"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 aspect-square rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden p-0.5 shadow-2xs">
              <Image 
                src="/logo.png" 
                alt="ലോഗോ" 
                width={48} 
                height={48} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-extrabold text-slate-900 text-[13px] sm:text-lg md:text-xl leading-tight truncate">
                നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none mt-0.5">
                ഇടുക്കി, കേരളം
              </span>
            </div>
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Desktop / Tablet 'Home' button */}
            <button
              onClick={() => scrollToSection('home-section')}
              className="hidden sm:inline-flex text-slate-700 hover:text-[#064e3b] font-bold text-sm sm:text-base px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              ഹോം
            </button>

            {/* Primary Action Button (Always visible & fully fitting on all devices) */}
            <button
              onClick={() => scrollToSection('apply-form')}
              className="bg-[#064e3b] hover:bg-[#043c2e] text-white font-extrabold text-xs sm:text-sm py-2 px-3 sm:py-2.5 sm:px-5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              അപേക്ഷാ ഫോം
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
