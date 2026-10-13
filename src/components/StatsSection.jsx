import React from 'react';
import StatCard from './StatCard';
import { volunteerStats } from '../data/opportunities';

/**
 * StatsSection Component
 * 
 * Demonstrates:
 * - Dynamic list rendering using .map()
 * - Unique 'key' prop assignment
 * - Component composition (parent StatsSection rendering multiple StatCard children)
 * - Passing props to child components
 */
const StatsSection = () => {
  return (
    <section id="stats" className="stats-section">
      <div className="container">
        
        <div className="row text-center mb-4">
          <div className="col-12">
            <span className="section-badge">
              <i className="bi bi-graph-up-arrow"></i> Real-Time Community Metrics
            </span>
            <h2 className="section-title">Our Collective Impact</h2>
            <p className="section-subtitle">
              Transparency and measurable change driven by passionate student and community volunteers.
            </p>
          </div>
        </div>

        {/* Dynamic Rendering of StatCards */}
        <div className="row g-4">
          {volunteerStats.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              number={stat.number}
              label={stat.label}
              description={stat.description}
              colorClass={stat.colorClass}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
