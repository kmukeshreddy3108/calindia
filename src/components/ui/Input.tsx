/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId } from 'react';
import { formatIndianNumber } from '../../utils/formatters';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  prefixSymbol?: string;
  suffixSymbol?: string;
  error?: string | null;
  helpText?: string;
  formatOnBlur?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  prefixSymbol,
  suffixSymbol,
  error,
  helpText,
  formatOnBlur = false,
  className = '',
  type = 'text',
  ...props
}) => {
  const id = useId();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const displayValue = formatOnBlur && typeof value === 'number'
    ? formatIndianNumber(value)
    : value;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label htmlFor={id} className="text-xs font-semibold tracking-wide text-slate-550 dark:text-slate-405 uppercase">
        {label}
      </label>
      
      <div className="relative flex items-center w-full">
        {prefixSymbol && (
          <span className="absolute left-3.5 text-sm font-medium text-slate-400 dark:text-slate-500 pointer-events-none select-none">
            {prefixSymbol}
          </span>
        )}
        
        <input
          id={id}
          type={type}
          value={displayValue}
          onChange={handleInputChange}
          className={`w-full px-3.5 py-2.5 text-sm rounded-xl font-medium border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all ${
            prefixSymbol ? 'pl-8' : ''
          } ${suffixSymbol ? 'pr-12' : ''} ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-950/40'
              : 'border-slate-200 dark:border-slate-700 focus:border-brand-primary focus:ring-blue-100 dark:focus:ring-brand-primary-dark/20'
          }`}
          {...props}
        />

        {suffixSymbol && (
          <span className="absolute right-3.5 text-xs font-semibold text-slate-400 dark:text-slate-500 pointer-events-none select-none uppercase">
            {suffixSymbol}
          </span>
        )}
      </div>

      {error ? (
        <span className="text-xs text-red-500 font-medium mt-0.5 animate-fadeIn" aria-live="polite">
          {error}
        </span>
      ) : helpText ? (
        <span className="text-xs text-slate-400 dark:text-slate-550 mt-0.5">
          {helpText}
        </span>
      ) : null}
    </div>
  );
};
export default Input;
