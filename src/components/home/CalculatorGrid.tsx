/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CALCULATORS } from '../../data/calculators';
import { Card } from '../ui/Card';
import {
  Percent,
  TrendingUp,
  PiggyBank,
  Calculator,
  PercentSquare,
  ArrowRight,
} from 'lucide-react';

export const CalculatorGrid: React.FC = () => {
  const navigate = useNavigate();

  const iconMap = {
    Percent,
    TrendingUp,
    PiggyBank,
    Calculator,
    PercentSquare,
  };

  const renderIcon = (name: keyof typeof iconMap, className: string) => {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50/50 dark:bg-slate-900/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-2.5">
          <h2 className="text-xs font-bold tracking-wider text-brand-primary dark:text-blue-400 uppercase">
            Available Utilities
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
            Simulate Your Indian Financial Roadmap
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Choose a calculator below to run quick mathematical projections. Adjust parameters like tenure, principal, compounding rates, or tax blocks, and get downloadables.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-12">
          {CALCULATORS.map((calc, idx) => (
            <Card
              key={calc.id}
              hoverEffect
              paddingSize="lg"
              className="flex flex-col justify-between items-start gap-5 cursor-pointer relative overflow-hidden group select-none h-62 sm:h-64"
              onClick={() => navigate(calc.slug)}
            >
              {/* Absolutes decorative corner glow */}
              <div className="absolute right-0 top-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:scale-110 transition-transform pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-3.5">
                {/* Icon box */}
                <div className={`p-3 rounded-xl max-w-max ${calc.bgClass} ${calc.colorClass} shadow-inner`}>
                  {renderIcon(calc.iconName, 'w-5 h-5')}
                </div>
                
                {/* Text blocks */}
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150 font-display group-hover:text-brand-primary dark:group-hover:text-blue-450 transition-colors">
                    {calc.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </div>

              {/* Link element */}
              <span className="relative z-10 text-xs font-bold text-brand-primary dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Open Utility
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Card>
          ))}
          
          {/* Mock Coming Soon card to balance grid slots (6 items in bento) */}
          <Card
            hoverEffect={false}
            paddingSize="lg"
            className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-slate-205 dark:border-slate-800 bg-transparent h-62 sm:h-64 text-center p-8 select-none"
          >
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              Pipeline Expansion
            </span>
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-600 mt-1">
              PPF, NPS & Tax Regime Calculators
            </h4>
            <p className="text-[10.5px] text-slate-400 dark:text-slate-650 max-w-[200px] mt-1.5 leading-relaxed">
              We are actively coding standard long-term bond, annuity, and tax-inclusive calculators next.
            </p>
          </Card>
        </div>

      </div>
    </section>
  );
};
export default CalculatorGrid;
