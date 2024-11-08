import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../config/config';

export function RouterListener({ children }){
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const logout = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const formdata = new FormData()
    const data = { 
      id: user.id, 
      user: user,
      time: Number(sessionStorage.getItem('time')), 
      count1: Number(sessionStorage.getItem('count1')), 
      count2: Number(sessionStorage.getItem('count2')) 
    }
    Object.entries(data).forEach(([key, value]) => formdata.append(key, value))
    fetch(`${config.backend}/update-user`, {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    })
    Object.keys(sessionStorage).forEach((key) => sessionStorage.removeItem(key))
    navigate('/login')
  }
  useEffect(() => {
    setUser(sessionStorage.getItem('user'))
  }, [pathname])
  return (
    <div>
      {user && <div className='w-full flex justify-end'>
        <button
          type="button"
          className="w-28 bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600 transition duration-300"
          onClick={() => logout()}
        >Cerrar Sesion
        </button>
      </div>}
      {children}
    </div>
  )
}
