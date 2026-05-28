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
import { LineChart } from '../../components/charts/LineChart';
import { calculateCompoundInterest } from '../../utils/calculators/ciCalculator';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { buildFAQSchema, buildCalculatorSchema } from '../../utils/seo/schemaTemplates';
import { SEOHead } from '../../components/seo/SEOHead';
import { Percent, TrendingUp, HelpCircle, BookOpen, LineChart as ChartIcon, Sparkles } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const location = useLocation();

  // Primary states
  const [principal, setPrincipal] = useState<number>(100000); // 1 Lakh standard
  const [rate, setRate] = useState<number>(10); // 10% standard compound rate
  const [years, setYears] = useState<number>(10); // 10 years standard duration
  const [frequency, setFrequency] = useState<number>(1); // 1 = yearly default comp cycle

  // Restore state from Navigation History
  useEffect(() => {
    if (location.state?.restoreInputs) {
      const { principal, rate, years, frequency } = location.state.restoreInputs;
      if (principal) setPrincipal(Number(principal));
      if (rate) setRate(Number(rate));
      if (years) setYears(Number(years));
      if (frequency !== undefined) setFrequency(Number(frequency));
    }
  }, [location.state]);

  const ciResult = calculateCompoundInterest(
    principal,
    rate,
    years,
    frequency
  );

  // Chart dataset
  const chartData = ciResult.yearlyBreakdown.map((row) => ({
    year: row.year,
    value: row.totalValue,
    simpleInterestValue: row.simpleInterestValue,
  }));

  // Schema declarations
  const faqList = [
    {
      question: 'What is Compound Interest?',
      answer:
        'Compound Interest is interest calculated on the initial principal capital plus all accumulated interest from previous periods. Unlike Simple Interest, it offers an exponential curve of wealth accumulation.',
    },
    {
      question: 'What is the standard formula for Compound Interest?',
      answer:
        'The formula is: A = P(1 + r/n)^(nt), where A is the maturity amount, P is the starting principal, r is the annual rate of interest, n is the compounding frequency per year, and t is time in years.',
    },
    {
      question: 'How do compounding frequencies affect overall yields?',
      answer:
        'Higher frequencies (e.g. daily, monthly) compound outstanding balances more regularly and produce slightly higher final maturity outcomes relative to quarterly or yearly frequencies under the exact nominal rates.',
    },
    {
      question: 'What is the rule of 72 in financial investing?',
      answer:
        'The Rule of 72 is an easy mental formula to estimate how long capital takes to double under compounding rates. Just divide 72 by the annual return CAGR. E.g. at a 12% return margin, capital doubles in approximately 6 years (72 / 12).',
    },
    {
      question: 'Is Compound Interest better than Simple Interest?',
      answer:
        'For investors, compounding is far superior, as your earnings begin multiplying continuously. For loan borrows, simple interest calculations are generally preferred since payments do not swell outstanding debt exponentially.',
    },
    {
      question: 'How does inflation affect the value of compounding?',
      answer:
        'While compounding helps accumulate large absolute nominal digits, inflation erodes the purchasing power of capital over time. To get real compound yields, always deduct the native inflation index from interest CAGR.',
    },
    {
      question: 'What are some popular compound investment avenues in India?',
      answer:
        'Top options in India include Equity Mutual Funds, Public Provident Fund (PPF), National Pension System (NPS), and long-term Bank Fixed Deposits locked under monthly or quarterly reinvestment plans.',
    },
    {
      question: 'Do tax obligations affect compounding wealth curves?',
      answer:
        'Yes, paying yearly taxes on interest yields dampens compounding because tax reductions diminish the reinvested base pool. Utilizing tax-free avenues like PPF or tax-deferred growth in equity mutual funds lets capital compound untouched.',
    },
  ];

  const calculatorSchema = buildCalculatorSchema(
    'Compound Interest Calculator',
    'Visualize potential compounding curves, compare values against Simple Interest, and trace annual accumulative steps.',
    '/compound-interest-calculator'
  );
  const faqSchema = buildFAQSchema(faqList);

  return (
    <>
      <SEOHead
        title="Compound Interest Calculator — Power of Compounding India"
        description="Verify how compounding interest intervals (daily, monthly, quarterly) multiply your starting capital relative to simple interest over long periods."
        canonical="/compound-interest-calculator"
        schema={{ ...calculatorSchema, ...faqSchema }}
      />

      <CalculatorLayout
        id="ci"
        name="Compound Interest Calculator"
        description="Visualize potential compounding curves, compare values against Simple Interest, and trace annual accumulative steps."
        formula={{
          latex: 'A = P × (1 + r / n) ^ (n × t)',
          explanation:
            'Where: A represents overall compound capital; P represents initial principal; r represents annual compounding rate; n represents frequency (1=yearly, 365=daily); and t represents tenure in years.',
        }}
        faqList={faqList}
        inputPanel={
          <div className="flex flex-col gap-5.5 select-none font-sans">
            <Input
              label="Starting Principal Capital"
              value={principal}
              onChange={(v) => setPrincipal(Math.max(0, Number(v) || 0))}
              prefixSymbol="₹"
              suffixSymbol={principal >= 100000 ? `${(principal / 100000).toFixed(1)} L` : 'INR'}
            />
            <Slider
              label="Adjust Principal"
              min={1000}
              max={10000000}
              step={1000}
              value={principal}
              onChange={setPrincipal}
              formatValue={(val) => formatIndianCurrency(val, 0)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Annual Interest Rate"
                value={rate}
                onChange={(v) => setRate(Math.max(0, parseFloat(v) || 0))}
                suffixSymbol="%"
              />
              <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent">
                <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Compounded Cycle</span>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                >
                  <option value={365}>Compounded Daily</option>
                  <option value={12}>Compounded Monthly</option>
                  <option value={4}>Compounded Quarterly</option>
                  <option value={2}>Compounded Half-Yearly</option>
                  <option value={1}>Compounded Yearly</option>
                </select>
              </div>
            </div>

            <Slider
              label="Adjust Rate Slabs"
              min={1}
              max={30}
              step={0.5}
              value={rate}
              onChange={setRate}
              formatValue={(val) => `${val}%`}
            />

            <Input
              label="Accrual Tenure (Years)"
              value={years}
              onChange={(v) => setYears(Math.max(1, Number(v) || 1))}
              suffixSymbol="YEARS"
            />
            <Slider
              label="Adjust Tenure Limits"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={setYears}
              formatValue={(val) => `${val} Years`}
            />
          </div>
        }
        resultPanel={
          <ResultPanel
            type="ci"
            inputs={{ principal, rate, years, frequency }}
            results={{ amount: ciResult.amount, interest: ciResult.interest, simpleInterest: ciResult.simpleInterest }}
            mainValue={ciResult.amount}
            mainLabel="Estimated Compound maturity"
            fileNamePre="fincalc-compound-wealth"
            secondaryMetrics={[
              { label: 'Initial Principal Invested', value: principal, colorType: 'primary' },
              { label: 'Compounded Net Interest', value: ciResult.interest, colorType: 'accent' },
              { label: 'Standard Simple Interest Yield', value: ciResult.simpleInterest, colorType: 'warning' },
              { label: 'Extra Earned (Compounding Edge)', value: ciResult.extraEarned, colorType: 'indigo' },
            ]}
            chartComponent={<LineChart data={chartData} />}
          />
        }
        seoArticle={
          <div className="flex flex-col gap-4 select-text font-sans">
            <h4 className="text-base font-bold text-slate-800 dark:text-white">
              The Astronomical Impact of Reinvesting Your Wealth Returns
            </h4>
            <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
              Compounding is often referred to as the "Eighth Wonder of the World". Under Simple Interest models, cash generates returns, but those earnings sit stagnant. Under Compounding models, those earnings are added back to the pool, exponentially expanding your wealth trajectory over time.
            </p>
          </div>
        }
      >
        {/* Cumulative Projections schedule lists */}
        <Card className="p-6 border border-slate-205 dark:border-slate-800 shadow-sm mt-3 select-text">
          <div className="flex items-center gap-2 mb-4 select-none">
            <TrendingUp className="w-5 h-5 text-slate-500" />
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 uppercase leading-none font-display">
                Yearly Growth Trajectory (Simple vs Compound)
              </h3>
              <p className="text-[10px] text-slate-440 mt-1">
                Pinpoint the exact margin of compounding returns over simple interest
              </p>
            </div>
          </div>

          <Table
            columns={[
              { header: 'Period Year', accessor: (row) => `Year ${row.year}`, align: 'left' },
              { header: 'Simple Yield Value (₹)', accessor: (row) => formatIndianNumber(row.simpleInterestValue), align: 'right' },
              { header: 'Compound Interest Earned (₹)', accessor: (row) => formatIndianNumber(row.interestEarned), align: 'right' },
              { header: 'Total Value (₹)', accessor: (row) => formatIndianCurrency(row.totalValue), align: 'right', className: 'text-brand-accent' },
            ]}
            data={ciResult.yearlyBreakdown}
            keyExtractor={(row) => row.year}
          />
        </Card>
      </CalculatorLayout>
    </>
  );
};
export default CompoundInterestCalculator;
