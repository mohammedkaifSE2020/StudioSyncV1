import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LandingPage from '../pages/Landing'
import Login from '../pages/login/Login'
import Signup from '../pages/Signup/Signup'
import Signup2 from '../pages/Signup2/Signup2'
import Home from '../pages/Home/Home'
import PrivateRoute from './PrivateRoute'
import Logout from '../pages/logout/Logout'
import Workspace from '../pages/workspace/workspace'

function AppRoute() {
  return (
    <Routes>
        <Route to path="/" element={<LandingPage />}/>
        <Route to path="/login" element={<Login />}/>
        <Route to path="/signup" element={<Signup />}/>
        <Route to path="/signup2" element={<Signup2 />}/>

        {/* protected routes */}
        <Route element={<PrivateRoute redirectPath="/signup" />}>
          <Route to path="/home" element={<Home />}/>
          <Route to path="/logout" element={<Logout />}/>
          <Route to path="/workspace" element={<Workspace />}/>
        </Route>
    </Routes>
  )
}

export default AppRoute