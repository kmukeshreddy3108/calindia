/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SIPYearlyGrowth {
  year: number;
  invested: number;
  value: number;
  returns: number;
}

export interface SIPCalculatorResult {
  futureValue: number;
  totalInvested: number;
  estimatedReturns: number;
  absoluteReturns: string;
  yearlyData: SIPYearlyGrowth[];
}

export function calculateSIP(
  monthlyAmount: number,
  annualReturn: number,
  years: number
): SIPCalculatorResult {
  const months = years * 12;
  const monthlyRate = annualReturn / (12 * 100);

  let futureValue = 0;
  if (monthlyRate === 0) {
    futureValue = monthlyAmount * months;
  } else {
    futureValue =
      monthlyAmount *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalInvested = monthlyAmount * months;
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  const yearlyData: SIPYearlyGrowth[] = [];
  for (let year = 1; year <= years; year++) {
    const n = year * 12;
    let fv = 0;
    if (monthlyRate === 0) {
      fv = monthlyAmount * n;
    } else {
      fv =
        monthlyAmount *
        ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    const invested = monthlyAmount * n;
    yearlyData.push({
      year,
      invested,
      value: Math.round(fv),
      returns: Math.round(Math.max(0, fv - invested)),
    });
  }

  return {
    futureValue: Math.round(futureValue),
    totalInvested,
    estimatedReturns: Math.round(estimatedReturns),
    absoluteReturns: totalInvested > 0 ? ((estimatedReturns / totalInvested) * 100).toFixed(1) : '0.0',
    yearlyData,
  };
}

export function calculateLumpSum(
  amount: number,
  annualReturn: number,
  years: number
) {
  const r = annualReturn / 100;
  const futureValue = amount * Math.pow(1 + r, years);
  const totalInvested = amount;
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  const yearlyData: SIPYearlyGrowth[] = [];
  for (let year = 1; year <= years; year++) {
    const fv = amount * Math.pow(1 + r, year);
    yearlyData.push({
      year,
      invested: amount,
      value: Math.round(fv),
      returns: Math.round(Math.max(0, fv - amount)),
    });
  }

  return {
    futureValue: Math.round(futureValue),
    totalInvested,
    estimatedReturns: Math.round(estimatedReturns),
    absoluteReturns: ((estimatedReturns / totalInvested) * 100).toFixed(1),
    yearlyData,
  };
}

export function calculateSIPToReachGoal(
  targetAmount: number,
  annualReturn: number,
  years: number
): number {
  if (targetAmount <= 0 || annualReturn <= 0 || years <= 0) return 0;
  const months = years * 12;
  const monthlyRate = annualReturn / (12 * 100);

  // targetAmount = P * ((1+r)^n - 1)/r * (1+r)
  // P = targetAmount / [ ((1+r)^n - 1)/r * (1+r) ]
  const denominator = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const monthlyRequired = targetAmount / denominator;
  return Math.round(monthlyRequired);
}
