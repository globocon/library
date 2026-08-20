import { LIBRARY_CONFIG } from '@/lib/libraryConfig';
import { Laptop, Globe, Smartphone, BookOpen, Search } from 'lucide-react';

export default function DigitalLibraryPage() {
  const services = [
    { title: "Online Catalogue", desc: "പുസ്തക ലഭ്യത ഓൺലൈനായി പരിശോധിക്കാം." },
    { title: "Mobile-friendly Website", desc: "മൊബൈലിലൂടെ എളുപ്പത്തിൽ ഉപയോഗിക്കാവുന്ന വെബ്‌സൈറ്റ്." },
    { title: "Digital Resources", desc: "ഡിജിറ്റൽ പഠന വിഭവങ്ങൾ." },
    { title: "E-books", desc: "തിരഞ്ഞെടുത്ത ഇ-ബുക്കുകളുടെ ലിങ്കുകൾ." },
    { title: "Digital Newspapers", desc: "ഡിജിറ്റൽ ദിനപത്രങ്ങൾ." },
    { title: "Educational Resources", desc: "വിദ്യാഭ്യാസപരമായ ഓൺലൈൻ വിഭവങ്ങൾ." },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center space-y-2">
        <Laptop className="w-10 h-10 text-indigo-700 mx-auto" />
        <h1 className="text-3xl font-bold text-indigo-950">ഡിജിറ്റൽ ലൈബ്രറി</h1>
        <p className="text-xs text-indigo-800">
          കാലത്തിനനുസരിച്ച് ഗ്രന്ഥശാലയെ ഒരു Digital Knowledge Centre ആക്കി വികസിപ്പിക്കുന്നു.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((s, idx) => (
          <div key={idx} className="custom-card p-5 space-y-1">
            <div className="font-bold text-sm text-[#0d5c46]">{s.title}</div>
            <div className="text-xs text-slate-600">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
