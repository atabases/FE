import React from 'react';

/**
 * Pure SVG Venn Diagram — no external dependencies.
 * Renders three overlapping circles with labels and counts.
 */
export const VennDiagramChart = () => {
  const circles = [
    { cx: 140, cy: 120, r: 80, label: 'Study A', color: '#3b82f6', count: 50 },
    { cx: 210, cy: 120, r: 70, label: 'Study B', color: '#f97316', count: 40 },
    { cx: 175, cy: 185, r: 75, label: 'Study C', color: '#10b981', count: 45 },
  ];

  return (
    <div className="flex justify-center items-center h-full w-full">
      <svg viewBox="0 0 350 280" width="350" height="260">
        <defs>
          {circles.map((c, i) => (
            <radialGradient key={i} id={`venn-grad-${i}`} cx="40%" cy="40%">
              <stop offset="0%" stopColor={c.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0.08" />
            </radialGradient>
          ))}
        </defs>

        {/* Circles */}
        {circles.map((c, i) => (
          <circle
            key={i}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill={`url(#venn-grad-${i})`}
            stroke={c.color}
            strokeWidth="2"
            opacity="0.85"
          />
        ))}

        {/* Set labels (outside overlap zones) */}
        <text x="95"  y="90"  textAnchor="middle" fontSize="12" fontWeight="600" fill="#3b82f6">Study A</text>
        <text x="258" y="90"  textAnchor="middle" fontSize="12" fontWeight="600" fill="#f97316">Study B</text>
        <text x="175" y="258" textAnchor="middle" fontSize="12" fontWeight="600" fill="#10b981">Study C</text>

        {/* Individual counts */}
        <text x="105" y="130" textAnchor="middle" fontSize="11" fill="#475569">50</text>
        <text x="248" y="130" textAnchor="middle" fontSize="11" fill="#475569">40</text>
        <text x="175" y="230" textAnchor="middle" fontSize="11" fill="#475569">45</text>

        {/* Pairwise overlaps */}
        <text x="175" y="105" textAnchor="middle" fontSize="10" fontWeight="500" fill="#6366f1">15</text>
        <text x="145" y="175" textAnchor="middle" fontSize="10" fontWeight="500" fill="#6366f1">12</text>
        <text x="205" y="175" textAnchor="middle" fontSize="10" fontWeight="500" fill="#6366f1">10</text>

        {/* Triple overlap */}
        <text x="175" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e1b4b">5</text>
      </svg>
    </div>
  );
};
