/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorType } from '../types';

export interface CalculatorMeta {
  id: CalculatorType;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  detailedDescription: string;
  iconName: 'Percent' | 'TrendingUp' | 'PiggyBank' | 'Calculator' | 'PercentSquare';
  colorClass: string;
  bgClass: string;
  keywords: string[];
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    shortName: 'EMI',
    slug: '/emi-calculator',
    description: 'Calculate monthly installments for Home Loans, Car Loans, or Personal Loans with amortization schedules.',
    detailedDescription: 'Find your monthly repayments, break down principal vs interest amounts, and see the exact amortized reduction table.',
    iconName: 'Calculator',
    colorClass: 'text-brand-primary',
    bgClass: 'bg-blue-500/10 dark:bg-blue-500/20',
    keywords: ['emi', 'loan', 'home loan', 'personal loan', 'car loan', 'amortization', 'repayment', 'schedule'],
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    shortName: 'SIP',
    slug: '/sip-calculator',
    description: 'Estimate future values and returns of Mutual Fund Systematic Investment Plans (SIP).',
    detailedDescription: 'Project the compounding force of systematic mutual fund investments over time, with year-by-year value projections.',
    iconName: 'TrendingUp',
    colorClass: 'text-brand-accent',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    keywords: ['sip', 'mutual fund', 'invest', 'systematic investment', 'wealth', 'compounding', 'goal', 'recurring'],
  },
  {
    id: 'fd',
    name: 'FD Calculator',
    shortName: 'Fixed Deposit',
    slug: '/fd-calculator',
    description: 'Calculate Fixed Deposit maturity amounts, interest yields, and estimated Indian TDS deductions.',
    detailedDescription: 'Check returns for compounding frequencies (monthly, quarterly, yearly), senior citizen margins, and potential PAN tax deductions.',
    iconName: 'PiggyBank',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-500/10 dark:bg-purple-500/20',
    keywords: ['fd', 'fixed deposit', 'saving', 'interest', 'senior citizen', 'banks', 'tds', 'tax deduction'],
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    shortName: 'GST',
    slug: '/gst-calculator',
    description: 'Instantly add or extract Goods and Services Tax (GST) using any standard Indian slab (5%, 12%, 18%, 28%).',
    detailedDescription: 'Run exclusive (add tax) or inclusive (remove tax) calculations with matching CGST, SGST, and IGST division details.',
    iconName: 'PercentSquare',
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10 dark:bg-amber-500/20',
    keywords: ['gst', 'tax', 'cgst', 'sgst', 'igst', 'billing', 'inclusive', 'exclusive', 'slab'],
  },
  {
    id: 'ci',
    name: 'Compound Interest Calculator',
    shortName: 'CI',
    slug: '/compound-interest-calculator',
    description: 'Discover the power of compounding with customizable interest intervals (daily, weekly, monthly, quarterly).',
    detailedDescription: 'See visual comparisons of Compound Interest versus standard Simple Interest to understand compounding curves.',
    iconName: 'Percent',
    colorClass: 'text-indigo-600',
    bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    keywords: ['compound interest', 'simple interest', 'compounding', 'yield', 'daily compound', 'investment growth'],
  },
];
