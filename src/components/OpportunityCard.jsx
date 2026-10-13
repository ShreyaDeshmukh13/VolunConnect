import React, { memo } from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable OpportunityCard Component
 * 
 * Demonstrates:
 * - Functional Component receiving data strictly via Props
 * - Destructuring props
 * - Event handling (onClick triggering callback function passed from parent)
 * - Calculated properties (remaining slots, percentage capacity)
 */
const OpportunityCard = ({
  opportunity,
  onSelectOpportunity
}) => {
  const {
    id,
    title,
    description,
    date,
    time,
    location,
    category,
    duration,
    slots,
    registeredCount,
    requirement,
    organizer,
    icon,
    categoryBadge
  } = opportunity;

  // Calculate available slots & fill percentage
  const availableSlots = Math.max(0, slots - registeredCount);
  const fillPercentage = Math.min(100, Math.round((registeredCount / slots) * 100));

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="opportunity-card" aria-labelledby={`opp-title-${id}`}>
        
        {/* Card Header: Category Badge & Icon */}
        <div className="opportunity-card-header">
          <span className={`badge ${categoryBadge || 'bg-primary'} opp-badge`}>
            {category}
          </span>
          <div className="opp-icon-box" aria-hidden="true">
            <i className={`bi ${icon || 'bi-calendar-event'}`}></i>
          </div>
        </div>

        {/* Card Body: Title, Organizer, Description & Meta */}
        <div className="opportunity-card-body">
          <h3 id={`opp-title-${id}`} className="opp-title">
            {title}
          </h3>

          <div className="opp-organizer">
            <i className="bi bi-building"></i>
            <span>{organizer}</span>
          </div>

          <p className="opp-description">
            {description}
          </p>

          {/* Details Grid */}
          <div className="opp-details-grid">
            <div className="opp-detail-item">
              <i className="bi bi-calendar3"></i>
              <span>{date}</span>
            </div>
            <div className="opp-detail-item">
              <i className="bi bi-clock"></i>
              <span>{time}</span>
            </div>
            <div className="opp-detail-item">
              <i className="bi bi-geo-alt-fill"></i>
              <span className="text-truncate" title={location}>{location}</span>
            </div>
            <div className="opp-detail-item">
              <i className="bi bi-hourglass-split"></i>
              <span>{duration}</span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="opp-slots-box">
            <div className="opp-slots-info">
              <span>Slots Available</span>
              <span className="fw-bold text-dark">
                {availableSlots} left of {slots}
              </span>
            </div>
            <div className="progress progress-custom" role="progressbar" aria-valuenow={fillPercentage} aria-valuemin="0" aria-valuemax="100">
              <div 
                className="progress-bar progress-custom-bar" 
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Requirement Note */}
          <div className="opp-req-box">
            <i className="bi bi-info-circle-fill me-1"></i>
            <strong>Prerequisite:</strong> {requirement}
          </div>
        </div>

        {/* Card Footer: Action Button */}
        <div className="opportunity-card-footer">
          <Link to={`/opportunities/${id}`} className="d-block text-center mb-2 text-decoration-none">View details</Link>
          <button
            type="button"
            className="btn-card-register"
            onClick={() => onSelectOpportunity(opportunity)}
            aria-label={`Register for ${title}`}
          >
            <i className="bi bi-pencil-square"></i>
            <span>Register for this Drive</span>
          </button>
        </div>

      </article>
    </div>
  );
};

// memo: skip re-render when props are unchanged (e.g. while typing in search)
export default memo(OpportunityCard);
