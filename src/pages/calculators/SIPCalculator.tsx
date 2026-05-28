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
import { BarChart } from '../../components/charts/BarChart';
import { calculateSIP, calculateSIPToReachGoal, calculateLumpSum } from '../../utils/calculators/sipCalculator';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { buildFAQSchema, buildCalculatorSchema } from '../../utils/seo/schemaTemplates';
import { SEOHead } from '../../components/seo/SEOHead';
import { PiggyBank, Target, HelpCircle, BookOpen, LineChart as ChartIcon, Sparkles } from 'lucide-react';

export const SIPCalculator: React.FC = () => {
  const location = useLocation();

  // Primary states
  const [activeTab, setActiveTab] = useState<'sip' | 'goal'>('sip');
  
  // SIP tab states
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000); // 10k standard
  const [annualReturn, setAnnualReturn] = useState<number>(12); // 12% standard Equity Mutual Fund return
  const [years, setYears] = useState<number>(15); // 15 years standard

  // Goal/Reverse SIP tab states
  const [targetAmount, setTargetAmount] = useState<number>(10000000); // 1 Crore target default
  const [goalReturn, setGoalReturn] = useState<number>(12);
  const [goalYears, setGoalYears] = useState<number>(15);

  // Restore state from Navigation History
  useEffect(() => {
    if (location.state?.restoreInputs) {
      const { monthlyAmount, annualReturn, years, activeTab: prevTab } = location.state.restoreInputs;
      if (monthlyAmount) setMonthlyAmount(Number(monthlyAmount));
      if (annualReturn) setAnnualReturn(Number(annualReturn));
      if (years) setYears(Number(years));
      if (prevTab) setActiveTab(prevTab as 'sip' | 'goal');
    }
  }, [location.state]);

  // Calculations
  const sipResult = calculateSIP(monthlyAmount, annualReturn, years);
  const lumpyResult = calculateLumpSum(monthlyAmount * years * 12, annualReturn, years); // equivalent lumpsum comparison

  const requiredMonthly = calculateSIPToReachGoal(targetAmount, goalReturn, goalYears);
  const goalResult = calculateSIP(requiredMonthly, goalReturn, goalYears);

  // Schema declarations
  const faqList = [
    {
      question: 'What is a Systematic Investment Plan (SIP)?',
      answer:
        'A Systematic Investment Plan (SIP) is an investment channel offered by mutual funds in India, allowing investors to invest disciplined small amounts periodically (weekly, monthly, quarterly) instead of making bulk lump sum investments.',
    },
    {
      question: 'What is the average expected SIP return rate in India?',
      answer:
        'Over long periods (10+ years), diversified large-cap and multi-cap equity mutual funds in India have traditionally generated annualized CAGR returns within the 12% to 15% range. However, mutual fund returns are market-linked and are not fixed.',
    },
    {
      question: 'How does the mutual fund SIP compound interest operate?',
      answer:
        'SIP mutual funds operate on compound growth principles, where dividends and capital gains are continuously reinvested to purchase more fund units. This leads to compounding returns over time, multiplying your net worth exponentially.',
    },
    {
      question: 'Which is better: SIP or Lumpsum in mutual funds?',
      answer:
        'For volatile equity markets, SIP is generally superior. It enables "rupee-cost averaging", meaning you purchase more units when markets are low and fewer units when markets are high. Lumpsums are better if investments are made during major market corrections.',
    },
    {
      question: 'Can I claim tax deductions on mutual fund SIPs?',
      answer:
        'Yes, you can register a SIP in ELSS (Equity Linked Savings Schemes) mutual funds to claim tax deductions up to ₹1.5 Lakhs per year under Section 80C of the Indian Income Tax Act. Note that ELSS SIPs carry a tight 3-year mandatory lock-in period.',
    },
    {
      question: 'What is rupee-cost averaging in SIP investments?',
      answer:
        'Rupee-cost averaging is a core benefit of SIP where since you invest a fixed amount regularly, you automatically buy more units of a fund when its Net Asset Value (NAV) is down and fewer units when NAV is up. This evens out market fluctuations and lowers average acquisition cost over time.',
    },
    {
      question: 'Can I pause, stop, or increase my SIP mid-way?',
      answer:
        'Yes, mutual fund SIPs are highly flexible. You can pause, stop, or skip instalments without attracting any penalties or administrative locks. You can also opt for a "Step Up SIP" to increase monthly targets as your salary increases.',
    },
    {
      question: 'How is mutual fund capital gains tax calculated in India?',
      answer:
        'Mutual fund capital gains in India are categorized by holding period. For equity funds, short-term capital gains (STCG, sold within 12 months) are taxed at 15%. Long-term capital gains (LTCG, held over 12 months) are taxed at 10% on gains exceeding ₹1 Lakh per year.',
    },
  ];

  const calculatorSchema = buildCalculatorSchema(
    'SIP Investment Calculator',
    'Evaluate future mutual fund systematic maturity savings assets, absolute growth returns, and wealth multipliers.',
    '/sip-calculator'
  );
  const faqSchema = buildFAQSchema(faqList);

  return (
    <>
      <SEOHead
        title="SIP Calculator India — Monthly Mutual Fund Systematic Plan"
        description="Check your future mutual fund SIP wealth compounding returns instantly. Compare SIP vs lump sum and calculate monthly SIPs required to reach target goals."
        canonical="/sip-calculator"
        schema={{ ...calculatorSchema, ...faqSchema }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-805 rounded-2xl p-1 gap-1 w-full max-w-sm mx-auto shadow-sm select-none">
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex-1 text-xs font-extrabold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'sip'
                ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm'
                : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <PiggyBank className="w-4 h-4 text-brand-primary" />
            Standard SIP Calculator
          </button>
          <button
            onClick={() => setActiveTab('goal')}
            className={`flex-1 text-xs font-extrabold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'goal'
                ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm'
                : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Target className="w-4 h-4 text-brand-accent scale-105" />
            Goal Planner (Reverse SIP)
          </button>
        </div>
      </div>

      {activeTab === 'sip' ? (
        <CalculatorLayout
          id="sip"
          name="SIP Mutual Fund Calculator"
          description="Evaluate future maturity assets, capital invested, absolute growth returns, and wealth multipliers in seconds."
          formula={{
            latex: 'FV = P × [ ( (1 + r)ⁿ - 1 ) / r ] × (1 + r)',
            explanation:
              'Where: FV is the maturity future value; P is the periodic investment amount; r is the monthly yield (expected annual returns / 12 / 100); and n is total monthly invest periods.',
          }}
          faqList={faqList}
          inputPanel={
            <div className="flex flex-col gap-5.5 select-none font-sans">
              <Input
                label="Monthly SIP Commitment"
                value={monthlyAmount}
                onChange={(v) => setMonthlyAmount(Math.max(0, Number(v) || 0))}
                prefixSymbol="₹"
                suffixSymbol={monthlyAmount >= 100000 ? `${(monthlyAmount / 100000).toFixed(1)} L` : 'INR'}
              />
              <Slider
                label="Adjust Investment"
                min={500}
                max={100000}
                step={500}
                value={monthlyAmount}
                onChange={setMonthlyAmount}
                formatValue={(val) => formatIndianCurrency(val, 0)}
              />

              <Input
                label="Expected Annual CAGR Return"
                value={annualReturn}
                onChange={(v) => setAnnualReturn(Math.max(0, parseFloat(v) || 0))}
                suffixSymbol="%"
              />
              <Slider
                label="Adjust Return Margin"
                min={1}
                max={30}
                step={0.5}
                value={annualReturn}
                onChange={setAnnualReturn}
                formatValue={(val) => `${val}%`}
              />

              <Input
                label="Investment Duration"
                value={years}
                onChange={(v) => setYears(Math.max(1, Number(v) || 1))}
                suffixSymbol="YEARS"
              />
              <Slider
                label="Adjust Tenure"
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={setYears}
                formatValue={(val) => `${val} Yrs`}
              />
            </div>
          }
          resultPanel={
            <ResultPanel
              type="sip"
              inputs={{ monthlyAmount, annualReturn, years, activeTab }}
              results={{ futureValue: sipResult.futureValue, totalInvested: sipResult.totalInvested, estimatedReturns: sipResult.estimatedReturns }}
              mainValue={sipResult.futureValue}
              mainLabel="Estimated Maturity Wealth"
              fileNamePre="fincalc-sip-wealth"
              secondaryMetrics={[
                { label: 'Total Invested Capital', value: sipResult.totalInvested, colorType: 'primary' },
                { label: 'Estimated Wealth Gain', value: sipResult.estimatedReturns, colorType: 'accent' },
                { label: 'Cumulative Lumpsum Yield', value: lumpyResult.futureValue, colorType: 'indigo' },
              ]}
              chartComponent={<BarChart data={sipResult.yearlyData} />}
            />
          }
          seoArticle={
            <div className="flex flex-col gap-4 select-text font-sans">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                The Power of Compounding in Indian Systematic Investments
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                Systematic Investment Plans (SIP) are highly regarded as the premier way to build massive household bags in modern India. Unlike lumpsum investing, SIP handles price timing risk automatically, smoothing out NAV movements through rupee-cost averaging.
              </p>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                <b>Compound Growth Curve:</b> In compound growth channels, your earnings begin making earnings of their own. Over short durations (3 to 5 years), the overall capital gains feel negligible. However, as your tenure cross-caps 15, 20, or 25 years, the curved return index begins climbing vertically, creating vast wealth sums.
              </p>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mt-1">
                SIP vs Lump Sum Comparison
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                While a lump sum requires you to time market corrections perfectly to avoid high starting valuations, SIP operates blind to market volatility. When markets are in a downward spiral, your automated monthly SIP buys a higher volume of equity units, accelerating your recovery once markets rally.
              </p>
            </div>
          }
        />
      ) : (
        <CalculatorLayout
          id="sip_goal"
          name="Goal SIP Planner"
          description="Reverse calculate required monthly systematic investments to achieve target corpuses (e.g. ₹1 Crore)."
          formula={{
            latex: 'P = FV × r / [ ((1 + r)ⁿ - 1) × (1 + r) ]',
            explanation:
              'Where: P is required monthly investment; FV represents your targeted goal corpus; r is monthly compound rate; and n is total monthly tenure periods.',
          }}
          faqList={faqList}
          inputPanel={
            <div className="flex flex-col gap-5.5 select-none font-sans">
              <Input
                label="Target Goal Wealth Corpus"
                value={targetAmount}
                onChange={(v) => setTargetAmount(Math.max(0, Number(v) || 0))}
                prefixSymbol="₹"
                suffixSymbol={targetAmount >= 10000000 ? `${(targetAmount / 10000000).toFixed(1)} Cr` : targetAmount >= 100000 ? `${(targetAmount / 100000).toFixed(1)} L` : 'INR'}
              />
              <Slider
                label="Adjust Target Corpus"
                min={100000}
                max={50000000}
                step={100000}
                value={targetAmount}
                onChange={setTargetAmount}
                formatValue={(val) => formatIndianCurrency(val, 0)}
              />

              <Input
                label="Expected Return CAGR"
                value={goalReturn}
                onChange={(v) => setGoalReturn(Math.max(0, parseFloat(v) || 0))}
                suffixSymbol="%"
              />
              <Slider
                label="Adjust Goal Return"
                min={1}
                max={30}
                step={0.5}
                value={goalReturn}
                onChange={setGoalReturn}
                formatValue={(val) => `${val}%`}
              />

              <Input
                label="Duration to Achieve Goal"
                value={goalYears}
                onChange={(v) => setGoalYears(Math.max(1, Number(v) || 1))}
                suffixSymbol="YEARS"
              />
              <Slider
                label="Adjust Time Horizon"
                min={1}
                max={40}
                step={1}
                value={goalYears}
                onChange={setGoalYears}
                formatValue={(val) => `${val} Yrs`}
              />
            </div>
          }
          resultPanel={
            <ResultPanel
              type="sip"
              inputs={{ targetAmount, goalReturn, goalYears, activeTab }}
              results={{ monthlyRequired: requiredMonthly, futureValue: goalResult.futureValue }}
              mainValue={requiredMonthly}
              mainLabel="Required Monthly Investment"
              fileNamePre="fincalc-goal-sip-requirements"
              secondaryMetrics={[
                { label: 'Your Target Corpus', value: targetAmount, colorType: 'accent' },
                { label: 'Total Invested Base', value: goalResult.totalInvested, colorType: 'primary' },
                { label: 'Interest Accumulated', value: goalResult.estimatedReturns, colorType: 'warning' },
              ]}
              chartComponent={<BarChart data={goalResult.yearlyData} />}
            />
          }
          seoArticle={
            <div className="flex flex-col gap-4 select-text font-sans">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                How to Goal-Plan Your Systematic Portfolios Backwards?
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                Most investors fail because they save randomly without concrete targets. Standard financial advisors map specific family checkpoints (e.g., child higher education fees or comfortable retirement corpuses) and formulate plans backwards.
              </p>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mt-1">
                Steps to Success:
              </h4>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-550 dark:text-slate-400 flex flex-col gap-1.5">
                <li>Identify the target corpus adjusting slightly for inflation factors.</li>
                <li>Set an asset allocation (e.g. 70% Equity and 30% Debt/FD) to estimate conservative returns CAGR (usually 12%).</li>
                <li>Utilize the Goal Planner tool to pinpoint the precise monthly savings ticket needed.</li>
              </ul>
            </div>
          }
        />
      )}
    </>
  );
};
export default SIPCalculator;
