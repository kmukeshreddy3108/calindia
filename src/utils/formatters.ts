/**
 * Indian Number Formatting Utilities
 */

export const formatIndianCurrency = (amount: number, decimals: number = 0): string => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(amount);
  } catch (e) {
    return `₹${amount.toFixed(decimals)}`;
  }
};

export const formatIndianNumber = (num: number, decimals: number = 0): string => {
  try {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  } catch (e) {
    return num.toFixed(decimals);
  }
};

export const formatToLakhCrore = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return formatIndianCurrency(amount, 0);
};

export const parseIndianNumber = (str: string): number => {
  const cleaned = str.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};
