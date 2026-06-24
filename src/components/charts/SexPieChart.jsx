import React, { useState } from 'react';

const defaultData = [
  { label: 'Male', value: 16, percentage: '69.6%', color: '#2a80db' },
  { label: 'Female', value: 7, percentage: '30.4%', color: '#dd6697' },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export const SexPieChart = ({ data = defaultData }) => {
  const [hovered, setHovered] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 130, cy = 90, r = 70;

  let currentAngle = 0;
  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const midAngle = startAngle + angle / 2;
    // Position text inside the slice
    const textPos = polarToCartesian(cx, cy, r * 0.6, midAngle);

    return { ...d, startAngle, endAngle, midAngle, textPos, index: i };
  });

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 260 180" width="100%" height="130" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="sex-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {slices.map((s) => (
          <g key={s.index}>
            <path
              d={describeArc(cx, cy, hovered === s.index ? r + 4 : r, s.startAngle, s.endAngle)}
              fill={s.color}
              stroke="#fff"
              strokeWidth="2"
              opacity={hovered !== null && hovered !== s.index ? 0.6 : 1}
              filter="url(#sex-shadow)"
              style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(s.index)}
              onMouseLeave={() => setHovered(null)}
            >
              <title>{`${s.label}: ${s.value} (${s.percentage})`}</title>
            </path>
            
            {/* Number inside slice */}
            <text 
              x={s.textPos.x} 
              y={s.textPos.y + 4} 
              textAnchor="middle" 
              fill="#fff" 
              fontSize="12" 
              fontWeight="bold"
              pointerEvents="none"
            >
              {s.value}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '0px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', fontSize: '11px', color: '#333', fontWeight: 500 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: d.color, marginRight: 6 }} />
            {d.label}: {d.value} ({d.percentage})
          </div>
        ))}
      </div>
    </div>
  );
};
