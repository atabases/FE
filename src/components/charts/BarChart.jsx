import React, { useState } from 'react';

const defaultData = [
  { label: '0-20', value: 3000 },
  { label: '20-40', value: 4500 },
  { label: '40-60', value: 12000 },
  { label: '60-80', value: 18000 },
  { label: '80+', value: 8000 },
];

export const BarChart = ({ data = defaultData, title = 'Age at Diagnosis' }) => {
  const [hovered, setHovered] = useState(null);
  const maxVal = Math.max(...data.map(d => d.value));
  const yTicks = 5;

  return (
    <div style={{ width: '100%', height: '100%', padding: '8px 12px 4px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Chart area */}
      <div style={{ flex: 1, display: 'flex', gap: 0, minHeight: 0 }}>
        {/* Y-axis labels */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 20, paddingRight: 6, minWidth: 32 }}>
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const val = maxVal - (maxVal / yTicks) * i;
            return (
              <span key={i} style={{ fontSize: 9, color: '#94a3b8', textAlign: 'right', lineHeight: 1 }}>
                {val >= 1000 ? `${Math.round(val / 1000)}k` : val}
              </span>
            );
          })}
        </div>

        {/* Bars area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Grid + bars container */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            {/* Grid lines */}
            {Array.from({ length: yTicks + 1 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  bottom: `${(i / yTicks) * 100}%`,
                  borderBottom: i === 0 ? '1px solid #e2e8f0' : '1px dashed #f1f5f9',
                }}
              />
            ))}

            {/* Bars */}
            {data.map((d, i) => {
              const pct = (d.value / maxVal) * 100;
              const isHov = hovered === i;
              return (
                <div
                  key={i}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', position: 'relative', zIndex: 1 }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Tooltip */}
                  {isHov && (
                    <div style={{
                      position: 'absolute',
                      bottom: `calc(${pct}% + 6px)`,
                      background: '#1e293b',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: 5,
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                    }}>
                      {d.value.toLocaleString()}
                      <div style={{
                        position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
                        borderTop: '4px solid #1e293b',
                      }} />
                    </div>
                  )}
                  {/* Bar */}
                  <div
                    style={{
                      width: '70%',
                      height: `${pct}%`,
                      background: `linear-gradient(180deg, #3b82f6, #6366f1)`,
                      borderRadius: '4px 4px 0 0',
                      opacity: isHov ? 1 : 0.82,
                      transform: isHov ? 'scaleY(1.02)' : 'scaleY(1)',
                      transformOrigin: 'bottom',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', gap: 6, paddingTop: 4 }}>
            {data.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 9, color: '#64748b', fontWeight: 500 }}>
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
