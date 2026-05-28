/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CalculatorType, HistoryItem } from '../types';

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (
    type: CalculatorType,
    inputs: Record<string, number | string | boolean>,
    results: Record<string, number | string | boolean>,
    label: string
  ) => void;
  deleteEntry: (id: string) => void;
  clearHistory: () => void;
  renameEntry: (id: string, newLabel: string) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fincalc_history');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing computation history', e);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('fincalc_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (
    type: CalculatorType,
    inputs: Record<string, number | string | boolean>,
    results: Record<string, number | string | boolean>,
    label: string
  ) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      inputs,
      results,
      timestamp: new Date().toISOString(),
      label,
    };

    setHistory((prev) => {
      // Filter duplicate inputs for the same type to avoid cluttering keys
      const filtered = prev.filter(
        (item) =>
          !(
            item.type === type &&
            JSON.stringify(item.inputs) === JSON.stringify(inputs)
          )
      );
      // Keep max 50 entries
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const deleteEntry = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renameEntry = (id: string, newLabel: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, label: newLabel } : item))
    );
  };

  return (
    <HistoryContext.Provider
      value={{ history, addToHistory, deleteEntry, clearHistory, renameEntry }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return context;
};
