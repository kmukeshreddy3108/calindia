/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-primary-dark text-white ring-brand-primary shadow-sm shadow-blue-500/10',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-750 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-700',
    outline: 'bg-transparent border border-slate-300 hover:border-brand-primary text-slate-700 hover:text-brand-primary dark:border-slate-600 dark:text-slate-300 dark:hover:text-brand-primary dark:hover:border-brand-primary',
    ghost: 'bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900 dark:hover:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-100',
    accent: 'bg-brand-accent hover:bg-brand-accent-dark text-white shadow-sm shadow-emerald-500/10 focus:ring-brand-accent',
    warning: 'bg-brand-warning hover:bg-orange-600 text-white shadow-sm focus:ring-brand-warning',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
