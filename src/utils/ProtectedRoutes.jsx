import React, { useContext } from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import FitnessContext from '../FitnessContext';

const ProtectedRoutes = () => {
  const {cookie} = useContext(FitnessContext)
  const user = cookie;
  return user ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes