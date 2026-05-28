/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck, HelpCircle, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/40 relative z-10 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Intro column */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-3.5">
            <Link to="/" className="flex items-center gap-2 max-w-max">
              <div className="p-1.5 rounded-lg bg-brand-primary text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold font-display text-slate-800 dark:text-white">
                FinCalc <span className="text-brand-accent">India</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Simplifying complex calculations for personal financial planning in India. Easily simulate loans, systematic investments, tax computations, and interest growths.
            </p>
            <div className="flex items-center gap-4 mt-1 text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Free
              </span>
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                No Signup
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                Offline-Safe
              </span>
            </div>
          </div>

          {/* Calculators links column */}
          <div className="col-span-1 sm:col-span-6 md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-display">
              Calculators Grid
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link to="/emi-calculator" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                • EMI Calculator
              </Link>
              <Link to="/sip-calculator" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                • SIP Calculator
              </Link>
              <Link to="/fd-calculator" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                • FD Calculator
              </Link>
              <Link to="/gst-calculator" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                • GST Calculator
              </Link>
              <Link to="/compound-interest-calculator" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                • Compound Growth
              </Link>
            </div>
          </div>

          {/* Information Links */}
          <div className="col-span-1 sm:col-span-6 md:col-span-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-display">
              Resources & Privacy
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/blog" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                Learning Blog
              </Link>
              <Link to="/about" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                About Platform
              </Link>
              <Link to="/contact" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                Contact Desk
              </Link>
              <Link to="/privacy-policy" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-blue-450 transition-colors col-span-2">
                Terms & Conditions
              </Link>
            </div>
          </div>

        </div>

        {/* Regulatory Warnings / Disclaimers */}
        <div className="mt-10 pt-8 border-t border-slate-200/50 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs leading-relaxed flex flex-col gap-3">
          <p>
            <b>Disclaimer:</b> FinCalc India is an independent learning widget resource platform. Mutual fund systematic investment plans (SIP), fixed deposits (FD), compound growth schedules, and home or vehicle loan amortization computations shown here are simulations and mathematical estimates based on current mathematical conventions. All final banking loans rates, tax obligations, and interest returns are subject to structural agreements and RBI directives. Users must verify matching amortization sheets with chartered accounts or bank executives before signing instruments.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-3 gap-3 border-t border-slate-200/30 dark:border-slate-800/35 pt-4 text-slate-400 text-center sm:text-left">
            <span>© 2026 FinCalc India. All Rights Reserved. Custom built with Google AI Studio.</span>
            <span className="font-semibold text-slate-500 dark:text-slate-450">Verified Indian Standard (Intl. en-IN Locale)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
