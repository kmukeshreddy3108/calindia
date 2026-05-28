/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CalculatorType = 'emi' | 'sip' | 'fd' | 'gst' | 'ci';

export interface HistoryItem {
  id: string;
  type: CalculatorType;
  inputs: Record<string, number | string | boolean>;
  results: Record<string, number | string | boolean>;
  timestamp: string;
  label: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: 'Loans' | 'Investments' | 'Tax';
  readTime: string;
  excerpt: string;
  content: string;
  publishDate: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface AmortizationRow {
  period: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}
