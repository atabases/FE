import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as venn from 'venn.js';

export const VennDiagramChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Define sets and their intersections
    const sets = [
      { sets: ['Study A'], size: 50 },
      { sets: ['Study B'], size: 40 },
      { sets: ['Study C'], size: 45 },
      { sets: ['Study A', 'Study B'], size: 15 },
      { sets: ['Study A', 'Study C'], size: 12 },
      { sets: ['Study B', 'Study C'], size: 10 },
      { sets: ['Study A', 'Study B', 'Study C'], size: 5 }
    ];

    const chart = venn.VennDiagram()
      .width(350)
      .height(250);
    
    const div = d3.select(chartRef.current);
    // Clear previous render to prevent duplicates on hot reload
    div.selectAll('*').remove();
    div.datum(sets).call(chart);
    
    // Add some styling for the Venn diagram
    div.selectAll("text").style("fill", "#475569").style("font-size", "12px").style("font-weight", "500");
    
    return () => {
      div.selectAll('*').remove();
    };
  }, []);

  return <div ref={chartRef} className="flex justify-center items-center h-full w-full" />;
};
