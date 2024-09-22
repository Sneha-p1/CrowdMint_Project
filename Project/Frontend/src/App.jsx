import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import UserSignup from './pages/UserSignup'
import AuthLayout from './layouts/AuthLayout'
import UserLogin from './pages/UserLogin'
import UserDashboard from './pages/UserDashboard'
import AllProjects from './pages/AllProjects'
import Donate from './pages/Donate'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>} >
        <Route path='/' element={<Homepage/>}/>
        </Route>

        <Route path='/' element={<AuthLayout />}>
        <Route path='/topprojects' element={<AllProjects/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='projects' element={<AllProjects/>}/>
        <Route path='/donate/:projectId' element={<Donate/>}/>
        </Route>

      
      </>
    )
  )


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
