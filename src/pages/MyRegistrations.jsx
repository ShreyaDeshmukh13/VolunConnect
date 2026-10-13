import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useRegistrations } from "../store/useRegistrations";

export default function MyRegistrations() {
  const { registrations, cancelRegistration } = useRegistrations();
  useEffect(() => { document.title = "My Registrations | VolunConnect"; }, []);

  const sorted = useMemo(
    () => [...registrations].sort((a, b) => a.registrationId.localeCompare(b.registrationId)),
    [registrations]
  );

  return (
    <div className="container py-5">
      <h1 className="mb-4">My Registrations ({sorted.length})</h1>
      {sorted.length === 0 ? (
        <p>No registrations yet. <Link to="/">Browse opportunities</Link></p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>ID</th><th>Volunteer</th><th>Drive</th><th>Date</th><th /></tr></thead>
            <tbody>
              {sorted.map((r) => (
                <tr key={r.registrationId}>
                  <td>{r.registrationId}</td>
                  <td>{r.name}<br /><small className="text-muted">{r.email}</small></td>
                  <td>{r.opportunityDetails?.title}</td>
                  <td>{r.opportunityDetails?.date}</td>
                  <td><button className="btn btn-sm btn-outline-danger"
                    onClick={() => cancelRegistration(r.registrationId)}>Cancel</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
