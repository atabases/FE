import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip, VictoryTheme } from 'victory';

const data = [
  { age: '0-20', count: 3000 },
  { age: '20-40', count: 4500 },
  { age: '40-60', count: 12000 },
  { age: '60-80', count: 18000 },
  { age: '80+', count: 8000 },
];

export const VictoryBarChart = () => {
  return (
    <div style={{ height: '100%', width: '100%', minHeight: '300px' }}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        padding={{ top: 20, bottom: 40, left: 60, right: 20 }}
      >
        <VictoryAxis
          style={{ tickLabels: { fontSize: 10, fill: '#64748b' } }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x / 1000}k`)}
          style={{ tickLabels: { fontSize: 10, fill: '#64748b' } }}
        />
        <VictoryBar
          data={data}
          x="age"
          y="count"
          labels={({ datum }) => `Count: ${datum.count}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
          style={{
            data: { fill: '#3b82f6', width: 30 }
          }}
        />
      </VictoryChart>
    </div>
  );
};
