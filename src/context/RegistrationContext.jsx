import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { registrationReducer, initialState } from "./registrationReducer";
import { volunteerOpportunities } from "../data/opportunities";

const STORAGE_KEY = "volunconnect.registrations";
const RegistrationContext = createContext(null);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? { registrations: saved } : initialState;
  } catch {
    return initialState;
  }
}

export function RegistrationProvider({ children }) {
  const [state, dispatch] = useReducer(registrationReducer, undefined, loadState);

  // Persist on every change (side effect)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.registrations)); } catch { /* ignore */ }
  }, [state.registrations]);

  // Opportunities with live slot counts (derived data)
  const opportunities = useMemo(
    () => volunteerOpportunities.map((o) => ({
      ...o,
      registeredCount: o.registeredCount +
        state.registrations.filter((r) => String(r.opportunityId) === String(o.id)).length,
    })),
    [state.registrations]
  );

  const addRegistration = useCallback((data) => {
    const opp = opportunities.find((o) => String(o.id) === String(data.opportunityId));
    if (!opp) return { ok: false, error: "Selected opportunity does not exist." };
    if (opp.registeredCount >= opp.slots) return { ok: false, error: "Sorry, this drive is full." };
    if (state.registrations.some((r) => String(r.opportunityId) === String(data.opportunityId) &&
        r.email.toLowerCase() === data.email.toLowerCase()))
      return { ok: false, error: "This email is already registered for this drive." };
    dispatch({ type: "ADD", payload: data });
    return { ok: true };
  }, [opportunities, state.registrations]);

  const cancelRegistration = useCallback((id) => dispatch({ type: "CANCEL", id }), []);

  const value = useMemo(
    () => ({ opportunities, registrations: state.registrations, addRegistration, cancelRegistration }),
    [opportunities, state.registrations, addRegistration, cancelRegistration]
  );
  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
}

export function useRegistrations() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistrations must be used inside <RegistrationProvider>");
  return ctx;
}
