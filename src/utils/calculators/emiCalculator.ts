/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmortizationRow } from '../../types';

export interface EMICalculatorResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalPercentage: string;
  interestPercentage: string;
  schedule: {
    monthly: AmortizationRow[];
    yearly: { year: number; principal: number; interest: number; balance: number }[];
  };
}

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMICalculatorResult {
  if (principal <= 0 || annualRate < 0 || tenureMonths <= 0) {
    throw new Error('Invalid input values');
  }

  if (annualRate === 0) {
    const emi = principal / tenureMonths;
    const monthly: AmortizationRow[] = [];
    const yearly: { year: number; principal: number; interest: number; balance: number }[] = [];
    
    let remaining = principal;
    for (let m = 1; m <= tenureMonths; m++) {
      remaining = Math.max(0, remaining - emi);
      monthly.push({
        period: m,
        emi: Math.round(emi),
        principal: Math.round(emi),
        interest: 0,
        balance: Math.round(remaining),
      });
    }

    const totalYears = Math.ceil(tenureMonths / 12);
    for (let y = 1; y <= totalYears; y++) {
      const yearlyPrincipal = Math.min(principal, emi * 12);
      yearly.push({
        year: y,
        principal: Math.round(yearlyPrincipal),
        interest: 0,
        balance: Math.round(Math.max(0, principal - yearlyPrincipal * y)),
      });
    }

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(principal),
      totalInterest: 0,
      principalPercentage: '100.0',
      interestPercentage: '0.0',
      schedule: { monthly, yearly },
    };
  }

  const monthlyRate = annualRate / (12 * 100);
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;

  const schedule = generateAmortizationSchedule(principal, monthlyRate, emi, tenureMonths);

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principalPercentage: ((principal / totalAmount) * 100).toFixed(1),
    interestPercentage: ((totalInterest / totalAmount) * 100).toFixed(1),
    schedule,
  };
}

export function generateAmortizationSchedule(
  principal: number,
  monthlyRate: number,
  emi: number,
  tenureMonths: number
) {
  let balance = principal;
  const monthly: AmortizationRow[] = [];
  const yearlyMap: Record<number, { year: number; principal: number; interest: number; balance: number }> = {};

  for (let month = 1; month <= tenureMonths; month++) {
    const interestComponent = balance * monthlyRate;
    const principalComponent = emi - interestComponent;
    balance = Math.max(0, balance - principalComponent);
    const year = Math.ceil(month / 12);

    monthly.push({
      period: month,
      emi: Math.round(emi),
      principal: Math.round(principalComponent),
      interest: Math.round(interestComponent),
      balance: Math.round(balance),
    });

    if (!yearlyMap[year]) {
      yearlyMap[year] = { year, principal: 0, interest: 0, balance: 0 };
    }
    yearlyMap[year].principal += principalComponent;
    yearlyMap[year].interest += interestComponent;
    yearlyMap[year].balance = balance;
  }

  const yearly = Object.values(yearlyMap).map((item) => ({
    year: item.year,
    principal: Math.round(item.principal),
    interest: Math.round(item.interest),
    balance: Math.round(item.balance),
  }));

  return { monthly, yearly };
}

export function calculatePrepaymentSavings(
  principal: number,
  annualRate: number,
  tenureMonths: number,
  prepaymentAmount: number,
  prepaymentMonth: number
) {
  if (prepaymentAmount <= 0 || prepaymentMonth <= 0) return null;
  const monthlyRate = annualRate / (12 * 100);
  const standardEmi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  let balance = principal;
  let normalTotalInterest = 0;
  for (let m = 1; m <= tenureMonths; m++) {
    const inter = balance * monthlyRate;
    normalTotalInterest += inter;
    balance = Math.max(0, balance - (standardEmi - inter));
  }

  balance = principal;
  let prePaidInterest = 0;
  let monthsActual = 0;
  
  for (let m = 1; m <= tenureMonths; m++) {
    if (balance <= 0) break;
    monthsActual++;
    const inter = balance * monthlyRate;
    prePaidInterest += inter;
    let prin = standardEmi - inter;
    
    if (m === prepaymentMonth) {
      prin += prepaymentAmount;
    }
    
    balance = Math.max(0, balance - prin);
  }

  const interestSaved = Math.max(0, normalTotalInterest - prePaidInterest);
  const tenureReduced = tenureMonths - monthsActual;

  return {
    interestSaved: Math.round(interestSaved),
    tenureReduced: Math.max(0, tenureReduced),
    originalInterest: Math.round(normalTotalInterest),
    newInterest: Math.round(prePaidInterest),
  };
}
