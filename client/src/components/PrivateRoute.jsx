import React,{memo} from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function PrivateRoute({redirectUrl = '/signup'}) {
    const user = useSelector((state)=>state?.uset?.currentUser)
  return user? <Outlet/> : <Navigate to ={redirectUrl}/>
}

export default memo(PrivateRoute);
