/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, HardDrive, RefreshCcw, Download } from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <RefreshCcw className="w-5 h-5 text-brand-primary" />,
      title: 'Reactive Calculations',
      desc: 'Formulas update instantly on the client as you slide rate or tenure variables, giving real-time visualization.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-accent" />,
      title: 'Guaranteed Privacy',
      desc: 'All variables, loan bounds, and returns histories remain 100% client-side in localStorage. Zero metrics are dispatched.',
    },
    {
      icon: <Download className="w-5 h-5 text-purple-600" />,
      title: 'Polished PDF Audits',
      desc: 'Construct clean document summary sheets containing calculated variables, loan schedules, or graphs with a single trigger.',
    },
    {
      icon: <HardDrive className="w-5 h-5 text-indigo-600" />,
      title: 'Persistent Log Trails',
      desc: 'The top audit drawer acts as an index to save, rename, compare, or restore parameters seamlessly.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 select-none border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
          <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
            Designed for Speed and Discretion
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
            FinCalc India combines mathematical accuracy with professional visual details, providing a distraction-free environment.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6.5 mt-12">
          {features.map((feat, idx) => (
            <Card
              key={idx}
              paddingSize="md"
              hoverEffect={false}
              className="bg-slate-50/50 dark:bg-slate-850 border border-slate-200/40 dark:border-slate-750/60 rounded-2xl flex flex-col items-start gap-3 select-text"
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-205 dark:border-slate-700/50">
                {feat.icon}
              </div>
              <h4 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
                {feat.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                {feat.desc}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
export default FeatureSection;
