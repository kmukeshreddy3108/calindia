/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CIYearlyItem {
  year: number;
  principal: number;
  interestEarned: number;
  accumulatedInterest: number;
  totalValue: number;
  simpleInterestValue: number;
}

export interface CICalculatorResult {
  amount: number;
  interest: number;
  simpleInterest: number;
  extraEarned: number;
  yearlyBreakdown: CIYearlyItem[];
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  frequency: number = 1 // 1=yearly, 2=half-yearly, 4=quarterly, 12=monthly, 365=daily
): CICalculatorResult {
  const r = rate / 100;
  const amount = principal * Math.pow(1 + r / frequency, frequency * years);
  const interest = amount - principal;
  const simpleInterest = principal * r * years;
  const extraEarned = interest - simpleInterest;

  const yearlyBreakdown: CIYearlyItem[] = [];
  
  for (let year = 1; year <= years; year++) {
    const totalVal = principal * Math.pow(1 + r / frequency, frequency * year);
    const totalInterest = totalVal - principal;
    const siValue = principal * (1 + r * year);
    
    // Interest earned specifically in this year
    const previousTotalVal = year === 1 ? principal : principal * Math.pow(1 + r / frequency, frequency * (year - 1));
    const interestEarnedThisYear = totalVal - previousTotalVal;

    yearlyBreakdown.push({
      year,
      principal,
      interestEarned: Math.round(interestEarnedThisYear),
      accumulatedInterest: Math.round(totalInterest),
      totalValue: Math.round(totalVal),
      simpleInterestValue: Math.round(siValue),
    });
  }

  return {
    amount: Math.round(amount),
    interest: Math.round(interest),
    simpleInterest: Math.round(simpleInterest),
    extraEarned: Math.round(extraEarned),
    yearlyBreakdown,
  };
}
