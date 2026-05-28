/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calculator, HelpCircle, BookOpen, AlertCircle, ChevronDown, ListStart } from 'lucide-react';
import { Card } from '../ui/Card';
import { CALCULATORS } from '../../data/calculators';
import { FAQItem } from '../../types';

interface CalculatorLayoutProps {
  id: string;
  name: string;
  description: string;
  formula: {
    latex: string;
    explanation: string;
  };
  inputPanel: React.ReactNode;
  resultPanel: React.ReactNode;
  faqList: FAQItem[];
  seoArticle: React.ReactNode;
  children?: React.ReactNode; // For tables, extra comparisons
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  id,
  name,
  description,
  formula,
  inputPanel,
  resultPanel,
  faqList,
  seoArticle,
  children,
}) => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Filter out current calculator to show other related calculators
  const relatedCalculators = CALCULATORS.filter((c) => c.id !== id).slice(0, 3);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 select-none">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-450 dark:text-slate-500 uppercase tracking-wider select-none pr-1">
        <Link to="/" className="hover:text-brand-primary dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-400 dark:text-slate-500 hover:text-slate-500 transition-all font-bold">
          Calculators
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-700 dark:text-slate-350 select-text">
          {name}
        </span>
      </nav>

      {/* 2. Page Header */}
      <div className="flex flex-col gap-2 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-slate-900 dark:text-white-900 select-text text-slate-900 dark:text-white">
          {name} <span className="text-brand-primary">India</span>
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-medium select-text">
          {description}
        </p>
      </div>

      {/* 3. Core Double-Column Widget Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Input Panel (Left Column - 60% on desktop) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6">
          <Card paddingSize="lg" className="shadow-lg border-slate-100/70 p-6 sm:p-8 flex flex-col gap-6">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-205 border-b border-slate-100 dark:border-slate-700/60 pb-3 flex items-center gap-2">
              <Calculator className="w-4.5 h-4.5 text-brand-primary animate-pulse" />
              Adjust Options
            </h2>
            {inputPanel}
          </Card>
        </div>

        {/* Result & Graph Panel (Right Column - 40% on desktop) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 select-text">
          {resultPanel}
        </div>
      </div>

      {/* 4. Children (For Amortization Schedule tables, Scenarios comparisons) */}
      {children && (
        <div className="w-full mt-2">
          {children}
        </div>
      )}

      {/* 5. How It Works & Mathematical Formula Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-stretch">
        <Card paddingSize="lg" className="col-span-1 md:col-span-12 lg:col-span-12 flex flex-col gap-4 border-l-4 border-l-brand-primary">
          <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2 tracking-wide uppercase">
            <AlertCircle className="w-4.5 h-4.5 text-brand-primary" />
            Formula & Math Reference
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-5 items-center justify-between select-text mt-1">
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {formula.explanation}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-850 p-3 rounded-lg border border-slate-200 dark:border-slate-750 font-mono text-center min-w-[200px] text-xs font-bold text-brand-primary dark:text-blue-400 select-text">
              {formula.latex}
            </div>
          </div>
        </Card>
      </div>

      {/* 6. Long-form SEO Content Area (Rich Article) */}
      <div className="mt-6 border-t border-slate-200/50 dark:border-slate-800/60 pt-10 select-text">
        <div className="prose dark:prose-invert max-w-4xl text-slate-600 dark:text-slate-350 leading-relaxed text-sm md:text-base pr-2">
          <h3 className="text-lg md:text-xl font-extrabold font-display text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-brand-primary" />
            Comprehensive Guide
          </h3>
          {seoArticle}
        </div>
      </div>

      {/* 7. FAQ Accordion widgets */}
      {faqList && faqList.length > 0 && (
        <div className="mt-8 border-t border-slate-200/50 dark:border-slate-800/60 pt-10 select-text">
          <h3 className="text-lg font-extrabold font-display text-slate-800 dark:text-white flex items-center gap-2 mb-6">
            <HelpCircle className="w-5.5 h-5.5 text-brand-primary" />
            Frequently Asked Questions
          </h3>
          <div className="flex flex-col gap-3.5 max-w-4xl">
            {faqList.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200/80 dark:border-slate-850 bg-white dark:bg-slate-800/35 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/20 dark:hover:bg-slate-800/50 transition-colors font-semibold text-slate-805 dark:text-slate-100 text-sm cursor-pointer select-none focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-250 ${activeFAQ === idx ? 'rotate-180 text-brand-primary' : ''}`} />
                </button>
                <div
                  className={`transition-all duration-300 ${
                    activeFAQ === idx ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800 p-5' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Related calculators footer banner */}
      <div className="mt-12 border-t border-slate-200/50 dark:border-slate-800/60 pt-10">
        <h3 className="text-sm font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-display flex items-center gap-1.5 mb-6">
          <ListStart className="w-4 h-4 text-brand-accent" />
          Other Computation Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedCalculators.map((calc) => (
            <Link
              key={calc.id}
              to={calc.slug}
              className="p-4 rounded-2xl border border-slate-1 w-full bg-white dark:bg-slate-800 border-slate-200/55 dark:border-slate-750 hover:shadow-md hover:border-brand-primary/20 dark:hover:border-slate-700 transition-all flex flex-col justify-between items-start gap-3.5 group"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase block">
                  Quick Access
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-blue-400 transition-colors mt-1 font-display">
                  {calc.name}
                </h4>
                <p className="text-[10px] text-slate-450 dark:text-slate-450 leading-relaxed mt-1.5 max-w-sm limit-rows">
                  {calc.description}
                </p>
              </div>
              <span className="text-[10px] font-bold text-brand-primary dark:text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Calculate Now &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};
export default CalculatorLayout;
