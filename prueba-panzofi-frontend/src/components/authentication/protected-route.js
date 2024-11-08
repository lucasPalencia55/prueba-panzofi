import React from 'react';
import { Login } from '../../sections/login/login';

export default ({ element, isPrivate, role }) => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  
  if (isPrivate && !user || user == null) {
    return <Login />
  }

  if (user && role && user.role !== role){
    return <Login />
  }

  return element
}

