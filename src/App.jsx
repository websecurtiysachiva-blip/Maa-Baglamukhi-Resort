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
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Dashboard />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Dashboard />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/attendance" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Attendance />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/hotel" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Hotel />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/restaurant" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <RestaurantPOS />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/accounts" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Accounts />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/housekeeping" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Housekeeping />
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/banquet" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Banquet />
              </div>
            </div>
          </ProtectedRoute>
        } />
         <Route path="/inventory" element={
  <ProtectedRoute>
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <InventoryDashboard />
      </div>
    </div>
  </ProtectedRoute>
} />
        <Route path="/reports" element={
          <ProtectedRoute>
            <div className="app">
              <Sidebar />
              <div className="main-content">
                <Header setIsAuthenticated={setIsAuthenticated} />
                <Reports />
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
