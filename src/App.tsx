import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoute'; // Import the bouncer!

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/thehollowlogin" element={<Login />} />

        {/* Protected Route - Locked down */}
        <Route 
          path="/lostandfoundspace" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;