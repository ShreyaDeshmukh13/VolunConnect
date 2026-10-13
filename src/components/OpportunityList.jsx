import React, { useMemo } from 'react';
import useDebounce from '../hooks/useDebounce';
import OpportunityCard from './OpportunityCard';
import { volunteerCategories } from '../data/opportunities';

/**
 * OpportunityList Component
 * 
 * Demonstrates:
 * - Dynamic list rendering using Array.prototype.map()
 * - Crucial React 'key' prop on mapped items for reconciliation
 * - Props passing to child components (OpportunityCard)
 * - Filtering logic with Array.prototype.filter()
 * - Conditional rendering for empty results state
 */
const OpportunityList = ({
  opportunities,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectOpportunity
}) => {
  // Debounce the search text and memoise filtering (performance)
  const debouncedQuery = useDebounce(searchQuery, 250);
  const filteredOpportunities = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return opportunities.filter((opp) => {
      const matchesCategory =
        selectedCategory === 'All' || opp.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = [opp.title, opp.description, opp.location, opp.category, opp.organizer]
        .some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [opportunities, selectedCategory, debouncedQuery]);

  return (
    <section id="opportunities" className="opportunities-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <i className="bi bi-compass"></i> Discover Initiatives
          </span>
          <h2 className="section-title">Volunteer Opportunities</h2>
          <p className="section-subtitle">
            Browse through active community drives, find a cause that aligns with your passions, 
            and register with a single click.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="filter-bar-wrapper">
          <div className="row g-3 align-items-center">
            
            {/* Search Input */}
            <div className="col-12 col-lg-5">
              <div className="search-input-group">
                <i className="bi bi-search search-icon"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title, location, or keyword..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search volunteer opportunities"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="col-12 col-lg-7">
              <div className="category-pills-container">
                {volunteerCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onSelectCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Opportunities Grid / Empty State */}
        {filteredOpportunities.length > 0 ? (
          <div className="row g-4">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onSelectOpportunity={onSelectOpportunity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 border p-4">
            <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-3 fw-bold text-dark">No Opportunities Found</h4>
            <p className="text-muted">
              We couldn't find any volunteering initiatives matching "{searchQuery}" in "{selectedCategory}".
            </p>
            <button
              type="button"
              className="btn btn-outline-primary mt-2"
              onClick={() => {
                onSearchChange('');
                onSelectCategory('All');
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default OpportunityList;
