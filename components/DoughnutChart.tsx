"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: { accounts: PlaidBank[] }) => {
  const balances = accounts.map((account) => account.accounts.reduce((acc, account) => acc + account.balances.available, 0));
  const names = accounts.map((account) => account.accounts.map((account) => account.name).join(", "));

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ],
    labels: names
  }

  return <Doughnut
    data={data}
    options={{
      cutout: "70%",
      plugins: {
        legend: {
          display: false
        }
      }
    }}
  />
}

export default DoughnutChart;