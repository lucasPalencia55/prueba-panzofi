import React, { useEffect, useState } from 'react'
import config from '../../config/config'
export function LandingPage(){
  const [data, setData] = useState()
  const getData = () => {
    fetch(`${config.backend}/aplication`)
      .then((response) => response.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error))
  }
  const setCount = (key) => {
    let value = Number(sessionStorage.getItem(key))
    sessionStorage.setItem(key, value += 1)
  }
  useEffect(() => {
    getData()
    const interval = setInterval(() => {
      let time = Number(sessionStorage.getItem('time') || 0)
      sessionStorage.setItem('time', time += 1)
    }, 1000);
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='md:p-28 flex flex-col justify-center items-center'>
      {data ? <div className='flex flex-col'>
        <div className='flex flex-row gap-8'>
          <img src={data.url_image} alt='Logo' className='w-40' />
          <div className='flex flex-col gap-4'>
            <h2 className='text-xl text-gray-600'>{data.name}</h2>
            <span className='text-gray-500'>{data.description}</span>
          </div>
        </div>
        <div className='w-full flex flex-row gap-4 justify-center mt-12'>
          <div>
            <button className='w-24 bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600 transition duration-300' type='button' onClick={() => setCount('count1')}>Botón 1</button>
          </div>
          <div>
            <button className='w-24 bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600 transition duration-300' type='button' onClick={() => setCount('count2')}>Botón 2</button>
          </div>
        </div>
      </div> : <h2>Cargando...</h2>}
    </div>
  )
}
