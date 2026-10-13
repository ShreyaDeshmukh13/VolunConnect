import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useRegistrations } from '../store/useRegistrations';

/**
 * Navbar Component
 * 
 * Demonstrates:
 * - Functional Component
 * - JSX syntax
 * - useState hook for mobile navigation toggle
 * - Event handling (onClick) for menu toggle and smooth navigation
 */
const Navbar = () => {
  const { registrations } = useRegistrations();
  const { user, logout } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(prevState => !prevState);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <nav className="custom-navbar" role="navigation" aria-label="Main Navigation">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="navbar-brand-custom" onClick={closeMobileNav}>
            <div className="brand-icon-box">
              <i className="bi bi-heart-fill"></i>
            </div>
            <span>
              Volun<span style={{ color: 'var(--primary-color)' }}>Connect</span>
            </span>
            <span className="brand-tag d-none d-sm-inline-block">AWT FA-2</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <Link to="/" className="nav-link-custom">
              <i className="bi bi-house-door me-1"></i> Home
            </Link>
            <Link to="/#stats" className="nav-link-custom">
              <i className="bi bi-bar-chart me-1"></i> Impact Stats
            </Link>
            <Link to="/#opportunities" className="nav-link-custom">
              <i className="bi bi-grid me-1"></i> Opportunities
            </Link>
            <Link to="/#about" className="nav-link-custom">
              <i className="bi bi-info-circle me-1"></i> About
            </Link>
            <NavLink to="/my-registrations" className="nav-link-custom">
              <i className="bi bi-list-check me-1"></i> My Registrations ({registrations.length})
            </NavLink>
            {user ? <button type="button" className="btn btn-sm btn-outline-secondary" onClick={logout}>Logout ({user.sub})</button> : <NavLink to="/login" className="nav-link-custom">Login</NavLink>}
            <Link 
              to="/#register" 
              className="btn nav-btn-register ms-2"
              
            >
              <i className="bi bi-pencil-square me-1"></i> Register Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="btn d-lg-none p-2 border-0 text-dark fs-4"
            type="button" 
            onClick={toggleMobileNav}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNavOpen}
          >
            <i className={`bi ${isMobileNavOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileNavOpen && (
          <div className="d-lg-none pt-3 pb-2 border-top mt-3 animate__animated animate__fadeIn">
            <div className="d-flex flex-column gap-2">
              <Link 
                to="/" 
                className="nav-link-custom" 
                onClick={closeMobileNav}
              >
                <i className="bi bi-house-door me-2"></i> Home
              </Link>
              <Link 
                to="/#stats" 
                className="nav-link-custom" 
                onClick={closeMobileNav}
              >
                <i className="bi bi-bar-chart me-2"></i> Impact Stats
              </Link>
              <Link 
                to="/#opportunities" 
                className="nav-link-custom" 
                onClick={closeMobileNav}
              >
                <i className="bi bi-grid me-2"></i> Opportunities
              </Link>
              <Link 
                to="/#about" 
                className="nav-link-custom" 
                onClick={closeMobileNav}
              >
                <i className="bi bi-info-circle me-2"></i> About
              </Link>
              <NavLink to="/my-registrations" className="nav-link-custom" onClick={closeMobileNav}>
              <i className="bi bi-list-check me-1"></i> My Registrations ({registrations.length})
            </NavLink>
              {user ? <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { logout(); closeMobileNav(); }}>Logout</button> : <NavLink to="/login" className="nav-link-custom" onClick={closeMobileNav}>Login</NavLink>}
            <Link 
                to="/#register" 
                className="btn nav-btn-register text-center mt-2" 
                onClick={() => {
                  closeMobileNav();
                }}
              >
                <i className="bi bi-pencil-square me-1"></i> Register as Volunteer
              </Link>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
