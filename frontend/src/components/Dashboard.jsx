import React from 'react'
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { Chart as ChartJS} from "chart.js/auto"
import { Line } from 'react-chartjs-2';

function dashboard() {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            data: [0, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },

        {
          label: 'Sale loss',
          data: [5, 50, 30, 11, 86, 45, 10],
          fill: false,
          borderColor: 'red',
          tension: 0.1
      }
      ]
  };


  return (
    <div className="w-full mt-10">
      <div className="max-w-[1450px] mx-auto">
        <div className="flex flex-col justify-start">
          <h1 className="font-extrabold text-xl text-gray-700 mb-5 ml-5">DASHBOARD</h1>

          <div className="bg-base-100 p-4 rounded-xl">
            <h2>Total Sales</h2>
            <Line data={data} />
          </div>

          <div className="bg-base-100 p-4 rounded-xl">
            <h2>Total Sales</h2>
            <Line data={data} />
          </div>

          <div className="bg-base-100 p-4 rounded-xl">
            <h2>Total Sales</h2>
            <Line data={data} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default dashboard
    