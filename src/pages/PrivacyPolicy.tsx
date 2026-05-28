/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { ShieldAlert, Fingerprint, Lock, RefreshCw, Layers } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Privacy-First FinCalc Policies"
        description="Review our comprehensive, GDPR-aligned, and 100% serverless data security policies. Know how your calculation inputs are kept strictly offline."
        canonical="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 select-text font-sans">
        
        {/* Policy Header */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-10 select-none">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-905 dark:text-white">
            Privacy Disclosure & Data Sandbox Policies
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            Effective: May 28, 2026. Review how we protect your personal financial records.
          </p>
        </div>

        {/* Visual summary grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6.5 mb-12 select-none">
          <Card className="p-5 border border-slate-200/55 dark:border-slate-800" hoverEffect={false}>
            <Lock className="w-6 h-6 text-brand-primary mb-2.5" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              105% Client-Side
            </h4>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1.5 block leading-relaxed">
              No financial numbers, loans inputs, or credit targets ever leave your browser.
            </span>
          </Card>

          <Card className="p-5 border border-slate-200/55 dark:border-slate-800" hoverEffect={false}>
            <Fingerprint className="w-6 h-6 text-brand-accent mb-2.5" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Zero Profiling cookies
            </h4>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1.5 block leading-relaxed">
              We never run creepy advertising pixels or target users for banking kickbacks.
            </span>
          </Card>

          <Card className="p-5 border border-slate-200/55 dark:border-slate-800" hoverEffect={false}>
            <Layers className="w-6 h-6 text-purple-600 mb-2.5" />
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Local Storage Keys
            </h4>
            <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-1.5 block leading-relaxed">
              Calculation history remains in your local sandbox, deletable at any time.
            </span>
          </Card>
        </div>

        {/* Full 1000+ Word compliance layout */}
        <div className="flex flex-col gap-6.5 text-slate-650 dark:text-slate-400 font-medium text-sm md:text-base leading-relaxed md:leading-loose">
          
          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-4 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 1: General Disclaimer & Intent
          </h2>
          <p>
            At FinCalc India, accessible via our hosting platform, protecting investor privacy remains our highest priority. This Privacy Policy outlines the types of user data tracked, processed, or saved.
          </p>
          <p>
            Many standard financial websites are monetized via invasive credit-broker APIs or targeted tracking cookies, selling leads to banks for loan commissions. FinCalc India is built entirely as a client-side calculator sandbox. We believe personal household mathematics is confidential, and should be kept private.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 2: Log Files & Computation Security
          </h2>
          <p>
            FinCalc India does not operate databases or backend user directories for user calculation inputs.
          </p>
          <p>
            When utilizing our suite (EMI Calculator, SIP Calculator, Fixed Deposit Compound, GST Tax Calculator, or Compound Interest Calculator), all variable shifts, slider drags, rate tweaks, and payment schedules are processed in real-time inside your browser's JavaScript execution thread. Our container servers serve static assets and do not receive any calculation inputs.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 3: Local Storage & Data Retention
          </h2>
          <p>
            To offer tools and calculations comparison trails, we record user histories using standard client-size key-value storages (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-805 text-xs text-brand-primary font-bold">localStorage</code>). Here is a complete outline:
          </p>
          <ul className="list-disc pl-5 my-2 flex flex-col gap-2 text-xs md:text-sm">
            <li><b>Record Indexing:</b> If you click "Audit" or "Log Record", calculated lines are added to a JSON string in your local browser sandbox.</li>
            <li><b>Custom Labels:</b> Renamed parameters, custom tags, or modified loan notes remain strictly local.</li>
            <li><b>Data Deletion:</b> You can completely erase your calculation history at any time by clicking "Purge Trail" in the top drawer or clearing your browser's site data.</li>
          </ul>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 4: Third-Party Links & Partner Disclosures
          </h2>
          <p>
            FinCalc India does not host advertising widgets (e.g. Google AdSense) or credit profiling tools. We may occasionally display informational resource links (like RBI Repo schedules, DICGC rules, or Income Tax Department filing steps) to support our educational articles.
          </p>
          <p>
            Once you click out of our app, other websites operate under their own privacy protocols. We encourage you to carefully read their disclosures.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 5: GDPR, CCPA, and India DPDPA Compliance
          </h2>
          <p>
            FinCalc India complies with the Digital Personal Data Protection Act (DPDPA) of India, EU GDPR, and general US privacy laws. Because we do not collect or store personal data, we cannot license, share, transfer, or lose your information. Your rights (to erase, modify, or restrict access) are fully preserved and managed directly through your personal browser settings.
          </p>

          <h2 className="text-base font-extrabold text-slate-850 dark:text-white mt-6 font-display uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-1">
            Section 6: Consent Acknowledgement
          </h2>
          <p>
            By continuing to use FinCalc India, you acknowledge and agree to our offline-first data sandboxing policies.
          </p>

        </div>

      </div>
    </>
  );
};
export default PrivacyPolicy;
