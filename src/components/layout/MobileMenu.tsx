/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Calculator, TrendingUp, PiggyBank, PercentSquare, Percent, Home, FileText, Info } from 'lucide-react';
import { CALCULATORS } from '../../data/calculators';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const iconMap = {
    Percent,
    TrendingUp,
    PiggyBank,
    Calculator,
    PercentSquare,
  };

  const renderIcon = (name: keyof typeof iconMap) => {
    const IconComponent = iconMap[name];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-100 dark:border-slate-800 animate-slide-up select-none">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-805 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
            <span className="text-sm font-extrabold tracking-wide text-slate-800 dark:text-white font-display uppercase">
              Directory
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-150 dark:hover:bg-slate-850"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list */}
          <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
            {/* Core static links */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigate('/')}
                className="flex items-center gap-3 py-2 px-2 rounded-xl text-sm font-semibold text-slate-705 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left w-full cursor-pointer"
              >
                <Home className="w-5 h-5 text-brand-primary" />
                Home Dashboard
              </button>
              <button
                onClick={() => handleNavigate('/blog')}
                className="flex items-center gap-3 py-2 px-2 rounded-xl text-sm font-semibold text-slate-705 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left w-full cursor-pointer"
              >
                <FileText className="w-5 h-5 text-brand-accent" />
                Learning Blog
              </button>
              <button
                onClick={() => handleNavigate('/about')}
                className="flex items-center gap-3 py-2 px-2 rounded-xl text-sm font-semibold text-slate-705 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left w-full cursor-pointer"
              >
                <Info className="w-5 h-5 text-purple-500" />
                About Us
              </button>
            </div>

            {/* Calculators links */}
            <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase px-2">
                Simulations & Calculators
              </span>
              <div className="flex flex-col gap-1 mt-1">
                {CALCULATORS.map((calc) => (
                  <button
                    key={calc.id}
                    onClick={() => handleNavigate(calc.slug)}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-left w-full group"
                  >
                    <div className={`p-1.5 rounded-lg ${calc.bgClass} ${calc.colorClass}`}>
                      {renderIcon(calc.iconName)}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-blue-450">
                      {calc.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer inside mobile menu */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-805 text-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
              FinCalc India • Offline Persistent
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
