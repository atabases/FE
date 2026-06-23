import React from 'react';

export const DashboardTable = ({ title, columns = ["Name", "#", "Freq"], data = [], nameKey="name", countKey="count", freqKey="freq" }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', fontSize: '11px', color: '#333' }}>
      {/* Header */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', padding: '4px 8px', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
        <div style={{ flex: 1 }}>{columns[0]}</div>
        <div style={{ width: '40px', textAlign: 'right' }}>{columns[1]}</div>
        <div style={{ width: '50px', textAlign: 'right' }}>{columns[2]}</div>
      </div>
      
      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {data.map((row, i) => (
          <div key={i} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', padding: '4px 8px', alignItems: 'center' }}>
            <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={row[nameKey]}>
              {row[nameKey]}
            </div>
            <div style={{ width: '40px', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
              <input type="checkbox" style={{ margin: 0, width: '10px', height: '10px' }} />
              {row[countKey]}
            </div>
            <div style={{ width: '50px', textAlign: 'right' }}>
              {row[freqKey]}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
