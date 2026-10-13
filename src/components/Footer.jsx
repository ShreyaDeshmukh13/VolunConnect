import React from 'react';

/**
 * Footer Component
 * 
 * Demonstrates:
 * - Semantic HTML5 footer
 * - Accessibility attributes
 * - Clean layout with quick links & academic project information
 */
const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="container">
        <div className="row g-4">
          
          {/* Brand and Description */}
          <div className="col-12 col-md-5">
            <div className="footer-brand">
              <div className="brand-icon-box" style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}>
                <i className="bi bi-heart-fill"></i>
              </div>
              <span>Volun<span style={{ color: '#2dd4bf' }}>Connect</span></span>
            </div>
            <p className="footer-desc">
              A centralized Volunteer Registration Portal designed to connect enthusiastic 
              volunteers with verified community initiatives, empowering grassroots development 
              and civic responsibility.
            </p>
            <div className="d-flex gap-3">
              <a href="#home" className="text-secondary fs-5" aria-label="Social Link"><i className="bi bi-github"></i></a>
              <a href="#home" className="text-secondary fs-5" aria-label="Social Link"><i className="bi bi-linkedin"></i></a>
              <a href="#home" className="text-secondary fs-5" aria-label="Social Link"><i className="bi bi-twitter-x"></i></a>
              <a href="#home" className="text-secondary fs-5" aria-label="Social Link"><i className="bi bi-envelope-fill"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-3 offset-md-1">
            <h4 className="footer-heading">Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#stats">Impact Statistics</a></li>
              <li><a href="#opportunities">Volunteer Opportunities</a></li>
              <li><a href="#register">Volunteer Registration</a></li>
              <li><a href="#about">About the Portal</a></li>
            </ul>
          </div>

          {/* Contact & Program Info */}
          <div className="col-6 col-md-3">
            <h4 className="footer-heading">Contact & Support</h4>
            <ul className="footer-links">
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt text-teal"></i>
                <span>Community Action Cell</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope text-teal"></i>
                <span>volunteer@volunconnect.org</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-teal"></i>
                <span>+91 (020) 2456-7890</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-clock text-teal"></i>
                <span>Mon - Sat: 9 AM - 6 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} VolunConnect. Built with React.js &amp; ES6+. All rights reserved.
          </div>
          <div className="academic-badge">
            <i className="bi bi-mortarboard-fill"></i>
            <span>Advanced Web Technologies (AWT) - FA-1 Mini Project</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
