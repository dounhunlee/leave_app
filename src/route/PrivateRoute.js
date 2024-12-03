import React from 'react'
import { Navigate } from 'react-router-dom';
import LeaveApplication from '../page/LeaveApplication';

const PrivateRoute = ({ children, authenticate }) => {
  return authenticate ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute
