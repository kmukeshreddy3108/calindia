/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, Trash2, Calendar, FileSymlink, Tag } from 'lucide-react';
import { useHistoryContext } from '../../context/HistoryContext';
import { useNavigate } from 'react-router-dom';
import { formatToLakhCrore } from '../../utils/formatters';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, onRestore }) => {
  const { history, deleteEntry, clearHistory, renameEntry } = useHistoryContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleRestore = (item: any) => {
    // Navigate to the calculator URL with state containing inputs, allowing instant automatic load
    const urlMap = {
      emi: '/emi-calculator',
      sip: '/sip-calculator',
      fd: '/fd-calculator',
      gst: '/gst-calculator',
      ci: '/compound-interest-calculator',
    };
    navigate(urlMap[item.type], { state: { restoreInputs: item.inputs } });
    onRestore();
    onClose();
  };

  const handleRename = (id: string, currentLabel: string) => {
    const newLabel = prompt('Enter a custom label for this calculation:', currentLabel);
    if (newLabel !== null) {
      renameEntry(id, newLabel.trim() || currentLabel);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-all duration-300 bg-white dark:bg-slate-850 shadow-2xl flex flex-col border-l border-slate-100 dark:border-slate-700">
          
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/40">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 font-display">
                Calculation Audit Trail
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Your last {history.length} calculations are auto-stored
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 gap-4 flex flex-col">
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-750 bg-slate-50/50 dark:bg-slate-800/45 hover:border-brand-primary/30 dark:hover:border-brand-primary/45 transition-all group relative flex flex-col justify-between gap-3 overflow-hidden"
                >
                  {/* Decorative tag for type color */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      item.type === 'emi'
                        ? 'bg-blue-500'
                        : item.type === 'sip'
                        ? 'bg-brand-accent'
                        : item.type === 'fd'
                        ? 'bg-purple-500'
                        : item.type === 'gst'
                        ? 'bg-amber-500'
                        : 'bg-indigo-500'
                    }`}
                  />

                  <div className="pl-1">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                          {item.type.toUpperCase()} CALCULATOR
                        </span>
                        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-0.5">
                          {item.label}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleRename(item.id, item.label)}
                          className="p-1 text-slate-400 hover:text-brand-primary rounded"
                          title="Rename audit entry"
                        >
                          <Tag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteEntry(item.id)}
                          className="p-1 text-slate-400 hover:text-red-500 rounded"
                          title="Remove from logs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Show brief values depending on type */}
                    <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono border-t border-slate-100 dark:border-slate-750 pt-2 text-slate-550 dark:text-slate-400">
                      {item.type === 'emi' && (
                        <>
                          <div>Prin: <b className="text-slate-700 dark:text-slate-200">{formatToLakhCrore(Number(item.inputs.principal || 0))}</b></div>
                          <div>EMI: <b className="text-brand-primary font-bold">{formatToLakhCrore(Number(item.results.emi || 0))}</b></div>
                        </>
                      )}
                      {item.type === 'sip' && (
                        <>
                          <div>Inst: <b className="text-slate-700 dark:text-slate-200">{formatToLakhCrore(Number(item.inputs.monthlyAmount || 0))}</b></div>
                          <div>Maturity: <b className="text-brand-accent font-bold">{formatToLakhCrore(Number(item.results.futureValue || 0))}</b></div>
                        </>
                      )}
                      {item.type === 'fd' && (
                        <>
                          <div>FD: <b className="text-slate-700 dark:text-slate-200">{formatToLakhCrore(Number(item.inputs.principal || 0))}</b></div>
                          <div>Maturity: <b className="text-purple-500 font-bold">{formatToLakhCrore(Number(item.results.maturityAmount || 0))}</b></div>
                        </>
                      )}
                      {item.type === 'gst' && (
                        <>
                          <div>Base: <b className="text-slate-700 dark:text-slate-200">{formatToLakhCrore(Number(item.inputs.amount || 0))}</b></div>
                          <div>Total: <b className="text-amber-500 font-bold">{formatToLakhCrore(Number(item.results.totalAmount || 0))}</b></div>
                        </>
                      )}
                      {item.type === 'ci' && (
                        <>
                          <div>Principal: <b className="text-slate-700 dark:text-slate-200">{formatToLakhCrore(Number(item.inputs.principal || 0))}</b></div>
                          <div>CI Value: <b className="text-indigo-500 font-bold">{formatToLakhCrore(Number(item.results.amount || 0))}</b></div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer links */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pl-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleRestore(item)}
                      className="flex items-center gap-1 font-bold text-brand-primary dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      <FileSymlink className="w-3.5 h-3.5" />
                      Restore Inputs
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 dark:text-slate-500">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-full mb-3">
                  <Calendar className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  No Calculations Yet
                </h4>
                <p className="text-xs max-w-xs mt-1">
                  Perform some calculations on any financial utility to accumulate a timeline here automatically.
                </p>
              </div>
            )}
          </div>

          {/* Wiping controls */}
          {history.length > 0 && (
            <div className="p-4 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => {
                  if (confirm('Clear entire computation logs? This is irreversible.')) {
                    clearHistory();
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-950/40 dark:text-red-400 dark:hover:bg-red-950/20 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Flush Calculation Audit
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default HistoryDrawer;
