import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { signJwt, verifyJwt } from './jwt';

const TOKEN_KEY = 'volunconnect.token';
const SECRET = import.meta.env.VITE_JWT_SECRET || 'volunconnect-demo-secret';
export const DEMO_PASSWORD = 'volunteer123';

const AuthContext = createContext(null);

// Context is used here (small, rarely-changing session data); Redux holds the registrations.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Restore and verify the stored token on startup
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      setUser(token ? await verifyJwt(token, SECRET) : null);
      setReady(true);
    })();
  }, []);

  const login = useCallback(async (name, password) => {
    if (!name.trim() || password !== DEMO_PASSWORD) throw new Error('Invalid name or password.');
    const token = await signJwt({ sub: name.trim() }, SECRET, 3600);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(await verifyJwt(token, SECRET));
  }, []);

  const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); setUser(null); }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
