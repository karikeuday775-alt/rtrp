import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PropertyProvider } from './contexts/PropertyContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import LandingPage from './pages/LandingPage';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import AddProperty from './pages/AddProperty';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Favorites from './pages/Favorites';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (!user) return <Navigate to="/role-selection" replace />;
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function AppContent() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/properties" element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          } />
          
          <Route path="/properties/:id" element={
            <ProtectedRoute>
              <PropertyDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/add-property" element={
            <ProtectedRoute allowedRoles={['seller', 'admin']}>
              <AddProperty />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          
          <Route path="/favorites" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Favorites />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2a2a2a',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <PropertyProvider>
            <AppContent />
          </PropertyProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;