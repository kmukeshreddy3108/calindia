/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DonutChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  // Graceful pure SVG fallback in case charts fail resize loops in sandbox iframes
  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full h-56 flex items-center justify-center select-none relative">
      <ResponsiveContainer width="95%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="52%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={1} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: number) => [
              `${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)} (${((val / total) * 100).toFixed(1)}%)`,
              ''
            ]}
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
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DonutChart;
