import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

export function DynamicLineChart ({ title, initialData, width, height }) {
  const [points, setPoints] = useState(initialData.length)
  const truncatedData = initialData.slice(0, points)
  const labels = Array.from({ length: points }, (_, i) => `Punto ${i + 1}`)
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Valores',
        data: truncatedData,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  }
  return (
    <div className="grid justify-center">
      <h2 className="w-full text-center text-gray-600 my-4">{title}</h2>
      <div className={`w-${width} h-${height}`}>
        <Line data={chartData} options={{ responsive: true }} />
        <div>
          <label>Puntos: </label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            min="1"
            max={initialData.length}
          />
        </div>
      </div>
    </div>
  );
}
