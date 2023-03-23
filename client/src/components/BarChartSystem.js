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
        type: "linear",
        ticks: {
          stepSize: 2,
        },
        min: 0,
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
        label: "Quantidade",
        data: grades,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
