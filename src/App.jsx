import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Hotel from './pages/Hotel';
import RestaurantPOS from './pages/RestaurantPOS';
import Accounts from './pages/Accounts';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import InventoryDashboard from './components/Inventory/InventoryDashboard';

import './App.css';


/* ================= Layout ================= */

function AppLayout({ children, setIsAuthenticated }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onNavigate={closeSidebar}
      />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Main Content */}
      <div className="min-h-screen">

        <Header
          setIsAuthenticated={setIsAuthenticated}
          toggleSidebar={toggleSidebar}
        />

        <div className="pt-16 p-4">
          {children}
        </div>

      </div>

    </div>
  );
}


/* ================= App ================= */

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

        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {[
          { path: "/", element: <Dashboard /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/attendance", element: <Attendance /> },
          { path: "/hotel", element: <Hotel /> },
          { path: "/restaurant", element: <RestaurantPOS /> },
          { path: "/inventory", element: <InventoryDashboard /> },
          { path: "/accounts", element: <Accounts /> },
        ].map((route, index) => (

          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute>
                <AppLayout setIsAuthenticated={setIsAuthenticated}>
                  {route.element}
                </AppLayout>
              </ProtectedRoute>
            }
          />

        ))}

      </Routes>

    </Router>
  );
}

export default App;
