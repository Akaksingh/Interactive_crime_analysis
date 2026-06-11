import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';// client side routing
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import CrimeMap from './pages/CrimeMap';
import Alerts from './pages/Alerts';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/map" element={<CrimeMap />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; 