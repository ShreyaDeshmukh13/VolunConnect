import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { Overview, Requirements } from './pages/OpportunityTabs';
import { AuthProvider } from './auth/AuthContext';
import { store } from './store/store';
import './App.css';

// Route-level code splitting
const OpportunityDetails = lazy(() => import('./pages/OpportunityDetails'));
const MyRegistrations = lazy(() => import('./pages/MyRegistrations'));

const NotFound = () => (
  <div className="container py-5 text-center">
    <h2>404 - Page not found</h2>
    <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
  </div>
);

// Router-agnostic shell (tests render it inside MemoryRouter)
export function AppShell() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<div className="container py-5 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/opportunities/:id" element={<OpportunityDetails />}>
                <Route index element={<Overview />} />
                <Route path="requirements" element={<Requirements />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/my-registrations" element={<ProtectedRoute><MyRegistrations /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}
