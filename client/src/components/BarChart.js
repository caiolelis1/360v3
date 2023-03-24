import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ grades, backgroundColor, labels }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Nota",
        data: grades,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return (
    <div className="ChartCard">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
