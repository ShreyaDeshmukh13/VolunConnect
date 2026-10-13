import React from 'react';

/**
 * Hero Component
 * 
 * Demonstrates:
 * - Functional Component
 * - Props receiving (callback handlers)
 * - Event handling (onClick)
 * - Semantic HTML5 layout
 */
const Hero = ({ onExploreClick, onRegisterClick }) => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="col-lg-7">
            <div className="hero-tag">
              <i className="bi bi-stars"></i>
              <span>Official Community Volunteer Network</span>
            </div>

            <h1 className="hero-title">
              Make a Difference. <br />
              <span className="gradient-text">Become a Volunteer.</span>
            </h1>

            <p className="hero-description">
              Empower your community by contributing your time and talents. Explore curated 
              volunteering initiatives—from tree plantation and coastal cleanups to youth mentoring 
              and healthcare camps—and register in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a 
                href="#opportunities" 
                className="btn-primary-custom"
                onClick={onExploreClick}
              >
                <i className="bi bi-search"></i>
                Explore Opportunities
              </a>
              <a 
                href="#register" 
                className="btn-outline-custom"
                onClick={onRegisterClick}
              >
                <i className="bi bi-person-plus-fill"></i>
                Register as Volunteer
              </a>
            </div>

            {/* Highlights / Trust Points */}
            <div className="hero-highlights">
              <div className="highlight-item">
                <i className="bi bi-patch-check-fill"></i>
                <span>Verified NGO Events</span>
              </div>
              <div className="highlight-item">
                <i className="bi bi-award-fill"></i>
                <span>Certificate of Participation</span>
              </div>
              <div className="highlight-item">
                <i className="bi bi-clock-history"></i>
                <span>Flexible Weekend Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase */}
          <div className="col-lg-5">
            <div className="hero-visual-card">
              <div className="hero-img-banner">
                <i className="bi bi-people-fill banner-icon"></i>
                <h4 className="fw-bold mb-2">Join 1,450+ Volunteers</h4>
                <p className="mb-0 small text-white-50">
                  Creating measurable grassroots social impact every week
                </p>
              </div>

              {/* Floating Testimonial / Status Card */}
              <div className="hero-floating-badge">
                <div className="badge-avatar-icon">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">Upcoming Drive Confirmed</div>
                  <div className="text-muted small">Tree Plantation • 40 Slots Available</div>
                </div>
              </div>

              <div className="hero-floating-badge mt-2">
                <div className="badge-avatar-icon" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">Instant Registration Confirmation</div>
                  <div className="text-muted small">Automated slot booking with digital pass</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
