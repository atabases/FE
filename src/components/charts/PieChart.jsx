import React, { useState } from 'react';

const PALETTE = ['#2986e6', '#e65129', '#29e651', '#e6b029', '#8a29e6', '#e6298a', '#29e6e6', '#c4c4c4'];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  // Use L to center to make solid pie slices
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export const PieChart = ({ data = [], colorMap = {} }) => {
  const [hovered, setHovered] = useState(null);
  
  // Sort data descending to place largest slice first (optional, but good for aesthetics)
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const total = sortedData.reduce((sum, d) => sum + d.value, 0);

  const cx = 130, cy = 90, r = 70;

  let currentAngle = 0;
  const slices = sortedData.map((d, i) => {
    let angle = (d.value / total) * 360;
    if (angle >= 360) angle = 359.999; // SVG arc bug fix for full circle
    
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const midAngle = startAngle + angle / 2;
    // Position text inside the slice (slightly more than half way out)
    const textPos = polarToCartesian(cx, cy, r * 0.6, midAngle);
    
    // Assign color
    let color = colorMap[d.name] || PALETTE[i % PALETTE.length];
    // Special defaults based on reference images
    if (d.name === "Male") color = '#2986e6';
    if (d.name === "Female") color = '#dd6697';
    if (d.name === "Unknown" || d.name === "NA") color = '#c4c4c4';

    return { ...d, startAngle, endAngle, midAngle, textPos, color, index: i, percentage: ((d.value / total) * 100).toFixed(1) + '%' };
  });

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 260 180" width="100%" height="130" style={{ overflow: 'visible' }}>
        <defs>
          <filter id="pie-shadow" x="-10%" y="-10%" width="120%" height="120%">
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
              filter="url(#pie-shadow)"
              style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
              onMouseEnter={() => setHovered(s.index)}
              onMouseLeave={() => setHovered(null)}
            >
              <title>{`${s.name}: ${s.value} (${s.percentage})`}</title>
            </path>
            
            {/* Show value inside if there are multiple slices and this slice is big enough, or if it's the only slice, show it in center */}
            {((slices.length === 1) || (slices.length > 1 && s.value / total > 0.05)) && (
              <text 
                x={slices.length === 1 ? cx : s.textPos.x} 
                y={slices.length === 1 ? cy + 6 : s.textPos.y + 4} 
                textAnchor="middle" 
                fill="#fff" 
                fontSize={slices.length === 1 ? "18" : "12"} 
                fontWeight="bold"
                pointerEvents="none"
              >
                {s.value}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
