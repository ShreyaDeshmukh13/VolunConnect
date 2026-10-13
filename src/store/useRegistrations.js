import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { volunteerOpportunities } from '../data/opportunities';
import { addRegistrationAction, cancelRegistrationAction } from './actions';

// Facade over the Redux store used by all components
export function useRegistrations() {
  const registrations = useSelector((s) => s.registrations);
  const dispatch = useDispatch();

  // Opportunities with live slot counts (derived data)
  const opportunities = useMemo(
    () => volunteerOpportunities.map((o) => ({
      ...o,
      registeredCount: o.registeredCount +
        registrations.filter((r) => String(r.opportunityId) === String(o.id)).length,
    })),
    [registrations]
  );

  const addRegistration = useCallback((data) => {
    const opp = opportunities.find((o) => String(o.id) === String(data.opportunityId));
    if (!opp) return { ok: false, error: 'Selected opportunity does not exist.' };
    if (opp.registeredCount >= opp.slots) return { ok: false, error: 'Sorry, this drive is full.' };
    if (registrations.some((r) => String(r.opportunityId) === String(data.opportunityId) &&
        r.email.toLowerCase() === data.email.toLowerCase()))
      return { ok: false, error: 'This email is already registered for this drive.' };
    dispatch(addRegistrationAction(data));
    return { ok: true };
  }, [opportunities, registrations, dispatch]);

  const cancelRegistration = useCallback((id) => dispatch(cancelRegistrationAction(id)), [dispatch]);

  return { opportunities, registrations, addRegistration, cancelRegistration };
}
