import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  monthlyData: number[];
  title?: string;
  label: string;
  color: string;
}

const BarChart: React.FC<ChartProps> = ({ monthlyData, title, label, color }) => {
  const currentMonth = new Date().getMonth();
  const labels = Array.from({ length: 13 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12; // Circular indexing for last 12 months
    return new Date(new Date().setMonth(monthIndex)).toLocaleString('default', { month: 'short' });
  }).reverse(); // Reverse to show current month first

  const data = {
    labels,
    datasets: [
      {
        label,
        data: monthlyData,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: !!title, text: title },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide grid lines on x-axis
        barPercentage: 0.4, // Adjusts the bar thickness
        categoryPercentage: 0.6, // Adjusts spacing between bars
      },
      y: {
        grid: { display: false }, // Hide grid lines on y-axis
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
