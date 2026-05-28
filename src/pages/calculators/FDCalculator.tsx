/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CalculatorLayout } from '../../components/calculators/CalculatorLayout';
import { ResultPanel } from '../../components/calculators/ResultPanel';
import { Input } from '../../components/ui/Input';
import { Slider } from '../../components/ui/Slider';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { DonutChart } from '../../components/charts/DonutChart';
import { calculateFD } from '../../utils/calculators/fdCalculator';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { buildFAQSchema, buildCalculatorSchema } from '../../utils/seo/schemaTemplates';
import { SEOHead } from '../../components/seo/SEOHead';
import { PiggyBank, Briefcase, Landmark, ShieldCheck } from 'lucide-react';

export const FDCalculator: React.FC = () => {
  const location = useLocation();

  // Primary parameters
  const [principal, setPrincipal] = useState<number>(500000); // 5 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(7.1); // 7.1% typical SBI FD rate
  const [years, setYears] = useState<number>(5); // 5 years standard tenure
  const [seniorCitizen, setSeniorCitizen] = useState<boolean>(false);
  const [compounding, setCompounding] = useState<number>(4); // default 4 = quarterly

  // Restore state from Navigation History
  useEffect(() => {
    if (location.state?.restoreInputs) {
      const { principal, interestRate, years, seniorCitizen, compounding } = location.state.restoreInputs;
      if (principal) setPrincipal(Number(principal));
      if (interestRate) setInterestRate(Number(interestRate));
      if (years) setYears(Number(years));
      if (seniorCitizen !== undefined) setSeniorCitizen(Boolean(seniorCitizen));
      if (compounding !== undefined) setCompounding(Number(compounding));
    }
  }, [location.state]);

  const fdResult = calculateFD(
    principal,
    interestRate,
    years,
    compounding,
    seniorCitizen
  );

  const appliedRate = seniorCitizen ? interestRate + 0.5 : interestRate;

  // Chart dataset
  const donutData = [
    { name: 'Initial Principal', value: principal, color: '#0A7CFF' },
    { name: 'Interest Accumulated', value: fdResult.interestEarned, color: '#00C48C' },
  ];

  // Static comparison data for Indian top lenders (H1 2026 typical averages)
  const bankComparisons = [
    { name: 'State Bank of India (SBI)', rate: 7.1, citizenRate: 7.6 },
    { name: 'HDFC Bank', rate: 7.25, citizenRate: 7.75 },
    { name: 'ICICI Bank', rate: 7.2, citizenRate: 7.7 },
    { name: 'Punjab National Bank (PNB)', rate: 7.0, citizenRate: 7.5 },
    { name: 'IDFC First Bank', rate: 7.75, citizenRate: 8.25 },
  ];

  const calculatedBankReturns = bankComparisons.map((bank) => {
    const activeRate = seniorCitizen ? bank.citizenRate : bank.rate;
    const res = calculateFD(principal, activeRate, years, compounding, false); // seniorCitizen padding handles internally
    return {
      bankName: bank.name,
      rate: activeRate,
      interest: res.interestEarned,
      total: res.maturityAmount,
    };
  });

  // Schema declarations
  const faqList = [
    {
      question: 'What is a Fixed Deposit (FD) in India?',
      answer:
        'A Fixed Deposit (FD) is a savings instrument offered by commercial banks and NBFCs in India, providing a fixed interest yield which is significantly higher than basic savings account rates for a predetermined tenure.',
    },
    {
      question: 'Which compounding frequency offers the highest FD yield?',
      answer:
        'Monthly compounding offers the highest final cash payout, followed by quarterly, half-yearly, and yearly frequencies. Standard commercial banks in India (SBI, HDFC) typically utilize quarterly compounding cycles by default.',
    },
    {
      question: 'What are the FD bonus rules for Senior Citizens?',
      answer:
        'To support retired individuals, almost all commercial and cooperative banks in India grant senior citizens (aged 60 and above) a premium of +0.50% extra interest on standard Fixed Deposits.',
    },
    {
      question: 'What is Tax Deducted at Source (TDS) on Fixed Deposits?',
      answer:
        "TDS is an advance tax deducted by banks if total FD interest earned exceeds ₹40,000 per year (raised to ₹50,000 for senior citizens). If you supply your active PAN, TDS is deducted at 10%. Without a PAN, the bank is legally required to deduct tax at 20%.",
    },
    {
      question: 'How can I save TDS on my bank FD interest?',
      answer:
        'If your total annual taxable income is below the exemption limit, you can save TDS by submitting Form 15H (for senior citizens) or Form 15G (for general citizens) directly to your bank branches at the start of each fiscal year.',
    },
    {
      question: 'Is my bank FD capital fully secure in India?',
      answer:
        'Yes, under the guidelines of the Deposit Insurance and Credit Guarantee Corporation (DICGC, an RBI subsidiary), your bank deposit principal and interest combined are fully insured up to ₹5 Lakhs per depositor across each commercial bank.',
    },
    {
      question: 'What is a tax-saving Fixed Deposit?',
      answer:
        'Tax-saving FDs are dedicated bank deposits carrying a mandatory 5-year lock-in period. Contributions qualify for tax deductions up to ₹1.5 Lakhs per year under Section 80C. Note that early premature liquidation is strictly prohibited for these deposits.',
    },
    {
      question: 'Are there charges for breaking FDs prematurely?',
      answer:
        'Yes, premature physical bank liquidation of Fixed Deposits generally attracts a penal charge of 0.50% to 1.00% reduction on the applicable interest rate for the exact duration the deposit was active.',
    },
  ];

  const calculatorSchema = buildCalculatorSchema(
    'Fixed Deposit Calculator',
    'Calculate bank savings yields with senior citizen multipliers, adjust compounding frequencies, and check tax obligations instantly.',
    '/fd-calculator'
  );
  const faqSchema = buildFAQSchema(faqList);

  return (
    <>
      <SEOHead
        title="FD Calculator India — Bank Fixed Deposit Returns Calculator"
        description="Verify maturity payouts on commercial bank fixed deposits instantly. Compute senior citizen interest premiums and TDS reductions under Sec 194A."
        canonical="/fd-calculator"
        schema={{ ...calculatorSchema, ...faqSchema }}
      />

      <CalculatorLayout
        id="fd"
        name="FD Interest Calculator"
        description="Calculate bank savings yields with senior citizen multipliers, adjust compounding frequencies, and check tax obligations instantly."
        formula={{
          latex: 'A = P × (1 + r / n) ^ (n × t)',
          explanation:
            'Where: A is final maturity amount; P is capital principal; r represents annual bank rate; n represents compounding intervals (0=simple, 1=yearly, 12=monthly); and t is duration in years.',
        }}
        faqList={faqList}
        inputPanel={
          <div className="flex flex-col gap-5.5 select-none font-sans">
            <Input
              label="FD Principal Amount"
              value={principal}
              onChange={(v) => setPrincipal(Math.max(0, Number(v) || 0))}
              prefixSymbol="₹"
              suffixSymbol={principal >= 100000 ? `${(principal / 100000).toFixed(1)} L` : 'INR'}
            />
            <Slider
              label="Adjust Deposit"
              min={1000}
              max={10000000}
              step={1000}
              value={principal}
              onChange={setPrincipal}
              formatValue={(val) => formatIndianCurrency(val, 0)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Annual Rate of Interest"
                value={interestRate}
                onChange={(v) => setInterestRate(Math.max(0, parseFloat(v) || 0))}
                suffixSymbol="%"
              />
              <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent">
                <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Citizen Seniority</span>
                <button
                  type="button"
                  onClick={() => setSeniorCitizen(!seniorCitizen)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    seniorCitizen
                      ? 'bg-emerald-500/10 border-brand-accent text-brand-accent'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-650 dark:text-slate-450'
                  }`}
                >
                  {seniorCitizen ? 'Senior (+0.5% rate)' : 'General Citizen'}
                </button>
              </div>
            </div>

            <Slider
              label="Adjust Base Interest"
              min={1}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={setInterestRate}
              formatValue={(val) => `${val}%`}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Time Period (Years)"
                value={years}
                onChange={(v) => setYears(Math.max(0.1, parseFloat(v) || 0.1))}
                suffixSymbol="YRS"
              />
              <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent">
                <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Compounding Interval</span>
                <select
                  value={compounding}
                  onChange={(e) => setCompounding(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                >
                  <option value={12}>Monthly Compound</option>
                  <option value={4}>Quarterly (Default)</option>
                  <option value={2}>Half-Yearly Compound</option>
                  <option value={1}>Yearly Compound</option>
                  <option value={0}>Simple Interest</option>
                </select>
              </div>
            </div>

            <Slider
              label="Adjust Duration"
              min={1}
              max={10}
              step={1}
              value={years}
              onChange={setYears}
              formatValue={(val) => `${val} Years`}
            />
          </div>
        }
        resultPanel={
          <ResultPanel
            type="fd"
            inputs={{ principal, interestRate, years, seniorCitizen, compounding }}
            results={{ maturityAmount: fdResult.maturityAmount, interestEarned: fdResult.interestEarned, tdsWithPAN: fdResult.tdsWithPAN }}
            mainValue={fdResult.maturityAmount}
            mainLabel="Total Maturity Amount"
            fileNamePre="fincalc-fd-maturity"
            secondaryMetrics={[
              { label: 'Initial Principal invested', value: principal, colorType: 'primary' },
              { label: 'Accumulated Interest', value: fdResult.interestEarned, colorType: 'accent' },
              { label: 'Estimated 10% TDS (Under PAN)', value: fdResult.tdsWithPAN, colorType: 'warning' },
            ]}
            chartComponent={<DonutChart data={donutData} />}
          />
        }
        seoArticle={
          <div className="flex flex-col gap-4 select-text font-sans">
            <h4 className="text-base font-bold text-slate-800 dark:text-white">
              Understanding Fixed Deposit Compound Mechanics in India
            </h4>
            <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
              When applying for FDs under standard public or private commercial lenders, interest is reinvested quarterly by default. This creates a yield margin higher than simple interest. General citizens enjoy stable rate boundaries, and senior citizens get dedicated cushions (+0.5%).
            </p>
            <h4 className="text-base font-bold text-slate-800 dark:text-white mt-1">
              Securing Your Bank Interest from TDS Deductions
            </h4>
            <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
              If your overall yearly income is below standard tax brackets, submitting Form 15G or 15H protects your FD returns from automated TDS deductions. This keeps your cash flow intact without having to wait for Income Tax Return (ITR) refunds.
            </p>
          </div>
        }
      >
        {/* Dynamic Bank Rates Matrix Display */}
        <Card className="p-6 border border-slate-205 dark:border-slate-800 shadow-sm mt-3 select-text">
          <div className="flex items-center gap-2 mb-4">
            <Landmark className="w-5 h-5 text-slate-500" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase leading-none font-display">
                SBI & Top Bank Comparatives (Estimated)
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">
                Visual return outputs across leading Indian financial lenders
              </p>
            </div>
          </div>

          <Table
            columns={[
              { header: 'Lending Entity', accessor: (row) => row.bankName, align: 'left' },
              { header: 'Applicable Rate', accessor: (row) => `${row.rate.toFixed(2)}%`, align: 'center', className: 'font-semibold' },
              { header: 'Accumulated Interest (₹)', accessor: (row) => formatIndianNumber(row.interest), align: 'right' },
              { header: 'Total Maturity (₹)', accessor: (row) => formatIndianCurrency(row.total), align: 'right', className: 'text-brand-accent' },
            ]}
            data={calculatedBankReturns}
            keyExtractor={(row) => row.bankName}
          />
        </Card>
      </CalculatorLayout>
    </>
  );
};
export default FDCalculator;
