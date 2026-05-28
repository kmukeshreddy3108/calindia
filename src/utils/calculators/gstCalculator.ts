/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GSTCalculatorResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  type: 'exclusive' | 'inclusive';
}

export const GST_SLABS = [0, 0.1, 0.25, 3, 5, 12, 18, 28];

export function calculateGST(
  amount: number,
  gstRate: number,
  type: 'exclusive' | 'inclusive' = 'exclusive'
): GSTCalculatorResult {
  if (type === 'exclusive') {
    // Add GST to base price
    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = gstAmount;

    return {
      baseAmount: amount,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      type: 'exclusive',
    };
  } else {
    // Extract GST from inclusive price
    const baseAmount = amount / (1 + gstRate / 100);
    const gstAmount = amount - baseAmount;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const igst = gstAmount;

    return {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: amount,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      type: 'inclusive',
    };
  }
}
