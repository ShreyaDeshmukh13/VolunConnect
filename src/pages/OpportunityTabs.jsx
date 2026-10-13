import React from 'react';
import { useOutletContext } from 'react-router-dom';

export function Overview() {
  const opp = useOutletContext();
  return (
    <div>
      <p>{opp.description}</p>
      <ul className="list-unstyled">
        <li><strong>Date:</strong> {opp.date}</li>
        <li><strong>Time:</strong> {opp.time} ({opp.duration})</li>
        <li><strong>Location:</strong> {opp.location}</li>
      </ul>
    </div>
  );
}

export function Requirements() {
  const opp = useOutletContext();
  const left = Math.max(0, opp.slots - opp.registeredCount);
  return (
    <ul className="list-unstyled">
      <li><strong>Prerequisite:</strong> {opp.requirement}</li>
      <li><strong>Organizer:</strong> {opp.organizer}</li>
      <li><strong>Slots left:</strong> {left} of {opp.slots}</li>
    </ul>
  );
}
