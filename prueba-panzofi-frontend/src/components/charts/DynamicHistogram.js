import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

export function DynamicHistogram({ title, data, binCount = 5, width, height }) {
  const [bins, setBins] = useState(binCount);
  const min = Math.min(...data)
  const max = Math.max(...data)
  const interval = (max - min) / bins
  const binData = Array.from({ length: bins }, (_, i) => {
    const binMin = min + i * interval
    const binMax = binMin + interval
    return data.filter(value => value >= binMin && value < binMax).length
  })
  const labels = Array.from({ length: bins }, (_, i) => `${(min + i * interval).toFixed(0)} - ${(min + (i + 1) * interval).toFixed(0)}`)
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Frecuencia',
        data: binData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  }

  return (
    <div className="grid justify-center">
      <h2 className="w-full text-center text-gray-600 my-4">{title}</h2>
      <div className={`w-${width} h-${height}`}>
        <Bar data={chartData} options={{ responsive: true }} />
        <div>
          <label>Intervalos: </label>
          <input
            type="number"
            value={bins}
            onChange={(e) => setBins(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}
