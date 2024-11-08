import React from 'react'
import { LandingPage } from '../sections/landing-page/landing-page'
import { AdminPage } from '../sections/admin/admin'
import { Login } from '../sections/login/login'
export default {
  routes: [
    { path: '*', element: <Login /> },
    { path: '/landing-page', element: <LandingPage />, isPrivate: true, role: 'user' },
    { path: '/admin', element: <AdminPage />, isPrivate: true, role: 'admin' },
  ],
  backend: 'http://127.0.0.1:8000/panzofi'
}