import React from 'react';

interface LineChartProps {
  data: number[];
  stroke?: string;
  background?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  stroke = 'black',
  background = 'white'
}) => {
  // SVG dimensions
  const width = 500;
  const height = 500;
  const padding = 20;

  // Calculate scales
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range = maxVal - minVal || 1; // Avoid division by zero

  // Map data to points
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
    // Invert Y axis because SVG origin is top-left
    const y = height - padding - ((val - minVal) / range) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  const firstValue = data[0];
  const lastValue = data[data.length - 1];

  return (
    <div className="relative inline-block">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="300"
        height="300"
        style={{ backgroundColor: background }}
        className="border border-gray-300 rounded-lg shadow-sm"
      >
        <polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* First value - bottom left */}
        <text
          x={padding}
          y={height - padding + 15}
          fill={stroke}
          fontSize="20"
          fontFamily="sans-serif"
          textAnchor="start"
        >
          {firstValue}
        </text>

        {/* Last value - top right */}
        <text
          x={width - padding}
          y={padding}
          fill={stroke}
          fontSize="20"
          fontFamily="sans-serif"
          textAnchor="end"
          dominantBaseline="hanging"
        >
          {lastValue}
        </text>
      </svg>
    </div>
  );
};

export default LineChart;
