import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/form/form'
import config from '../../config/config'
export function Login(){ 
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [fields, setFields] = useState([
    { placeholder: 'Usuario', type: 'text', value: '' },
    { placeholder: 'Contraseña', type: 'password', value: '' },
  ])
  const change = (fields) => {
    setFields(fields)
  }
  const send = () => {
    const formdata = new FormData();
    formdata.append('user_name', fields[0].value)
    formdata.append('password', fields[1].value)
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    }
    fetch("http://127.0.0.1:8000/panzofi/auth", requestOptions)
      .then((response) => response.json())
      .then(({ message, user }) => user ? redirect(user) : setError(message))
      .catch((error) => console.error(error));
    console.debug(redirect)
  }
  const redirect = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('count1', user.count1)
    sessionStorage.setItem('count2', user.count2)
    sessionStorage.setItem('time', user.time)
    user.role === 'user' ? navigate('/landing-page') : navigate('/admin')
  }
  const sendData = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const count1 = sessionStorage.getItem('count1')
    const count2 = sessionStorage.getItem('count2')
    if(user){
      const formdata = new FormData();
      formdata.append('id', user.id)
      formdata.append('count1', count1)
      formdata.append('count2', count2)
      fetch(`${config.backend}/update-user`, {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      })
    }
  }
  useEffect(() => {
    sendData()
  },[])
  return (
    <div className='flex flex-col justify-center items-center shadow-lg rounded-lg p-8'>
      {error && <h2 className='w-full mx-8 bg-red-600 shadow-lg rounded-md p-4 text-center'>{error}</h2>}
      <div className='px-28 py-12'>
        <Form title='Iniciar Sesión' buttonTitle='Iniciar sesión' fields={fields} change={(fields) => change(fields)} submit={(fields) => send(fields)} />
      </div>
    </div>
  )
}
