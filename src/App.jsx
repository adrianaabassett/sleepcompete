import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './home/Home';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  return (
    <div className="app-container">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Sleep Compete</NavLink>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="login">Login</NavLink>
              <NavLink className="nav-link" to="dashboard">Dashboard</NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </main>

      <footer className="footer text-center py-3 border-top">
        <div className="container">
          <span>Author: <strong>Adriana Bassett</strong></span> | 
          <a href="https://github.com/adrianaabassett/sleepcompete" target="_blank" rel="noopener noreferrer" className="ms-2">
            GitHub Repository
          </a>
        </div>
      </footer>
    </div>
  );
}