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
import { Button } from '../../components/ui/Button';
import { DonutChart } from '../../components/charts/DonutChart';
import { calculateGST, GST_SLABS } from '../../utils/calculators/gstCalculator';
import { formatIndianCurrency, formatIndianNumber } from '../../utils/formatters';
import { buildFAQSchema, buildCalculatorSchema } from '../../utils/seo/schemaTemplates';
import { SEOHead } from '../../components/seo/SEOHead';
import { PercentSquare, Receipt, Plus, Trash2, Calendar } from 'lucide-react';

interface InvoiceRow {
  id: string;
  name: string;
  price: number;
  qty: number;
  gstRate: number;
  type: 'exclusive' | 'inclusive';
}

export const GSTCalculator: React.FC = () => {
  const location = useLocation();

  // Primary calculator states
  const [amount, setAmount] = useState<number>(10000); // 10k standard
  const [gstRate, setGstRate] = useState<number>(18); // 18% standard service slab
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [isInterState, setIsInterState] = useState<boolean>(false); // Intra=CGST+SGST, Inter=IGST

  // Bulk Invoice module states
  const [isBulkMode, setIsBulkMode] = useState<boolean>(false);
  const [invoiceRows, setInvoiceRows] = useState<InvoiceRow[]>([
    { id: '1', name: 'Raw Material A', price: 5000, qty: 1, gstRate: 18, type: 'exclusive' },
    { id: '2', name: 'Packaging Bags', price: 1200, qty: 5, gstRate: 12, type: 'exclusive' },
  ]);

  // Restore state from Navigation History
  useEffect(() => {
    if (location.state?.restoreInputs) {
      const { amount, gstRate, type, isInterState, isBulkMode } = location.state.restoreInputs;
      if (amount) setAmount(Number(amount));
      if (gstRate) setGstRate(Number(gstRate));
      if (type) setType(type as 'exclusive' | 'inclusive');
      if (isInterState !== undefined) setIsInterState(Boolean(isInterState));
      if (isBulkMode !== undefined) setIsBulkMode(Boolean(isBulkMode));
    }
  }, [location.state]);

  const gstResult = calculateGST(amount, gstRate, type);

  // Chart dataset
  const donutData = [
    { name: 'Untaxed Base Goods', value: gstResult.baseAmount, color: '#0A7CFF' },
    { name: 'Total Tax (GST)', value: gstResult.gstAmount, color: '#FF6B35' },
  ];

  // Bulk items computation
  const handleAddRow = () => {
    const newRow: InvoiceRow = {
      id: Math.random().toString(36).substring(2, 9),
      name: `Line item ${invoiceRows.length + 1}`,
      price: 1000,
      qty: 1,
      gstRate: 18,
      type: 'exclusive',
    };
    setInvoiceRows([...invoiceRows, newRow]);
  };

  const handleUpdateRow = (id: string, field: keyof InvoiceRow, value: any) => {
    setInvoiceRows(
      invoiceRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleDeleteRow = (id: string) => {
    setInvoiceRows(invoiceRows.filter((row) => row.id !== id));
  };

  // Bulk totals
  const bulkTotals = invoiceRows.reduce(
    (totals, row) => {
      const lineCost = row.price * row.qty;
      const res = calculateGST(lineCost, row.gstRate, row.type);
      totals.baseSum += res.baseAmount;
      totals.taxSum += res.gstAmount;
      totals.grandSum += res.totalAmount;
      return totals;
    },
    { baseSum: 0, taxSum: 0, grandSum: 0 }
  );

  // Schema declarations
  const faqList = [
    {
      question: 'What is Goods and Services Tax (GST) in India?',
      answer:
        'Goods and Services Tax (GST) is a unified, multi-stage, destination-based indirect tax implemented on July 1, 2017. It replaced multiple Central and State indirect levies like VAT, Excise, Luxury Tax, and Service Tax.',
    },
    {
      question: 'How are CGST, SGST, and IGST divided on invoices?',
      answer:
        'CGST (Central GST) and SGST (State GST) apply on inter-state commercial transactions, in equal shares (50% each of the rate slab). IGST (Integrated GST) applies on interstate service boundaries, taking 100% of the tax rate.',
    },
    {
      question: 'What are the main GST tax rate slabs in India?',
      answer:
        'The standard GST slabs in India are 0% (essential goods), 5% (daily need products), 12% (standard rate), 18% (services and regular electronics), and 28% (luxury/sin goods). Extra rates like 3% for Gold and 0.25% for stones also apply.',
    },
    {
      question: 'What is the standard formula for adding GST (exclusive)?',
      answer:
        'To add GST: GST Amount = Base Value × (GST% / 100). Total Invoiced Amount = Base Value + GST Amount.',
    },
    {
      question: 'What is the formula to extract GST from an inclusive price?',
      answer:
        'To extract GST: Base Value = Inclusive Price / (1 + (GST% / 100)). GST Tax Component = Inclusive Price - Base Value.',
    },
    {
      question: 'What is the GST composition scheme?',
      answer:
        'The composition scheme is a taxpayer-friendly option for small businesses (turnover below ₹1.5 Crores) to pay tax at a fixed lowered rate on their sales turnover without having to worry about complex monthly compliance filing.',
    },
    {
      question: 'When is dynamic, automated e-invoicing mandatory?',
      answer:
        'E-invoicing under standard GST systems is mandatory for active registered taxpayers whose aggregate annual turnover in any previous fiscal year exceeds ₹5 Crores.',
    },
    {
      question: 'Is GST applicable on salary in India?',
      answer:
        'No, GST does not apply to services provided by employees to employers under standard employment agreements. Salary payouts are subject only to direct personal income tax rules.',
    },
  ];

  const calculatorSchema = buildCalculatorSchema(
    'GST Tax Calculator',
    'Instantly add GST to untaxed prices or extract tax segments from inclusive pricing structures.',
    '/gst-calculator'
  );
  const faqSchema = buildFAQSchema(faqList);

  return (
    <>
      <SEOHead
        title="GST Calculator India — Add or Extract GST Slabs Online"
        description="Calculate CGST, SGST, and IGST division splits instantly. Toggle between tax inclusive and exclusive calculations and generate multiple line-item commercial invoice records."
        canonical="/gst-calculator"
        schema={{ ...calculatorSchema, ...faqSchema }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-850 rounded-2xl p-1 gap-1 w-full max-w-sm mx-auto shadow-sm select-none">
          <button
            onClick={() => setIsBulkMode(false)}
            className={`flex-1 text-xs font-extrabold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
              !isBulkMode
                ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm'
                : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <PercentSquare className="w-4 h-4 text-brand-primary" />
            Standard GST Slabs
          </button>
          <button
            onClick={() => setIsBulkMode(true)}
            className={`flex-1 text-xs font-extrabold py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-all ${
              isBulkMode
                ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm'
                : 'text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-750'
            }`}
          >
            <Receipt className="w-4 h-4 text-brand-accent scale-105" />
            Bulk Invoice Biller
          </button>
        </div>
      </div>

      {!isBulkMode ? (
        <CalculatorLayout
          id="gst"
          name="GST Tax Utility"
          description="Instantly add GST to untaxed prices or extract tax segments from inclusive pricing structures."
          formula={{
            latex: 'Base = Taxed Price / (1 + Rate%)',
            explanation:
              'Where: Adding GST = Base Cost × Slabs%; Extracting GST = Net Price - [ Net Price / (1 + Slabs%) ].',
          }}
          faqList={faqList}
          inputPanel={
            <div className="flex flex-col gap-5.5 select-none font-sans">
              <Input
                label="Transaction Valuation (Price)"
                value={amount}
                onChange={(v) => setAmount(Math.max(0, Number(v) || 0))}
                prefixSymbol="₹"
              />
              <Slider
                label="Adjust Price"
                min={100}
                max={5000000}
                step={100}
                value={amount}
                onChange={setAmount}
                formatValue={(val) => formatIndianCurrency(val, 0)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent">
                  <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Computation Mode</span>
                  <div className="flex bg-slate-100 dark:bg-slate-805 rounded-xl p-1 gap-1">
                    <button
                      onClick={() => setType('exclusive')}
                      className={`flex-1 text-xs font-bold py-1.5 rounded-lg cursor-pointer ${
                        type === 'exclusive' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-450 hover:bg-slate-50'
                      }`}
                    >
                      Exclusive (+)
                    </button>
                    <button
                      onClick={() => setType('inclusive')}
                      className={`flex-1 text-xs font-bold py-1.5 rounded-lg cursor-pointer ${
                        type === 'inclusive' ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-450 hover:bg-slate-50'
                      }`}
                    >
                      Inclusive (&times;)
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 focus-within:ring-2 bg-transparent opacity-100">
                  <span className="text-xs font-semibold uppercase text-slate-450 tracking-wider">Indian Slabs</span>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  >
                    {GST_SLABS.map((slab) => (
                      <option key={slab} value={slab}>
                        {slab}% Standard Slab
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-5 mt-2 flex flex-col gap-4">
                <div className="flex justify-between items-center bg-transparent">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase flex items-center gap-1.5 leading-none">
                      CGST & SGST Split Rule
                    </h3>
                    <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1">
                      Check transaction boundaries: local status or interstate
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsInterState(!isInterState)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer ${
                      isInterState ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-primary/10 text-brand-primary'
                    }`}
                  >
                    {isInterState ? 'Inter-state (IGST)' : 'Intra-state (CGST+SGST)'}
                  </button>
                </div>
              </div>
            </div>
          }
          resultPanel={
            <ResultPanel
              type="gst"
              inputs={{ amount, gstRate, type, isInterState, isBulkMode }}
              results={{ baseAmount: gstResult.baseAmount, gstAmount: gstResult.gstAmount, totalAmount: gstResult.totalAmount }}
              mainValue={gstResult.totalAmount}
              mainLabel={type === 'exclusive' ? 'Total (Tax Added)' : 'Base Cost (Tax Extracted)'}
              fileNamePre="fincalc-gst-billing"
              secondaryMetrics={[
                { label: 'Untaxed Base value', value: gstResult.baseAmount, colorType: 'primary' },
                { label: 'Total Indirect GST Tax', value: gstResult.gstAmount, colorType: 'warning' },
                {
                  label: isInterState ? 'Integrated IGST Tax' : 'Split CGST % SGST (Each)',
                  value: isInterState ? gstResult.igst : gstResult.cgst,
                  colorType: isInterState ? 'indigo' : 'accent',
                },
              ]}
              chartComponent={<DonutChart data={donutData} />}
            />
          }
          seoArticle={
            <div className="flex flex-col gap-4 select-text font-sans">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                How GST Is Split on Invoices for Local vs Outside Transactions
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                GST is divided into three forms based on geographical supply locations:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-550 dark:text-slate-400 flex flex-col gap-1.5">
                <li><b>Intra-State:</b> When supply takes place inside the same home boundary, standard tax is divided equally into **CGST** and **SGST** elements.</li>
                <li><b>Inter-State:</b> When supply crosses state boundaries, 100% of the tax goes to the **IGST** (Integrated) collection channel.</li>
              </ul>
              <h4 className="text-base font-bold text-slate-800 dark:text-white mt-1">
                Indian Standard Slabs Explanation
              </h4>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400">
                Most services and household tech sit under the 18% tax category. Everyday grocery needs are mostly placed under 5% or 12%, while luxury vehicles or sin items attract the highest 28% plus state cess additions.
              </p>
            </div>
          }
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-6">
          <Card className="p-6 border border-slate-205 dark:border-slate-800 shadow-sm select-text select-none">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-750 pb-4 mb-5">
              <div>
                <h2 className="text-base font-extrabold text-slate-805 dark:text-slate-150 font-display">
                  Interactive Bulk Bill Worksheet
                </h2>
                <p className="text-xs text-slate-400">
                  Compile multiple items, select individual rates, and get consolidated invoice figures.
                </p>
              </div>
              <Button
                variant="accent"
                size="sm"
                className="gap-1 px-3 cursor-pointer text-xs font-bold leading-none py-2 rounded-xl"
                onClick={handleAddRow}
              >
                <Plus className="w-4 h-4" />
                Add Item Row
              </Button>
            </div>

            {/* List */}
            <div className="overflow-x-auto select-none select-text">
              <table className="w-full text-left text-xs text-slate-500 divide-y divide-slate-100 dark:divide-slate-750">
                <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3 text-right">Price per item (₹)</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">GST rate</th>
                    <th className="p-3 text-center">Tax Type</th>
                    <th className="p-3 text-right">Subtotal Output</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750/30 font-medium">
                  {invoiceRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                      <td className="p-2 min-w-[150px]">
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => handleUpdateRow(row.id, 'name', e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs focus:ring-1 focus:ring-brand-primary focus:outline-none font-semibold"
                        />
                      </td>
                      <td className="p-2 text-right">
                        <input
                          type="number"
                          value={row.price}
                          onChange={(e) => handleUpdateRow(row.id, 'price', Math.max(0, Number(e.target.value) || 0))}
                          className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs max-w-[100px] text-right focus:ring-1 focus:ring-brand-primary focus:outline-none leading-none font-semibold font-mono"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) => handleUpdateRow(row.id, 'qty', Math.max(1, Number(e.target.value) || 1))}
                          className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs max-w-[60px] text-center focus:ring-1 focus:ring-brand-primary focus:outline-none"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <select
                          value={row.gstRate}
                          onChange={(e) => handleUpdateRow(row.id, 'gstRate', Number(e.target.value))}
                          className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs focus:outline-none"
                        >
                          {GST_SLABS.map((s) => (
                            <option key={s} value={s}>
                              {s}%
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2 text-center">
                        <select
                          value={row.type}
                          onChange={(e) => handleUpdateRow(row.id, 'type', e.target.value)}
                          className="px-2 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg text-xs focus:outline-none"
                        >
                          <option value="exclusive">Exclusive (+)</option>
                          <option value="inclusive">Inclusive (&times;)</option>
                        </select>
                      </td>
                      <td className="p-2 text-right font-mono font-bold text-slate-850 dark:text-slate-100">
                        {formatIndianCurrency(calculateGST(row.price * row.qty, row.gstRate, row.type).totalAmount)}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleDeleteRow(row.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Overall Invoice Summary Card */}
            <div className="mt-8 border-t border-slate-100 dark:border-slate-755 pt-6 max-w-sm ml-auto select-text select-none">
              <h3 className="text-xs font-extrabold tracking-wide text-slate-400 uppercase">
                Consolidated Billing Receipt
              </h3>
              <div className="flex flex-col gap-3 mt-4 text-xs font-semibold">
                <div className="flex justify-between items-center text-slate-550 dark:text-slate-400">
                  <span>Gross Untaxed Cost</span>
                  <span className="font-mono">{formatIndianCurrency(bulkTotals.baseSum)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-550 dark:text-slate-400">
                  <span>Accrued GST Indirect Tax</span>
                  <span className="font-mono text-brand-warning">{formatIndianCurrency(bulkTotals.taxSum)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-extrabold text-slate-905 dark:text-white border-t border-slate-100 dark:border-slate-755 pt-3">
                  <span>Estimated grand Total</span>
                  <span className="font-mono text-brand-accent text-base">{formatIndianCurrency(bulkTotals.grandSum)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};
export default GSTCalculator;
