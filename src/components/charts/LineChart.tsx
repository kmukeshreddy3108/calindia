/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatToLakhCrore } from '../../utils/formatters';

interface LineChartProps {
  data: {
    year: number;
    value: number;
    simpleInterestValue?: number;
  }[];
}

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-56 flex items-center justify-center select-none">
      <ResponsiveContainer width="95%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A7CFF" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#0A7CFF" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Years', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
          />
          <YAxis
            tickFormatter={(val) => formatToLakhCrore(val).replace('₹', '')}
            tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            formatter={(value: number) => [
              formatToLakhCrore(value),
              'Accumulated Capital'
            ]}
            labelFormatter={(label) => `Year: ${label}`}
            contentStyle={{
              background: '#0F172A',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '605',
              color: '#FFFFFF'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0A7CFF"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#growthGrad)"
          />
          {data[0]?.simpleInterestValue !== undefined && (
            <Area
              type="monotone"
              dataKey="simpleInterestValue"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LineChart;
