import React, { useState } from 'react';

const defaultData = [
  { age: '0-20', count: 3000 },
  { age: '20-40', count: 4500 },
  { age: '40-60', count: 12000 },
  { age: '60-80', count: 18000 },
  { age: '80+', count: 8000 },
];

export const VictoryBarChart = ({ data = defaultData }) => {
  const [hovered, setHovered] = useState(null);

  const maxCount = 20000;
  const padding = { top: 12, right: 12, bottom: 28, left: 40 };
  const svgWidth = 320;
  const svgHeight = 200;
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  const barCount = data.length;
  const barGap = 16;
  const barWidth = (chartWidth - barGap * (barCount + 1)) / barCount;

  const yTicks = [0, 5000, 10000, 15000, 20000];

  const colors = ['#6366f1', '#3b82f6', '#0ea5e9', '#14b8a6', '#8b5cf6'];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          {colors.map((color, i) => (
            <linearGradient key={i} id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.7" />
            </linearGradient>
          ))}
          <filter id="bar-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Y-axis grid lines + labels */}
        {yTicks.map((val, i) => {
          const y = padding.top + chartHeight - (val / maxCount) * chartHeight;
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={svgWidth - padding.right}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={val === 0 ? "0" : "4 3"}
              />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="Inter, sans-serif">
                {val >= 1000 ? `${val / 1000}k` : val}
              </text>
            </g>
          );
        })}

        {/* Bars + X labels */}
        {data.map((d, i) => {
          const barHeight = (d.count / maxCount) * chartHeight;
          const x = padding.left + barGap + i * (barWidth + barGap);
          const y = padding.top + chartHeight - barHeight;
          const isHov = hovered === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Bar */}
              <rect
                x={x}
                y={isHov ? y - 3 : y}
                width={barWidth}
                height={isHov ? barHeight + 3 : barHeight}
                rx="5"
                ry="5"
                fill={`url(#bar-grad-${i % colors.length})`}
                filter="url(#bar-shadow)"
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Hover tooltip */}
              {isHov && (
                <g>
                  <rect
                    x={x + barWidth / 2 - 38}
                    y={y - 32}
                    width="76"
                    height="24"
                    rx="6"
                    fill="#1e293b"
                    opacity="0.92"
                  />
                  <polygon
                    points={`${x + barWidth / 2 - 5},${y - 8} ${x + barWidth / 2 + 5},${y - 8} ${x + barWidth / 2},${y - 2}`}
                    fill="#1e293b"
                    opacity="0.92"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 16}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="white"
                    fontFamily="Inter, sans-serif"
                  >
                    {d.count.toLocaleString()}
                  </text>
                </g>
              )}

              {/* X-axis label */}
              <text
                x={x + barWidth / 2}
                y={padding.top + chartHeight + 18}
                textAnchor="middle"
                fontSize="11"
                fontWeight="500"
                fill="#64748b"
                fontFamily="Inter, sans-serif"
              >
                {d.age}
              </text>
            </g>
          );
        })}

        {/* Y-axis title */}
        <text
          x={14}
          y={padding.top + chartHeight / 2}
          textAnchor="middle"
          fontSize="10"
          fill="#94a3b8"
          fontFamily="Inter, sans-serif"
          transform={`rotate(-90, 14, ${padding.top + chartHeight / 2})`}
        >
          Patient Count
        </text>

        {/* X-axis title */}
        <text
          x={padding.left + chartWidth / 2}
          y={svgHeight - 2}
          textAnchor="middle"
          fontSize="10"
          fill="#94a3b8"
          fontFamily="Inter, sans-serif"
        >
          Age Group
        </text>
      </svg>
    </div>
  );
};
