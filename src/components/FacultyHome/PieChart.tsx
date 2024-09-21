import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type PieChartProps = {
  data: {
    labels: string[];
    values: number[];
  };
};

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"pie", number[], string> | null>(null);

  useEffect(() => {
    if (chartRef.current && data.labels.length > 0 && data.values.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const colors = generateColors(data.labels.length);

        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'نسب الفئات',
              data: data.values,
              backgroundColor: colors,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                  }
                }
              }
            }
          }
        });
      }
    }
  }, [data]);

  const generateColors = (numColors: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  return (
    <div className='flex items-center justify-center ' style={{ width: '520px', height: '250px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;