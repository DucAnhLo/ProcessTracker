import React from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './components/layout/Landing';

import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return ( 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<LoginForm/>}></Route>
      <Route path="/register" element={<RegisterForm/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
