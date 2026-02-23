import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Hotel from './pages/Hotel';
import RestaurantPOS from './pages/RestaurantPOS';
import Accounts from './pages/Accounts';
import Housekeeping from './pages/Housekeeping';
import Banquet from './pages/Banquet';
import Reports from './pages/Reports';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import InventoryDashboard from './components/Inventory/InventoryDashboard';
import Setting from "./pages/Setting";

function Layout({ children, setIsAuthenticated }) {
  return (
    <div>

      {/* Header */}
      <Header setIsAuthenticated={setIsAuthenticated} />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[250px] mt-[70px] p-6">
        {children}
      </div>

    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>

      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

<Route path="/" element={<Navigate to="/dashboard" replace />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/attendance"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Attendance />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/hotel"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Hotel />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/restaurant"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <RestaurantPOS />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/accounts"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Accounts />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/inventory"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <InventoryDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/housekeeping"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Housekeeping />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/banquet"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Banquet />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Reports />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute allowedRole="admin">
      <Layout setIsAuthenticated={setIsAuthenticated}>
        <Setting />
      </Layout>
    </ProtectedRoute>
  }
/>  


      </Routes>
    </Router>
  );
}

export default App;
