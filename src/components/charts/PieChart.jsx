import React, { useState } from 'react';

const defaultData = [
  { label: '1 Sample', value: 35200, color: '#3b82f6' },
  { label: '2 Samples', value: 5800, color: '#f97316' },
  { label: '3+ Samples', value: 2100, color: '#10b981' },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
}

export const PieChart = ({ data = defaultData, title }) => {
  const [hovered, setHovered] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 130, cy = 120, r = 90;

  let currentAngle = 0;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const midAngle = startAngle + angle / 2;
    const labelPos = polarToCartesian(cx, cy, r * 0.6, midAngle);

    return { ...d, startAngle, endAngle, midAngle, labelPos, index: i };
  });

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 260 240" width="260" height="220">
        <defs>
          <filter id="pie-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>

        {slices.map((s) => (
          <path
            key={s.index}
            d={describeArc(cx, cy, hovered === s.index ? r + 6 : r, s.startAngle, s.endAngle)}
            fill={s.color}
            stroke="#fff"
            strokeWidth="2"
            opacity={hovered !== null && hovered !== s.index ? 0.5 : 0.9}
            filter="url(#pie-shadow)"
            style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(s.index)}
            onMouseLeave={() => setHovered(null)}
          >
            <title>{`${s.label}: ${s.value.toLocaleString()} (${((s.value / total) * 100).toFixed(1)}%)`}</title>
          </path>
        ))}

        {/* Center label */}
        <circle cx={cx} cy={cy} r="42" fill="white" opacity="0.9" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">
          {(total / 1000).toFixed(1)}K
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fontWeight="500" fill="#94a3b8" textTransform="uppercase" letterSpacing="0.5">
          Patients
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '14px', marginTop: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#475569', fontWeight: 500 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: d.color, marginRight: 5, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} />
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};
