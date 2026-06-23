import React, { useState } from 'react';

const defaultData = [
  { label: '≤30', value: 1 },
  { label: '30', value: 0 },
  { label: '35', value: 1 },
  { label: '40', value: 0 },
  { label: '45', value: 0 },
  { label: '50', value: 1 },
  { label: '55', value: 4 },
  { label: '60', value: 3 },
  { label: '65', value: 2 },
  { label: '70', value: 5 },
  { label: '75', value: 3 },
  { label: '', value: 0 },
  { label: '>75', value: 3 },
];

export const BarChart = ({ data = defaultData }) => {
  const [hovered, setHovered] = useState(null);
  const maxVal = Math.max(1, ...data.map(d => d.value)); // Ensure at least 1
  
  // Generate 5 dynamic ticks based on maxVal
  const yTicks = [];
  for (let i = 1; i <= 5; i++) {
    yTicks.push(Math.ceil((maxVal / 5) * i));
  }
  // Optional: Make ticks unique if maxVal is small (e.g. 2)
  const uniqueTicks = [...new Set(yTicks)];

  return (
    <div style={{ width: '100%', height: '100%', padding: '4px 6px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

        {/* Y-axis labels */}
        <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', paddingBottom: 22, paddingRight: 4, minWidth: 18 }}>
          {uniqueTicks.map((val) => (
            <span key={val} style={{ fontSize: 9, color: '#333', fontWeight: 500, lineHeight: 1, textAlign: 'right' }}>
              {val}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1.5px solid #333', borderBottom: '1.5px solid #333' }}>

          {/* Grid + bars */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>

            {/* Horizontal grid lines */}
            {uniqueTicks.map((val) => (
              <div
                key={val}
                style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  bottom: `${(val / maxVal) * 100}%`,
                  borderBottom: '1px dashed #ddd',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Vertical grid lines */}
            {data.map((_, i) => (
              <div
                key={`vg-${i}`}
                style={{
                  position: 'absolute',
                  top: 0, bottom: 0,
                  left: `${((i + 0.5) / data.length) * 100}%`,
                  borderLeft: '1px dashed #eee',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Bars */}
            {data.map((d, i) => {
              const pct = d.value > 0 ? (d.value / maxVal) * 100 : 0;
              const isHov = hovered === i;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  onMouseEnter={() => d.value > 0 && setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isHov && (
                    <div style={{
                      position: 'absolute',
                      bottom: `calc(${pct}% + 4px)`,
                      background: '#1e293b', color: '#fff',
                      fontSize: 9, fontWeight: 600,
                      padding: '2px 6px', borderRadius: 4,
                      whiteSpace: 'nowrap', zIndex: 10,
                    }}>
                      {d.value}
                    </div>
                  )}
                  {d.value > 0 && (
                    <div
                      style={{
                        width: '78%',
                        height: `${pct}%`,
                        backgroundColor: '#2986e6',
                        cursor: 'pointer',
                        opacity: isHov ? 1 : 0.88,
                        transition: 'opacity 0.15s',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* X-axis labels (rotated) */}
          <div style={{ display: 'flex', height: 22, overflow: 'visible' }}>
            {data.map((d, i) => (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                {d.label && (
                  <span style={{
                    position: 'absolute',
                    top: 3,
                    left: '50%',
                    fontSize: 8,
                    color: '#333',
                    fontWeight: 500,
                    transform: 'translateX(-50%) rotate(-45deg)',
                    transformOrigin: 'top center',
                    whiteSpace: 'nowrap',
                  }}>
                    {d.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
