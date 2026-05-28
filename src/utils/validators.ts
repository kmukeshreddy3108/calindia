/**
 * Basic Input Validators for Financial Calculators
 */

export const validateRange = (value: number, min: number, max: number): string | null => {
  if (isNaN(value)) {
    return 'Please enter a valid number';
  }
  if (value < min) {
    return `Value cannot be less than ${min}`;
  }
  if (value > max) {
    return `Value cannot exceed ${max}`;
  }
  return null;
};

export const sanitizeNumericInput = (val: string, maxVal: number = 1000000000): number => {
  const clean = val.replace(/[^\d.]/g, '');
  const parsed = parseFloat(clean);
  if (isNaN(parsed) || parsed < 0) return 0;
  return Math.min(parsed, maxVal);
};
