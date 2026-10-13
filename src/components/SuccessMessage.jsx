import React from 'react';

/**
 * SuccessMessage Component
 * 
 * Demonstrates:
 * - Conditional Rendering (rendered conditionally based on parent's isRegistered state)
 * - Props receiving (registrationData, onReset)
 * - Dynamic data display (Volunteer name, event title, registration ID, date, venue)
 * - Reset event handling to return to form
 */
const SuccessMessage = ({ registrationData, onReset }) => {
  if (!registrationData) return null;

  const {
    name,
    email,
    phone,
    city,
    availability,
    registrationId,
    registeredAt,
    opportunityDetails
  } = registrationData;

  return (
    <section id="register" className="registration-section section-padding">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-9">
            
            <div className="success-card">
              
              {/* Success Badge Icon */}
              <div className="success-icon-badge">
                <i className="bi bi-check-lg"></i>
              </div>

              {/* Title & Personalized Message */}
              <h2 className="success-title">Registration Successful! 🎉</h2>
              <p className="success-message-text">
                Thank you, <strong>{name}</strong>! You have been successfully registered as a volunteer 
                for <strong>{opportunityDetails?.title || 'the selected community drive'}</strong>.
              </p>

              {/* Confirmation Details Card / Receipt */}
              <div className="confirmation-receipt-card">
                
                <div className="receipt-header">
                  <div>
                    <span className="text-muted small d-block">Official Registration Pass</span>
                    <span className="fw-bold text-dark">VolunConnect Portal (AWT FA-2)</span>
                  </div>
                  <span className="receipt-id-tag">
                    <i className="bi bi-ticket-perforated me-1"></i> {registrationId}
                  </span>
                </div>

                <div className="receipt-grid">
                  
                  <div className="receipt-row">
                    <span className="receipt-label">Volunteer Name</span>
                    <span className="receipt-value">{name}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Registered Drive</span>
                    <span className="receipt-value">{opportunityDetails?.title || 'Community Event'}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Event Category</span>
                    <span className="receipt-value">
                      <span className={`badge ${opportunityDetails?.categoryBadge || 'bg-primary'} text-white`}>
                        {opportunityDetails?.category || 'General'}
                      </span>
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Date & Time</span>
                    <span className="receipt-value">
                      {opportunityDetails?.date} ({opportunityDetails?.time})
                    </span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Venue / Location</span>
                    <span className="receipt-value">{opportunityDetails?.location}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Assigned Shift</span>
                    <span className="receipt-value">{availability}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Contact Details</span>
                    <span className="receipt-value text-muted small">{email} • +91 {phone}</span>
                  </div>

                  <div className="receipt-row">
                    <span className="receipt-label">Registration Timestamp</span>
                    <span className="receipt-value text-muted small">{registeredAt}</span>
                  </div>

                </div>

              </div>

              {/* Next Steps Checklist Box */}
              <div className="next-steps-box">
                <div className="fw-bold mb-2">
                  <i className="bi bi-info-circle-fill me-1"></i> What happens next?
                </div>
                <ul className="mb-0 ps-3 small">
                  <li>A confirmation email with the full orientation guide has been sent to <strong>{email}</strong>.</li>
                  <li>Our event coordinator will add you to the volunteer coordination group 48 hours before the drive.</li>
                  <li>Please carry a valid government photo ID and arrive 15 minutes before reporting time.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button
                  type="button"
                  className="btn btn-primary-custom px-4 py-2"
                  onClick={onReset}
                >
                  <i className="bi bi-person-plus"></i>
                  Register Another Volunteer
                </button>
                <a
                  href="#opportunities"
                  className="btn btn-outline-custom px-4 py-2"
                >
                  <i className="bi bi-grid"></i>
                  Explore More Drives
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessMessage;
