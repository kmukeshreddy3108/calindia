/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { formatIndianCurrency } from '../../utils/formatters';

interface ResultCardProps {
  label: string;
  value: number;
  colorType?: 'primary' | 'accent' | 'warning' | 'indigo' | 'slate';
  decimals?: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  label,
  value,
  colorType = 'slate',
  decimals = 0,
}) => {
  const borderStyles = {
    primary: 'border-l-blue-500 focus-within:ring-blue-100',
    accent: 'border-l-brand-accent focus-within:ring-emerald-100',
    warning: 'border-l-brand-warning focus-within:ring-orange-100',
    indigo: 'border-l-indigo-600 focus-within:ring-indigo-100',
    slate: 'border-l-slate-400 focus-within:ring-slate-100',
  };

  const textStyles = {
    primary: 'text-brand-primary dark:text-blue-400',
    accent: 'text-brand-accent dark:text-emerald-400',
    warning: 'text-brand-warning dark:text-orange-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    slate: 'text-slate-800 dark:text-slate-100',
  };

  return (
    <div
      className={`bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-4.5 border-l-4 ${borderStyles[colorType]} transition-all animate-fadeIn flex flex-col justify-between`}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <span className={`text-base sm:text-lg font-bold font-mono tracking-tight ${textStyles[colorType]} mt-1`}>
        {formatIndianCurrency(value, decimals)}
      </span>
    </div>
  );
};
export default ResultCard;
