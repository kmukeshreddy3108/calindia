/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available',
  className = '',
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 w-full ${className}`}>
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800 text-left">
        <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          <tr>
            {columns.map((col, idx) => {
              const alignClass =
                col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
              return (
                <th key={idx} scope="col" className={`px-4.5 py-3.5 ${alignClass} ${col.className || ''}`}>
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 text-sm text-slate-700 dark:text-slate-300">
          {data.length > 0 ? (
            data.map((row, rIdx) => (
              <tr
                key={keyExtractor(row, rIdx)}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-750/30 transition-colors"
              >
                {columns.map((col, cIdx) => {
                  const alignClass =
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
                  return (
                    <td key={cIdx} className={`px-4.5 py-3 font-medium ${alignClass} ${col.className || ''}`}>
                      {col.accessor(row)}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4.5 py-8 text-center text-slate-400 dark:text-slate-500 font-medium">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
