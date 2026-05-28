/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FDQuarterlyBreakdown {
  period: number; // Quarter number or year/month division
  interestAccumulated: number;
  balanceWithInterest: number;
}

export interface FDCalculatorResult {
  maturityAmount: number;
  interestEarned: number;
  tdsWithPAN: number;
  netAmountAfterTDS: number;
  effectiveAnnualReturn: string;
  quarterlyData: FDQuarterlyBreakdown[];
}

export function calculateFD(
  principal: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number = 4, // 1=yearly, 2=half-yearly, 4=quarterly, 12=monthly, 0=simple interest
  isSeniorCitizen: boolean = false
): FDCalculatorResult {
  // Apply +0.5% premium for senior citizens in India
  const rate = isSeniorCitizen ? annualRate + 0.5 : annualRate;
  const r = rate / 100;

  let maturityAmount = 0;
  let interestEarned = 0;

  if (compoundingFrequency === 0) {
    // Simple Interest: A = P(1 + rt)
    interestEarned = principal * r * years;
    maturityAmount = principal + interestEarned;
  } else {
    // Compound Interest: A = P(1 + r/n)^(nt)
    maturityAmount = principal * Math.pow(1 + r / compoundingFrequency, compoundingFrequency * years);
    interestEarned = maturityAmount - principal;
  }

  // Under Sec 194A of IT Act, TDS is applicable if interest is > ₹40,000 (or > ₹50,000 for Senior Citizens)
  const tdsThreshold = isSeniorCitizen ? 50000 : 40000;
  const tdsRate = 0.10; // 10% standard TDS for active PAN
  const tdsWithPAN = interestEarned > tdsThreshold ? interestEarned * tdsRate : 0;
  
  const netAmountAfterTDS = maturityAmount - tdsWithPAN;
  const effectiveReturn = years > 0 ? ((maturityAmount / principal - 1) / years * 100).toFixed(2) : '0.00';

  // Generate quarterly projections for charts or breakdown lists
  const quarterlyData = generateFDQuarterlyBreakdown(principal, r, years, compoundingFrequency === 0 ? 1 : compoundingFrequency);

  return {
    maturityAmount: Math.round(maturityAmount),
    interestEarned: Math.round(interestEarned),
    tdsWithPAN: Math.round(tdsWithPAN),
    netAmountAfterTDS: Math.round(netAmountAfterTDS),
    effectiveAnnualReturn: effectiveReturn,
    quarterlyData,
  };
}

export function generateFDQuarterlyBreakdown(
  principal: number,
  r: number,
  years: number,
  compoundingFrequency: number
): FDQuarterlyBreakdown[] {
  const data: FDQuarterlyBreakdown[] = [];
  const totalPeriods = Math.ceil(years * compoundingFrequency);
  
  if (totalPeriods <= 0) return [];
  
  const ratePerPeriod = r / compoundingFrequency;
  let balance = principal;

  for (let period = 1; period <= totalPeriods; period++) {
    const interest = balance * ratePerPeriod;
    balance += interest;
    // Cap steps if years is large to avoid rendering thousand rows in UI
    if (totalPeriods <= 20 || period % Math.ceil(totalPeriods / 10) === 0 || period === totalPeriods) {
      data.push({
        period,
        interestAccumulated: Math.round(balance - principal),
        balanceWithInterest: Math.round(balance),
      });
    }
  }

  return data;
}
