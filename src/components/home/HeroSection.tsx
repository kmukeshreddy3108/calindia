/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calculator, Shield, Eye, Flame, Check } from 'lucide-react';
import { CALCULATORS } from '../../data/calculators';

export const HeroSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() === '') return;

    // Direct auto match if exact query keyword matches a calculator id or label
    const query = search.toLowerCase();
    const found = CALCULATORS.find(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.keywords.some((k) => k.toLowerCase() === query)
    );

    if (found) {
      navigate(found.slug);
    }
  };

  const filtered = search.trim() === ''
    ? []
    : CALCULATORS.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
      ).slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/40 select-none pb-12 pt-16 sm:pb-20 sm:pt-24 lg:pt-32">
      {/* Decorative background radial grids */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        {/* Decorative Badge tag */}
        <div className="mx-auto max-w-max px-3 py-1 bg-blue-500/10 text-brand-primary dark:bg-blue-500/20 dark:text-blue-400 text-xs font-extrabold rounded-full tracking-wider uppercase flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
          100% Free Smart Simulations
        </div>

        {/* H1 Primary Header */}
        <h1 className="mt-6 text-3xl font-extrabold sm:text-5xl font-display leading-[1.1] tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto select-text">
          India's Most Precision-Engineered <span className="text-brand-primary">Financial Calculators</span>
        </h1>

        {/* Subhead descriptor */}
        <p className="mt-4.5 text-sm sm:text-base text-slate-550 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-semibold select-text">
          Make wiser investment, loan, and tax planning choices in seconds. Compare mutual fund systematic steps (SIP), credit amortization schedules, bank fixed deposits, and GST slabs with high-contrast charts.
        </p>

        {/* Dynamic Search Box Form widget */}
        <form onSubmit={handleSearchSubmit} className="mt-8.5 max-w-xl mx-auto relative select-text pl-1 pr-1">
          <div className="relative flex items-center bg-slate-50 dark:bg-slate-805 rounded-2xl border border-slate-200/75 dark:border-slate-700/60 p-1.5 focus-within:ring-2 focus-within:ring-brand-primary/20 shadow-lg shadow-slate-200/40 dark:shadow-none transition-all">
            <Search className="w-5 h-5 text-slate-400 ml-3 pointer-events-none select-none" />
            <input
              type="text"
              className="w-full bg-transparent border-0 py-2.5 pl-3.5 pr-20 text-sm font-semibold text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              placeholder="Search e.g. sip, emi home loan, gst, fd yield..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-brand-primary hover:bg-brand-primary-dark text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/15 cursor-pointer hover:-translate-y-0.5 select-none"
            >
              Analyze
            </button>
          </div>

          {/* Quick Search autocomplete dropdown list */}
          {filtered.length > 0 && (
            <div className="absolute top-full left-1.5 right-1.5 mt-2.5 bg-white dark:bg-slate-850 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-705 p-2 gap-1 flex flex-col z-35 text-left animate-scaleIn">
              {filtered.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => handleNavigateHelper(calc.slug)}
                  className="w-full text-left py-2.5 px-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${calc.bgClass} ${calc.colorClass}`}>
                      <Calculator className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-blue-400">
                      {calc.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:block hidden uppercase">
                    Launch Calculator &rarr;
                  </span>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Quick Access recommendation tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4 select-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            Frequent:
          </span>
          {CALCULATORS.slice(0, 3).map((calc) => (
            <button
              key={calc.id}
              onClick={() => navigate(calc.slug)}
              className="px-3.5 py-1.5 bg-slate-50 border border-slate-200/50 dark:bg-slate-850 dark:border-slate-750 rounded-full text-xs font-bold text-slate-650 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer hover:border-slate-300 dark:hover:border-slate-700"
            >
              {calc.shortName}
            </button>
          ))}
        </div>

        {/* Animated trust indicators */}
        <div className="mt-14 sm:mt-18 border-t border-slate-150 dark:border-slate-800/50 pt-8 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 select-none pl-2 pr-2">
          <div className="text-center font-semibold">
            <span className="text-lg sm:text-xl font-extrabold font-mono text-brand-primary block">
              0% Complex
            </span>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">
              No forms, No log-ins
            </span>
          </div>
          <div className="text-center font-semibold">
            <span className="text-lg sm:text-xl font-extrabold font-mono text-brand-accent block">
              100% Client-Side
            </span>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">
              No API, no leaks
            </span>
          </div>
          <div className="text-center font-semibold">
            <span className="text-lg sm:text-xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 block">
              Dual Modes
            </span>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">
              Light & slate dark configs
            </span>
          </div>
          <div className="text-center font-semibold">
            <span className="text-lg sm:text-xl font-extrabold font-mono text-purple-600 block">
              PDF Export
            </span>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">
              Amortization summary reports
            </span>
          </div>
        </div>

      </div>
    </section>
  );

  function handleNavigateHelper(slug: string) {
    navigate(slug);
    setSearch('');
  }
};
export default HeroSection;
