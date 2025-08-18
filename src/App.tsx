import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Apply from './pages/Apply';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ArtistDashboard from './pages/dashboards/ArtistDashboard';
import UserDashboard from './pages/dashboards/UserDashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply" element={<Apply />} />
          
          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[0]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/artist/dashboard"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <ArtistDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;