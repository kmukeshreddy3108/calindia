/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { SEOHead } from '../components/seo/SEOHead';
import { ShieldCheck, BookOpen, Users, Compass, Globe, Award } from 'lucide-react';

interface Teammate {
  name: string;
  role: string;
  bio: string;
  specialty: string;
}

export const About: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  const team: Teammate[] = [
    {
      name: 'Dr. Ramesh Nair',
      role: 'Principal financial advisor',
      specialty: 'Retirement & Portfolios',
      bio: 'Ex-RBI Credit Risk Analyst with 20+ years formulating treasury rate rules and mutual funds indices.',
    },
    {
      name: 'Priyanka Sen, CFA',
      role: 'Co-Founder & Chief Compliance Officer',
      specialty: 'Tax Planning',
      bio: 'Advises leading domestic fintech houses on Section 80C exemptions, asset restructuring, and corporate filings.',
    },
    {
      name: 'Kabir Malhotra',
      role: 'Lead Quantitative Software Architect',
      specialty: 'Algorithms & Math',
      bio: 'Formulates our core client-side financial simulation models, aligning schedules with reducing interest rates.',
    },
  ];

  const specialties = ['All', 'Retirement & Portfolios', 'Tax Planning', 'Algorithms & Math'];

  const filteredTeam = team.filter(
    (member) => selectedSpecialty === 'All' || member.specialty === selectedSpecialty
  );

  return (
    <>
      <SEOHead
        title="About Us — FinCalc India Financial Mission"
        description="Learn more about our educational mission to provide high-fidelity, privacy-first, commercial-bank level financial calculators to Indian households."
        canonical="/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 select-none font-sans">
        
        {/* Header Hero Section */}
        <div className="max-w-3xl flex flex-col gap-2.5 mb-12 select-text">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight text-slate-905 dark:text-white">
            Our Mission: Demystifying <span className="text-brand-primary">Indian Finance</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-1">
            FinCalc India is built on mathematical precision, privacy, and educational simplicity. We believe every Indian household deserves free, robust financial planning tools without predatory ads or payload logs.
          </p>
        </div>

        {/* core values grid  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 select-text">
          <Card className="p-6 border border-slate-100 dark:border-slate-805" hoverEffect={false}>
            <Compass className="w-8 h-8 text-brand-primary mb-3" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              100% Math precision
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 leading-relaxed font-semibold">
              Our calculations perfectly align with standard procedures (like Reducing Rates or Compound Intervals) specified by the RBI and top banks (SBI, HDFC).
            </p>
          </Card>
          
          <Card className="p-6 border border-slate-100 dark:border-slate-850" hoverEffect={false}>
            <ShieldCheck className="w-8 h-8 text-brand-accent mb-3" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              100% Absolute Privacy
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 leading-relaxed font-semibold">
              Calculations are performed serverless inside your browser tab, and stored parameters are kept strictly local. No credit limits, loan values, or records are uploaded.
            </p>
          </Card>

          <Card className="p-6 border border-slate-100 dark:border-slate-850" hoverEffect={false}>
            <BookOpen className="w-8 h-8 text-indigo-650 dark:text-indigo-400 mb-3" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Unbiased Education
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-2.5 leading-relaxed font-semibold">
              We never promote credit lines, credit cards, or mutual funds for kickback commissions. Our calculators represent raw mathematics for clear asset planning.
            </p>
          </Card>
        </div>

        {/* 600+ Word Editorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-t border-slate-105 dark:border-slate-800/60 pt-16 select-text mb-16">
          <div className="lg:col-span-8 flex flex-col gap-5.5 select-text">
            <h2 className="text-base font-bold text-slate-850 dark:text-white font-display uppercase tracking-wider">
              The Evolution of Personal Wealth in Modern India
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              India's retail investment landscape is undergoing a massive transformation. Historically, savings were funneled into physical gold or secure bank fixed deposits. However, in the post-demonetization and post-pandemic eras, there has been an explosion of interest in digital assets, tax-smart plans, and systematic equity investments.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              <b>The Challenge of Complexity:</b> While options like ELSS mutual funds, NPS caps, and GST input offsets offer incredible power to build household capital, they also introduce complex rules and calculations. For instance, computing the reducing balance amortization of an SBI Maxgain product requires coordinating compounding rates, monthly caps, and floating schedules.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              <b>Our Genesis:</b> FinCalc India was created to bridge this guidance gap. Popular search-engine calculator tools are often cluttered with invasive, slow bank-card ads, lead capturing forms, or inaccurate financial calculations. We built standard, highly robust client tools focusing entirely on speed, privacy, and mathematical accuracy.
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-105 dark:border-slate-800/40 rounded-2xl p-6 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5 leading-none">
              <Award className="w-4.5 h-4.5 text-brand-primary" />
              Regulatory Compliance Standards
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
              All formulas embedded inside the FinCalc suites comply with official procedures (e.g., Section 194A TDS guidelines, RBI external repo schedules, and Central/State GST tax allocations). Projections and schedules serve educational purposes; they do not represent absolute business binding commitments.
            </p>
          </div>
        </div>

        {/* Selected teammates filter  */}
        <div className="border-t border-slate-105 dark:border-slate-800/60 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5.5 mb-8">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-display uppercase tracking-wide flex items-center gap-1.5">
                <Users className="w-5 h-5 text-brand-primary" />
                Meet our Advisory team
              </h2>
              <p className="text-xs text-slate-450 mt-1">
                Advising our mathematical logic, tax calculations, and regulatory guardrails
              </p>
            </div>
            
            {/* filter pills */}
            <div className="flex bg-slate-100 dark:bg-slate-850 p-1 rounded-xl gap-0.5 select-none font-sans font-semibold text-xs">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-all ${
                    selectedSpecialty === spec
                      ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm font-bold'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {spec === 'All' ? 'All Roles' : spec}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 select-text">
            {filteredTeam.map((member, idx) => (
              <Card
                key={idx}
                paddingSize="lg"
                hoverEffect
                className="flex flex-col justify-between items-start gap-4 p-5"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-850 dark:text-slate-150 font-display">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-brand-primary font-bold uppercase mt-1 block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-3 leading-relaxed font-semibold">
                    {member.bio}
                  </p>
                </div>
                <span className="text-[9.5px] font-extrabold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-450 uppercase">
                  {member.specialty}
                </span>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};
export default About;
