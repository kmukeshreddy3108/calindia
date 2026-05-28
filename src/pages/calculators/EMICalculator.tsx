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
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { DonutChart } from '../../components/charts/DonutChart';
import { calculateEMI, calculatePrepaymentSavings } from '../../utils/calculators/emiCalculator';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { buildFAQSchema, buildCalculatorSchema } from '../../utils/seo/schemaTemplates';
import { SEOHead } from '../../components/seo/SEOHead';
import { SlidersHorizontal, BarChart4, TableProperties, Sparkles, Scale } from 'lucide-react';

export const EMICalculator: React.FC = () => {
  const location = useLocation();

  // Primary states matching Indian bank standards
  const [principal, setPrincipal] = useState<number>(3000000); // 30 Lakhs default
  const [annualRate, setAnnualRate] = useState<number>(8.5); // 8.5% default Home Loan rate
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default
  const [isTenureYears, setIsTenureYears] = useState<boolean>(true);

  // Compare Scenario states
  const [compareActive, setCompareActive] = useState<boolean>(false);
  const [compRate, setCompRate] = useState<number>(9.5);
  const [compTenure, setCompTenure] = useState<number>(20);

  // Schedule pagination
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly');
  const [monthlyPage, setMonthlyPage] = useState<number>(0);
  const rowsPerPage = 12;

  // Prepayment simulation states
  const [prepayAmount, setPrepayAmount] = useState<number>(200000); // 2 Lakhs prepayment
  const [prepayMonth, setPrepayMonth] = useState<number>(24); // at month 24 (Year 2)
  const [prepaySimulated, setPrepaySimulated] = useState<boolean>(false);

  // Restore state from Navigation History clicks
  useEffect(() => {
    if (location.state?.restoreInputs) {
      const { principal, annualRate, tenureYears, isTenureYears } = location.state.restoreInputs;
      if (principal) setPrincipal(Number(principal));
      if (annualRate) setAnnualRate(Number(annualRate));
      if (tenureYears) setTenureYears(Number(tenureYears));
      if (isTenureYears !== undefined) setIsTenureYears(Boolean(isTenureYears));
    }
  }, [location.state]);

  const tenureMonths = isTenureYears ? tenureYears * 12 : tenureYears;

  // Calculate standard values
  const { emi, totalAmount, totalInterest, principalPercentage, interestPercentage, schedule } = calculateEMI(
    principal,
    annualRate,
    tenureMonths
  );

  // Calculate comparison inputs
  const compEmiData = compareActive
    ? calculateEMI(principal, compRate, compTenure * 12)
    : null;

  // Prepayment variables
  const prepaymentResult = prepaySimulated
    ? calculatePrepaymentSavings(principal, annualRate, tenureMonths, prepayAmount, prepayMonth)
    : null;

  // Chart dataset for distribution
  const donutData = [
    { name: 'Principal Amount', value: principal, color: '#0A7CFF' },
    { name: 'Interest Amount', value: totalInterest, color: '#FF6B35' },
  ];

  // Schema declarations
  const faqList = [
    {
      question: 'How is Home Loan EMI calculated in India?',
      answer:
        'Home loan EMIs in India are computed based on the reducing balance interest rates. Formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is the monthly rate (interest rate / 12 / 100), and n is tenure in months.',
    },
    {
      question: 'What is the standard formula for EMI calculation?',
      answer:
        'The standard formula is: EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]. Where P is the principal loan amount, R is the monthly rate, and N is the monthly tenure.',
    },
    {
      question: 'Does prepaying my home loan reduce EMI or tenure?',
      answer:
        'By default, making lump sum prepayments on home loans in India reduces the remaining loan tenure while keeping your monthly EMI constant. This saves maximum interest cost. Alternatively, you can ask your bank to recalibrate and reduce the monthly EMI while keeping tenure constant.',
    },
    {
      question: 'What happens if I miss a loan EMI payment in India?',
      answer:
        'Missing an EMI payment attracts pecuniary late payment penal charges from banks (typically 2% per month) and is reported directly to RBI credit bureaus (CIBIL or Experian), which severely lowers your credit score.',
    },
    {
      question: 'Is EMI fixed for floating rate home loans?',
      answer:
        'No, for floating rate loans linked to external benchmarks (like EBLR/Repo rates), interest rate shifts prompt banks to dynamically extend or reduce tenure first. If changes are extreme, they will also modify the monthly EMI value.',
    },
    {
      question: 'How can I lower my outstanding home loan interest?',
      answer:
        'You can lower interest cost by making periodic lump sum prepayments, transferring the loan to another bank offering lower rate margins (Home Loan Balance Transfer), or opting for a shorter tenure layout.',
    },
    {
      question: 'What is the maximum loan tenure allowed in India?',
      answer:
        'The maximum loan tenure permitted for Home Loans in India is generally 30 years (subject to age limits, usually retiring around 60-65 years). For personal or car loans, the standard limits are 5 to 7 years.',
    },
    {
      question: 'Are there tax exemptions on home loan EMIs?',
      answer:
        'Yes, under Section 24(b) of the Income Tax Act, you can claim deductions up to ₹2 Lakhs per annum on interest repaid for a self-occupied home. Principal repayments can also be claimed up to ₹1.5 Lakhs under Section 80C schemes.',
    },
  ];

  const calculatorSchema = buildCalculatorSchema(
    'EMI Loan Calculator',
    'Instantly estimate monthly loan EMIs, total credit interest repayments, and print optimized yearly amortization cards.',
    '/emi-calculator'
  );
  const faqSchema = buildFAQSchema(faqList);

  return (
    <>
      <SEOHead
        title="EMI Calculator India — Home, Personal & Car Loan EMI"
        description="Calculate your monthly home loan, car loan, or personal loan EMI instantly. View comprehensive yearly amortization tables, prepayment savings, and compare bank rates."
        canonical="/emi-calculator"
        schema={{ ...calculatorSchema, ...faqSchema }}
      />

      <CalculatorLayout
        id="emi"
        name="EMI Calculator"
        description="Instantly estimate monthly loan EMIs, total credit interest repayments, and print optimized yearly amortization cards."
        formula={{
          latex: 'EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)',
          explanation:
            'Where: P represents total principal loan amount; r is the monthly interest rate (annual percentage / 12 / 100); and n is total monthly tenure periods.',
        }}
        faqList={faqList}
        inputPanel={
          <div className="flex flex-col gap-5.5 select-none font-sans">
            {/* Input fields */}
            <div className="flex gap-4">
              <Input
                label="Home/Vehicle Loan Principal"
                value={principal}
                onChange={(v) => setPrincipal(Math.max(0, Number(v) || 0))}
                prefixSymbol="₹"
                suffixSymbol={principal >= 100000 ? `${(principal / 100000).toFixed(1)} L` : 'INR'}
              />
            </div>
            
            <Slider
              label="Adjust Loan Amount"
              min={100000}
              max={10000000}
              step={50000}
              value={principal}
              onChange={setPrincipal}
              formatValue={(val) => formatIndianCurrency(val, 0)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Annual Interest Rate"
                value={annualRate}
                onChange={(v) => setAnnualRate(Math.max(0, parseFloat(v) || 0))}
                suffixSymbol="%"
              />
              <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent">
                <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Tenure Layout</span>
                <div className="flex bg-slate-100 dark:bg-slate-805 rounded-xl p-1 gap-1">
                  <button
                    onClick={() => {
                      if (!isTenureYears) {
                        setIsTenureYears(true);
                        setTenureYears(Math.ceil(tenureYears / 12));
                      }
                    }}
                    className={`flex-1 text-xs font-bold py-1.5 rounded-lg cursor-pointer ${
                      isTenureYears ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    onClick={() => {
                      if (isTenureYears) {
                        setIsTenureYears(false);
                        setTenureYears(tenureYears * 12);
                      }
                    }}
                    className={`flex-1 text-xs font-bold py-1.5 rounded-lg cursor-pointer ${
                      !isTenureYears ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
            </div>

            <Slider
              label={isTenureYears ? 'Adjust Tenure (Years)' : 'Adjust Tenure (Months)'}
              min={isTenureYears ? 1 : 12}
              max={isTenureYears ? 30 : 360}
              step={1}
              value={tenureYears}
              onChange={setTenureYears}
              formatValue={(val) => `${val} ${isTenureYears ? 'Yrs' : 'Mths'}`}
            />

            {/* Scenario comparisons triggers */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-2 flex flex-col gap-4">
              <div className="flex justify-between items-center bg-transparent">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase flex items-center gap-1.5 leading-none">
                    <Scale className="w-4 h-4 text-brand-primary" />
                    Interactive Comparisons
                  </h3>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">
                    Compare current limits versus a competing bank offer
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCompareActive(!compareActive)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                    compareActive ? 'bg-red-500/10 text-red-500' : 'bg-brand-primary/10 text-brand-primary'
                  }`}
                >
                  {compareActive ? 'Remove Offer' : 'Add Offer'}
                </button>
              </div>

              {compareActive && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-105 dark:border-slate-800/40 animate-scaleIn select-text">
                  <Input
                    label="Comparison Rate"
                    value={compRate}
                    onChange={(v) => setCompRate(Math.max(0, parseFloat(v) || 0))}
                    suffixSymbol="%"
                  />
                  <Input
                    label="Comparison Tenure"
                    value={compTenure}
                    onChange={(v) => setCompTenure(Math.max(1, Number(v) || 1))}
                    suffixSymbol="YRS"
                  />
                </div>
              )}
            </div>

            {/* Prepayments triggers */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex flex-col gap-4">
              <div className="flex justify-between items-center bg-transparent">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase flex items-center gap-1.5 leading-none">
                    <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
                    Lump Sum Prepayment Simulator
                  </h3>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">
                    Calculate months and interest saved with prepayment
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPrepaySimulated(!prepaySimulated)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                    prepaySimulated ? 'bg-red-500/10 text-red-500' : 'bg-brand-accent/10 text-brand-accent'
                  }`}
                >
                  {prepaySimulated ? 'Reset Prepay' : 'Run Prepay'}
                </button>
              </div>

              {prepaySimulated && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-850/40 border border-slate-105 dark:border-slate-800/40 animate-scaleIn select-text">
                  <Input
                    label="Lump Sum Paid"
                    value={prepayAmount}
                    onChange={(v) => setPrepayAmount(Math.max(0, Number(v) || 0))}
                    prefixSymbol="₹"
                  />
                  <Input
                    label="Paid at Month"
                    value={prepayMonth}
                    onChange={(v) => setPrepayMonth(Math.max(1, Number(v) || 1))}
                    suffixSymbol="MONTH"
                  />
                </div>
              )}
            </div>

          </div>
        }
        resultPanel={
          <ResultPanel
            type="emi"
            inputs={{ principal, annualRate, tenureYears, isTenureYears }}
            results={{ emi, totalAmount, totalInterest }}
            mainValue={emi}
            mainLabel="Estimated Monthly EMI"
            fileNamePre="fincalc-loan-emi"
            secondaryMetrics={[
              { label: 'Principal Borrowed', value: principal, colorType: 'primary' },
              { label: 'Total Outstanding Interest', value: totalInterest, colorType: 'warning' },
              { label: 'Total repayment cost', value: totalAmount, colorType: 'accent' },
            ]}
            chartComponent={<DonutChart data={donutData} />}
          />
        }
        seoArticle={
          <div className="flex flex-col gap-4 select-text">
            <h4 className="text-base font-bold text-slate-800 dark:text-white mt-1">
              Understanding Reducing Balance Home Loans in Indian Banking
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              When applying for home financing through top public or private sector lenders like SBIs Maxgain, HDFC home vaults, or ICICI personal credits, the rates are linked either to dynamic Repo Rate Benchmarks (RLLR) or credit risks. Understanding your amortization structure is extremely beneficial.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <b>Reducing Balance Method:</b> Under reducing rates schemes, interest is only calculated on the remaining principal rather than the full base loan limit. Each month as your EMI is paid, a portion pays interest fees, and the remaining amount knocks down your outstanding principal balance, so next month’s fee calculation operates on a smaller base value.
            </p>
            <h4 className="text-base font-bold text-slate-800 dark:text-white mt-3">
              Factors Influencing Your Core Monthly Repayment Limits
            </h4>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex flex-col gap-1.5">
              <li><b>Loan Tenure options:</b> Extending loans over 25 or 30 years keeps the monthly EMI cost lower but triggers a massive increase in cumulative interest. Shortening tenure to 15 years keeps monthly EMIs higher but saves lakhs in interest.</li>
              <li><b>Benchmarked Fluctuations:</b> Floatings rates change over time based on Repo Benchmarks. Rising central repo margins swell overall tenure frames, while falling rates reduce interest burdens.</li>
              <li><b>CIBIL credit parameters:</b> Applicants with pristine credit parameters (CIBIL scoring &gt; 780) enjoy tighter bank interest margins.</li>
            </ul>
          </div>
        }
      >
        {/* Comparison Result Display Grid */}
        {compareActive && compEmiData && (
          <Card className="p-6 border border-slate-205 dark:border-slate-800 mt-2 select-text">
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase leading-none">
              <Scale className="w-5 h-5 text-brand-primary" />
              Side-by-Side Comparison Analytics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4.5">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-105">
                <span className="text-[10px] text-slate-450 uppercase font-bold block">Current EMI vs New EMI</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-extrabold text-brand-primary">{formatIndianCurrency(emi)}</span>
                  <span className="text-slate-400">&larr; VS &rarr;</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">{formatIndianCurrency(compEmiData.emi)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-none font-medium">
                  {emi > compEmiData.emi
                    ? `Saves ${formatIndianCurrency(emi - compEmiData.emi)} per month`
                    : `New EMI is ${formatIndianCurrency(compEmiData.emi - emi)} higher`}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-105">
                <span className="text-[10px] text-slate-450 uppercase font-bold block">Interest comparison</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-bold text-slate-500">{formatIndianCurrency(totalInterest)}</span>
                  <span className="text-slate-400">vs</span>
                  <span className="text-xs font-extrabold text-brand-warning">{formatIndianCurrency(compEmiData.totalInterest)}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  {totalInterest > compEmiData.totalInterest
                    ? `Saves ${formatIndianCurrency(totalInterest - compEmiData.totalInterest)} total interest!`
                    : `Triggers ${formatIndianCurrency(compEmiData.totalInterest - totalInterest)} additional interest`}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-105">
                <span className="text-[10px] text-slate-450 uppercase font-bold block">Total Outflow Cost</span>
                <div className="flex items-baseline gap-2 mt-1 font-mono">
                  <span className="text-xs font-bold text-slate-500">{formatIndianCurrency(totalAmount)}</span>
                  <span className="text-slate-400">vs</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{formatIndianCurrency(compEmiData.totalAmount)}</span>
                </div>
                <p className="text-[10px] text-slate-450 mt-1 font-medium leading-none">
                  Total capital return comparison including fees.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Prepayment savings Display Panel */}
        {prepaySimulated && prepaymentResult && (
          <Card className="p-6 border-l-4 border-l-brand-accent bg-emerald-500/5 border border-slate-150 dark:bg-slate-850/20 dark:border-slate-800 mt-2 select-text">
            <h3 className="text-sm font-extrabold text-brand-accent dark:text-emerald-400 flex items-center gap-1.5 uppercase leading-none">
              <Sparkles className="w-5 h-5 animate-pulse" />
              Prepayment Evaluation Report
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4.5 font-sans">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Total Interest Saved Due to Prepay</span>
                <span className="text-lg font-extrabold text-brand-accent font-mono mt-0.5">{formatIndianCurrency(prepaymentResult.interestSaved)}</span>
                <p className="text-[10px] text-slate-450 mt-1 max-w-sm font-medium leading-normal">
                  Paying ₹{formatIndianNumber(prepayAmount)} at Month {prepayMonth} lowers your remaining loan interest balance from {formatIndianCurrency(prepaymentResult.originalInterest)} down to {formatIndianCurrency(prepaymentResult.newInterest)}.
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-450 uppercase font-bold">Tenure reduction</span>
                <span className="text-lg font-extrabold text-slate-700 dark:text-slate-350 font-mono mt-0.5">{prepaymentResult.tenureReduced} Months Saved</span>
                <p className="text-[10px] text-slate-450 mt-1 max-w-sm font-medium leading-normal">
                  Your loan repayment period will be shortened by {prepaymentResult.tenureReduced} months, helping you become debt-free faster.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Amortization Table Section */}
        <Card className="p-6 border border-slate-200/65 dark:border-slate-800 shadow-sm mt-3 select-none">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-705 pb-4 select-none">
            <div className="flex items-center gap-2">
              <TableProperties className="w-5 h-5 text-slate-500" />
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase leading-none font-display">
                  Amortization Schedule
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  Trace your principal and interest components across each period
                </p>
              </div>
            </div>

            {/* Toggle controls & CSV Export actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold gap-1">
                <button
                  onClick={() => setScheduleView('yearly')}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    scheduleView === 'yearly' ? 'bg-white dark:bg-slate-700 text-slate-850 dark:text-white shadow-sm font-bold' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => {
                    setScheduleView('monthly');
                    setMonthlyPage(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg cursor-pointer ${
                    scheduleView === 'monthly' ? 'bg-white dark:bg-slate-700 text-slate-850 dark:text-white shadow-sm font-bold' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  Monthly Detail
                </button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs p-2 py-1.5 leading-none font-extrabold uppercase border-slate-205 py-1"
                onClick={() => {
                  const header = scheduleView === 'yearly' ? 'Year,Principal Component,Interest Component,Ending Balance\n' : 'Month,Monthly Payment,Principal component,Interest Component,Outstanding Balance\n';
                  const dataset = scheduleView === 'yearly' ? schedule.yearly : schedule.monthly;
                  let csvStr = header;
                  dataset.forEach((row: any) => {
                    if (scheduleView === 'yearly') {
                      csvStr += `${row.year},${row.principal},${row.interest},${row.balance}\n`;
                    } else {
                      csvStr += `${row.period},${row.emi},${row.principal},${row.interest},${row.balance}\n`;
                    }
                  });
                  const blob = new Blob([csvStr], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `fincalc-loan-amortization-${scheduleView}.csv`;
                  a.click();
                }}
              >
                CSV Export
              </Button>
            </div>
          </div>

          <div className="mt-5 select-text">
            {scheduleView === 'yearly' ? (
              <Table
                columns={[
                  { header: 'Repayment Year', accessor: (row) => `Year ${row.year}`, align: 'left' },
                  { header: 'Principal component (₹)', accessor: (row) => formatIndianNumber(row.principal), align: 'right' },
                  { header: 'Interest Component (₹)', accessor: (row) => formatIndianNumber(row.interest), align: 'right' },
                  { header: 'Ending Balance (₹)', accessor: (row) => formatIndianCurrency(row.balance), align: 'right', className: 'text-brand-primary' },
                ]}
                data={schedule.yearly}
                keyExtractor={(row) => row.year}
              />
            ) : (
              <div className="flex flex-col gap-4.5 select-text">
                <Table
                  columns={[
                    { header: 'Period', accessor: (row) => `Month ${row.period}`, align: 'left' },
                    { header: 'EMI Repayment', accessor: (row) => formatIndianNumber(row.emi), align: 'right' },
                    { header: 'Principal (₹)', accessor: (row) => formatIndianNumber(row.principal), align: 'right' },
                    { header: 'Interest (₹)', accessor: (row) => formatIndianNumber(row.interest), align: 'right' },
                    { header: 'Remaining principal (₹)', accessor: (row) => formatIndianCurrency(row.balance), align: 'right', className: 'text-brand-primary' },
                  ]}
                  data={schedule.monthly.slice(monthlyPage * rowsPerPage, (monthlyPage + 1) * rowsPerPage)}
                  keyExtractor={(row) => row.period}
                />
                
                {/* Pagination Controls */}
                <div className="flex justify-between items-center bg-transparent mt-2 px-1 select-none">
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wide">
                    Showing Months {monthlyPage * rowsPerPage + 1} - {Math.min(tenureMonths, (monthlyPage + 1) * rowsPerPage)} of {tenureMonths}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={monthlyPage === 0}
                      onClick={() => setMonthlyPage((p) => Math.max(0, p - 1))}
                      className="px-3.5 py-1.5 shrink-0 text-xs font-bold uppercase leading-none rounded-xl"
                    >
                      Prev
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={(monthlyPage + 1) * rowsPerPage >= tenureMonths}
                      onClick={() => setMonthlyPage((p) => p + 1)}
                      className="px-3.5 py-1.5 shrink-0 text-xs font-bold uppercase leading-none rounded-xl"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </CalculatorLayout>
    </>
  );
};
export default EMICalculator;
