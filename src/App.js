import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import NavLayout from './page/component/NavLayout';
import Login from './component/Login';
import Home from './page/Home';
import LeaveApplication from './page/LeaveApplication';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './route/PrivateRoute';

function App() {
  const[authenticate,setAuthenticate]=useState(false) 

  // 앱 시작 시 sessionStorage에서 로그인 상태를 확인
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setAuthenticate(true); // 로그인 상태 설정
    }
  }, []);
  return (
 
     
   

    <Routes>
      <Route path='/' element={<NavLayout authenticate={authenticate} setAuthenticate={setAuthenticate} />}>
        <Route path="/" element={<Home />} />
        <Route path='/leave_app' element={            
          <PrivateRoute authenticate={authenticate}>
            <LeaveApplication />
          </PrivateRoute>}/> 
        <Route path='/login' element={<Login setAuthenticate={setAuthenticate} />} /> 
        
      </Route>
  

    </Routes>
  );
}

export default App;
