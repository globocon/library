import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import Image from 'next/image';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#022c22] text-slate-100 pt-12 pb-10 border-t-4 border-[#059669]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Official Brand Logo & Location */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs">
              <Image 
                src="/logo.png" 
                alt="നെടുങ്കണ്ടം പബ്ലിക് ലൈബ്രറി ലോഗോ" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {LIBRARY_CONFIG.name}
            </h3>
          </div>
          <p className="text-sm text-emerald-200 font-medium">
            {LIBRARY_CONFIG.location}
          </p>
        </div>

        {/* Timings & Location Badges */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{LIBRARY_CONFIG.location}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-slate-700">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>പ്രവർത്തന സമയം: 3:00 PM – 8:00 PM</span>
          </div>
        </div>

        {/* Contact / Call Button (Displays 'ബന്ധപ്പെടുക' and links to tel:9446823434) */}
        <div className="pt-1">
          <a
            href="tel:9446823434"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-400/40"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0 fill-amber-300/20" />
            <span>ബന്ധപ്പെടുക</span>
          </a>
        </div>

        {/* Vision Quote & Copyright */}
        <div className="pt-4 border-t border-emerald-900/60 space-y-2">
          <p className="text-xs sm:text-sm font-bold text-amber-300">
            “{LIBRARY_CONFIG.vision}”
          </p>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {LIBRARY_CONFIG.name}. {LIBRARY_CONFIG.subTagline}
          </p>
        </div>

      </div>
    </footer>
  );
}
