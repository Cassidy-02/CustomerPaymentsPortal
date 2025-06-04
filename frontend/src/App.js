import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


import EmployeeLoginPage from "./pages/EmployeeLoginPage";
import EmployeeDashboardPage from "./pages/EmployeeDashboardPage";
import EmployeePaymentPage from "./pages/EmployeePaymentPage";

import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PaymentPage from './pages/PaymentPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payments" element={<PaymentPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Employee Routes */}
        <Route path="/employee-login" element={<EmployeeLoginPage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboardPage />} />
        <Route path="/employee-payments" element={<EmployeePaymentPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
