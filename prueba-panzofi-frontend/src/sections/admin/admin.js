import React, { useState, useEffect } from 'react'
import { DynamicHistogram } from '../../components/charts/DynamicHistogram'
import { DynamicLineChart } from '../../components/charts/DynamicLinear'
import config from '../../config/config'
export function AdminPage() {
  const labels = ['Name', 'Fecha', 'Tiempo', 'Botón 1', 'Botón 2']
  const [data, setData] = useState()
  useEffect(() => {
    fetch(`${config.backend}/users`)
      .then((response) => response.json())
      .then(setData)
      .catch(console.error)
  }, [])
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-center my-4 text-xl text-gray-600'>Consola de usuarios</h2>
      {data ? <div>
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 my-4">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-100">
                {labels.map((label, i) =>
                  <th key={i} className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">{label}</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map(({ name, date, time, button1_count, button2_count }, i) => (
                <tr key={i}>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-400">{name}</td>
                  <td className="py-4 px-6 border-b border-gray-200 truncate text-gray-400">{date}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-400">{`${Math.round(time / 60)} min`}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-400">{button1_count}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-400">{button2_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='w-full'>
          <h2 className='text-center my-4 text-xl text-gray-600'>Graficos</h2>
          <div className='grid grid-cols-2 justify-center gap-7'>
            <DynamicHistogram title='Histograma de frrcuencias de clicks en Boton 1' width={96} height={96} data={data.map(({ button1_count }) => button1_count)} binCount={5} />
            <DynamicHistogram title='Histograma de frrcuencias de clicks en Boton 2' width={96} height={96} data={data.map(({ button2_count }) => button2_count)} binCount={5} />
            <DynamicLineChart title='Grafico de lineas para el tiempo de uso' width={96} height={96} initialData={data.map(({ time }) => time)} />
          </div>
        </div>
      </div> : <h2>Crgando...</h2>}
    </div>
  )
}
