/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { formatToLakhCrore } from '../../utils/formatters';

interface BarChartProps {
  data: {
    year: number;
    invested: number;
    returns: number;
    value: number;
  }[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Filter labels to keep it uncluttered on smaller screens (e.g., every 2 or 5 years)
  const maxYears = data.length;
  const interval = maxYears > 15 ? 4 : maxYears > 8 ? 1 : 0;

  return (
    <div className="w-full h-56 flex items-center justify-center select-none">
      <ResponsiveContainer width="95%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            interval={interval}
          />
          <YAxis
            tickFormatter={(val) => formatToLakhCrore(val).replace('₹', '')}
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatToLakhCrore(value),
              name === 'invested' ? 'Total Put In' : 'Accrued Profit'
            ]}
            labelFormatter={(label) => `Year: ${label}`}
            contentStyle={{
              background: '#0F172A',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#FFFFFF'
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                {value === 'invested' ? 'Capital Invested' : 'Estimated Growth'}
              </span>
            )}
          />
          <Bar dataKey="invested" stackId="a" fill="#0A7CFF" radius={[0, 0, 0, 0]} />
          <Bar dataKey="returns" stackId="a" fill="#00C48C" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default BarChart;
