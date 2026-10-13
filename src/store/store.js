import { legacy_createStore as createStore } from 'redux';
import { registrationReducer, initialState } from './registrationReducer';

export const STORAGE_KEY = 'volunconnect.registrations';

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? { registrations: saved } : initialState;
  } catch {
    return initialState;
  }
}

// Store factory (tests create isolated stores); persists state on every change
export function createAppStore(preloadedState = loadState()) {
  const store = createStore(registrationReducer, preloadedState);
  store.subscribe(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().registrations)); } catch { /* ignore */ }
  });
  return store;
}

export const store = createAppStore();
