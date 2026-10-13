import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useRegistrations } from '../store/useRegistrations';

// Layout route: header + tabs, child routes render inside <Outlet />
export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities } = useRegistrations();
  const opp = opportunities.find((o) => String(o.id) === id);

  useEffect(() => { document.title = opp ? `${opp.title} | VolunConnect` : 'Not found | VolunConnect'; }, [opp]);

  if (!opp) {
    return (
      <div className="container py-5 text-center">
        <h2>Opportunity not found</h2>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
      </div>
    );
  }
  const left = Math.max(0, opp.slots - opp.registeredCount);
  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <Link to="/" className="text-decoration-none">&larr; All opportunities</Link>
      <h1 className="mt-3">{opp.title}</h1>
      <p className="text-muted">{opp.organizer} &middot; {opp.category}</p>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item"><NavLink end to="" className="nav-link">Overview</NavLink></li>
        <li className="nav-item"><NavLink to="requirements" className="nav-link">Requirements</NavLink></li>
      </ul>
      <Outlet context={opp} />
      <button className="btn btn-primary mt-3" disabled={left === 0}
        onClick={() => navigate('/', { state: { opportunityId: opp.id } })}>
        {left === 0 ? 'Drive full' : 'Register for this drive'}
      </button>
    </div>
  );
}
