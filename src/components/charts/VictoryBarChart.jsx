import React from 'react';

const data = [
  { age: '0-20', count: 3000 },
  { age: '20-40', count: 4500 },
  { age: '40-60', count: 12000 },
  { age: '60-80', count: 18000 },
  { age: '80+', count: 8000 },
];

const maxCount = Math.max(...data.map(d => d.count));

export const VictoryBarChart = () => {
  const barWidth = 40;
  const gap = 20;
  const chartHeight = 240;
  const chartWidth = data.length * (barWidth + gap) + gap + 50;
  const yAxisLabels = [0, 5000, 10000, 15000, 20000];

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`} width="100%" height="100%">
        {/* Y-axis grid lines and labels */}
        {yAxisLabels.map((val, i) => {
          const y = chartHeight - (val / 20000) * chartHeight;
          return (
            <g key={i}>
              <line x1="45" y1={y} x2={chartWidth} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x="40" y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{val >= 1000 ? `${val/1000}k` : val}</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.count / 20000) * chartHeight;
          const x = 50 + gap + i * (barWidth + gap);
          const y = chartHeight - barHeight;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill="#3b82f6"
                opacity="0.85"
              >
                <title>Count: {d.count.toLocaleString()}</title>
              </rect>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 16}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {d.age}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

