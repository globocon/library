'use client';

import { useState } from 'react';
import { Search, Database, Info, Filter } from 'lucide-react';

export default function BookSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('title');

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">പുസ്തകങ്ങൾ തിരയാം</h1>
        <p className="text-xs text-slate-600">
          നിങ്ങൾക്ക് ആവശ്യമുള്ള പുസ്തകം ഗ്രന്ഥശാലയിൽ ഉണ്ടോ എന്ന് ഓൺലൈനായി പരിശോധിക്കാം.
        </p>
      </div>

      {/* Search Architecture UI Form */}
      <div className="custom-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-[#0d5c46]">
          <Filter className="w-4 h-4" />
          <span>തിരയാനുള്ള മാർഗങ്ങൾ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              തിരയുന്ന മേഖല
            </label>
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46] focus:outline-none"
            >
              <option value="title">പുസ്തകത്തിന്റെ പേര്</option>
              <option value="author">എഴുത്തുകാരൻ</option>
              <option value="subject">വിഷയം</option>
              <option value="publisher">പ്രസാധകൻ</option>
              <option value="category">വിഭാഗം</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              അന്വേഷിക്കേണ്ട വാക്ക് (ഉദാഹരണം: “ബാല്യകാലസഖി”)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="പുസ്തകത്തിന്റെ പേരോ എഴുത്തുകാരന്റെ പേരോ നൽകുക..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0d5c46] focus:outline-none"
              />
              <button
                type="button"
                className="btn-primary text-xs px-5 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>തിരയുക</span>
              </button>
            </div>
          </div>
        </div>

        {/* Expected Result Format Explanation from PDF */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-1">
          <div className="font-bold text-slate-700">തിരയുമ്പോൾ ലഭ്യമാകുന്ന വിവരങ്ങൾ:</div>
          <div className="text-slate-600">
            • പേര് • എഴുത്തുകാരൻ • വിഭാഗം • ലഭ്യത (Available / Issued) • പുസ്തക നമ്പർ • സ്ഥാനം
          </div>
        </div>
      </div>

      {/* Honest Catalog Connection Notice (No Fake Books) */}
      <div className="custom-card p-8 text-center space-y-4 bg-amber-50/50 border-amber-200">
        <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
          <Database className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-amber-950">
            ലൈബ്രറി കാറ്റലോഗ് വിവരശേഖരം
          </h2>
          <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed">
            കേരളത്തിലെ ആധുനിക പൊതുഗ്രന്ഥശാല സംവിധാനത്തിൽ OPAC / ഓൺലൈൻ കാറ്റലോഗ് സംവിധാനം ഉൾപ്പെടുത്തുന്ന മാതൃക നിലവിലുണ്ട്. തത്സമയ കാറ്റലോഗ് ഡാറ്റാബേസ് പൂർണ്ണമായി കണക്റ്റ് ചെയ്യുന്ന ഘട്ടത്തിൽ ലൈബ്രറിയിലെ എല്ലാ പുസ്തകങ്ങളുടെയും ലഭ്യത ഇവിടെ തത്സമയം പരിശോധിക്കാം.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-amber-200 text-xs text-amber-900 font-medium shadow-xs">
          <Info className="w-4 h-4 text-amber-600" />
          <span>യഥാർത്ഥ കാറ്റലോഗ് വിവരങ്ങൾ ലഭ്യമാകുന്ന മുറയ്ക്ക് ഇവിടെ അപ്ഡേറ്റ് ചെയ്യുന്നതാണ്.</span>
        </div>
      </div>
    </div>
  );
}
