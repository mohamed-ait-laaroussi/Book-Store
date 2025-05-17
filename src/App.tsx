import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider>
          <AdminProvider>
            <Router>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books/:id" element={<BookDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/auth" element={<Authentication />} />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } />
                    <Route path="/admin/books" element={
                      <AdminRoute>
                        <AdminBooks />
                      </AdminRoute>
                    } />
                    <Route path="/admin/users" element={
                      <AdminRoute>
                        <AdminUsers />
                      </AdminRoute>
                    } />
                    <Route path="/admin/settings" element={
                      <AdminRoute>
                        <AdminSettings />
                      </AdminRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster position="bottom-right" />
            </Router>
          </AdminProvider>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;