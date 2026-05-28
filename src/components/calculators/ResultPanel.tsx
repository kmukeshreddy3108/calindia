/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ResultCard } from './ResultCard';
import { useClipboard } from '../../hooks/useClipboard';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useHistoryContext } from '../../context/HistoryContext';
import { formatIndianCurrency } from '../../utils/formatters';
import { CalculatorType } from '../../types';
import { Share2, Download, BookmarkPlus, Sparkles } from 'lucide-react';

interface MetricItem {
  label: string;
  value: number;
  colorType?: 'primary' | 'accent' | 'warning' | 'indigo' | 'slate';
}

interface ResultPanelProps {
  type: CalculatorType;
  inputs: Record<string, number | string | boolean>;
  results: Record<string, number | string | boolean>;
  mainValue: number;
  mainLabel: string;
  secondaryMetrics: MetricItem[];
  chartComponent: React.ReactNode;
  fileNamePre: string;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({
  type,
  inputs,
  results,
  mainValue,
  mainLabel,
  secondaryMetrics,
  chartComponent,
  fileNamePre,
}) => {
  const { copy } = useClipboard();
  const { exportPDF, isExporting } = usePDFExport();
  const { addToHistory } = useHistoryContext();

  const handleShare = () => {
    // Sharing simulation URL containing inputs in hash state or path
    const url = window.location.href;
    copy(url, 'Link copy success! Share it with friends or clients.');
  };

  const handleSaveHistory = () => {
    const formattedDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const label = `${type.toUpperCase()} calc at ${formattedDate}`;
    addToHistory(type, inputs, results, label);
  };

  return (
    <Card
      id={`result-panel-wrap-${type}`}
      paddingSize="lg"
      className="shadow-xl bg-slate-900 border-slate-800 text-white p-6 sm:p-8 flex flex-col gap-6 select-text overflow-hidden relative"
    >
      {/* Visual background ambient details */}
      <div className="absolute right-0 top-0 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-10 bottom-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main calculation indicator card */}
      <div className="text-center py-4 flex flex-col items-center justify-center border-b border-slate-800 pb-6 relative z-10 select-text">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          {mainLabel}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white mt-1.5 animate-fadeIn select-text">
          {formatIndianCurrency(mainValue, 0)}
        </h2>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-primary animate-pulse" />
          Accurate Indian Projection
        </span>
      </div>

      {/* Secondary split metrics display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
        {secondaryMetrics.map((met, idx) => (
          <ResultCard
            key={idx}
            label={met.label}
            value={met.value}
            colorType={met.colorType || 'slate'}
          />
        ))}
      </div>

      {/* Visual Chart Area */}
      <div className="bg-slate-950/45 dark:bg-slate-950 border border-slate-800/80 rounded-2xl p-4.5 py-6.5 relative z-10 shadow-inner">
        <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase text-center mb-2">
          Breakdown distribution chart
        </h4>
        {chartComponent}
      </div>

      {/* Quick Utility Actions Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2 relative z-10 no-print">
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex-1 hover:bg-slate-800 text-white border-slate-700/80 hover:border-slate-600 gap-1.5 text-xs font-bold"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share Results
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSaveHistory}
          className="flex-1 hover:bg-slate-800 text-white border-slate-700/80 hover:border-slate-600 gap-1.5 text-xs font-bold"
        >
          <BookmarkPlus className="w-3.5 h-3.5 text-brand-primary" />
          Save Audit Link
        </Button>
      </div>

      {/* PDF Export Banner */}
      <div className="relative z-10 border-t border-slate-800/80 pt-4.5">
        <Button
          variant="accent"
          size="md"
          fullWidth
          disabled={isExporting}
          onClick={() => exportPDF(`result-panel-wrap-${type}`, fileNamePre)}
          className="text-xs sm:text-sm font-bold tracking-wide uppercase gap-2 cursor-pointer no-print py-3 rounded-xl bg-brand-accent hover:bg-brand-accent-dark border-none"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Generating Report PDF...' : 'Download Full Report PDF'}
        </Button>
      </div>

    </Card>
  );
};
export default ResultPanel;
