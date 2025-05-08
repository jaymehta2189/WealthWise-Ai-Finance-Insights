import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import Insights from './pages/Insights';
import Banking from './pages/Banking';
import Budget from './pages/Budget';
import Investments from './pages/Investments';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Transaction from './pages/Transaction';
import Forecast from './pages/Forecast';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          
          {/* User Profile Setup */}
          <Route path="/complete-profile" element={<UserProfile />} />
          
          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/transaction" element={<Transaction/>} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forecast" element={<Forecast />} />
          </Route>
          
          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;