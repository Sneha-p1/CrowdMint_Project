import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import UserSignup from './pages/UserSignup'
import AuthLayout from './layouts/AuthLayout'
import UserLogin from './pages/UserLogin'
import UserDashboard from './pages/UserDashboard'
import AllProjects from './pages/AllProjects'
import Fundraise from './pages/Fundraise'
import AdminDash from './pages/AdminDash'
import AdminAllUsers from './pages/AdminAllUsers'
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/AdminLogin'
import AdminReview from './pages/AdminReview'
import Payment from './pages/Payment'
import Donate from './pages/Donate'
import AdminSignup from './pages/AdminSignup'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>} >
        <Route path='/' element={<Homepage/>}/>
        </Route>

        <Route path='/' element={<AuthLayout/>}>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/dashboard' element={<UserDashboard/>}/>
        <Route path='projects' element={<AllProjects/>}/>
        <Route path='/new-project' element={<Fundraise/>}/>
        <Route path='/donate/:id' element={<Donate/>}/>
        <Route path='/payment' element={<Payment/>}/>
        </Route>

        <Route path='/' element={<AdminLayout/>}>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>
        <Route path='/adminlogin' element= {<AdminLogin/>}/>
        <Route path='/admindash' element= {<AdminDash/>}/>
        <Route path='/admin/allusers' element={<AdminAllUsers/>}/>
        <Route path='/admin/review/:userId' element={<AdminReview/>}/>

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
