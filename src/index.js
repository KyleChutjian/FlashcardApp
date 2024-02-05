import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />}/>
        <Route exact path="login" element={<Login />} />
        <Route exact path="signUp" element={<SignUp />} />
        <Route exact path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);