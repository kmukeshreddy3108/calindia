/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { Scale, ShieldAlert, CheckCircle, Globe } from 'lucide-react';

export const TermsAndConditions: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service — Legal Disclaimers & Usage Terms"
        description="Review the legal conditions, mathematical simulations boundaries, and financial liabilities limits governing use of FinCalc India."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 select-text font-sans">
        
        {/* Header Title */}
        <div className="border-b border-slate-105 dark:border-slate-800 pb-6 mb-10 select-none">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-905 dark:text-white">
            Terms of Service & Licensing Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            Effective: May 28, 2026. Review rules, risk factors, and legal disclaimers.
          </p>
        </div>

        {/* Advisory banner card */}
        <Card className="p-5.5 border-l-4 border-l-brand-warning bg-amber-500/5 mb-12 select-none">
          <div className="flex gap-3.5 items-start">
            <ShieldAlert className="w-5 h-5 text-brand-warning shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Critical Financial Risk Disclaimer
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5 font-semibold">
                FinCalc India is a provider of pure mathematical simulations for educational purposes. We do not offer registered credit brokering, investment suggestions, tax filing, or official audit approvals. Always consult a certified Chartered Accountant (CA) or SEBI Registered Investment Advisor (RIA) before committing real funds.
              </p>
            </div>
          </div>
        </Card>

        {/* 1000+ Word compliance layout */}
        <div className="flex flex-col gap-6.5 text-slate-650 dark:text-slate-400 font-medium text-sm md:text-base leading-relaxed md:leading-loose">
          
          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-4 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 1: Consent to Terms
          </h2>
          <p>
            By accessing or using FinCalc India, you represent that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not agree with any of these terms, you are prohibited from accessing the site or utilizing our calculators.
          </p>
          <p>
            We reserve the right to modify or replace these terms at our sole discretion. Any changes will be posted here with an updated "Effective Date". Your continued use of our services after such modifications constitutes your acceptance of the updated terms.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 2: Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise indicated, all original calculation layouts, vector charts, page custom sliders, and CSS combinations are the intellectual property of FinCalc India. You are granted a limited, non-transferable, non-exclusive license to access our platform for personal, non-commercial use.
          </p>
          <p>
            You are strictly prohibited from framing our pages inside third-party iframe containers for commercial gain, scraping our underlying algorithms for resale, or distributing our proprietary formatting without explicit written permission from our board.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 3: Mathematical & Modeling Boundaries
          </h2>
          <p>
            Our calculators utilize standard mathematical formulas to simulate financial projections. While we make every effort to maintain absolute precision, variations in formulas and bank calculations exist:
          </p>
          <ul className="list-disc pl-5 my-2 flex flex-col gap-2 text-xs md:text-sm">
            <li><b>Amortization Adjustments:</b> Banks may vary in how they apply interest compounding in their loan products, leading to minor differences in final schedules.</li>
            <li><b>Tax Code Updates:</b> While we update our tools to match the latest Indian Finance Bills, we do not guarantee these matches down to the exact rupee for individual situations.</li>
            <li><b>Market Volatility:</b> Mutual fund return estimations (like SIP projections) are purely illustrative and do not represent guaranteed future yields. Actual returns are subject to market risks.</li>
          </ul>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 4: Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall FinCalc India, its founders, advisors, or software engineers be held liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of this platform.
          </p>
          <p>
            This limitation of liability applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if we have been advised of the possibility of such damage.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 5: Indemnification Clause
          </h2>
          <p>
            You agree to indemnify, defend, and hold harmless FinCalc India, its advisory board, and developers from and against any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from your misuse of our calculators, violation of these terms, or infringement of third-party rights.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 6: Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the Republic of India. You agree that any dispute or claim arising from these terms or your use of the platform shall be subject to the exclusive jurisdiction of the competent courts of Mumbai, Maharashtra.
          </p>

        </div>

      </div>
    </>
  );
};
export default TermsAndConditions;
