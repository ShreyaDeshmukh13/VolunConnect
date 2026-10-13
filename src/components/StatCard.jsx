import React from 'react';

/**
 * Reusable StatCard Component
 * 
 * Demonstrates:
 * - Functional Component
 * - Props destructuring (icon, number, label, description, colorClass)
 * - Reusable UI component pattern
 */
const StatCard = ({ icon, number, label, description, colorClass = "stat-emerald" }) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="stat-card">
        <div className={`stat-icon-wrapper ${colorClass}`}>
          <i className={`bi ${icon}`}></i>
        </div>
        <div className="stat-number">{number}</div>
        <div className="stat-label">{label}</div>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
