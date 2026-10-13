import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_PASSWORD } from '../auth/AuthContext';
import Captcha from '../components/Captcha';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [human, setHuman] = useState(false);
  const [error, setError] = useState('');
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => { document.title = 'Login | VolunConnect'; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(name, password);
      navigate(location.state?.from || '/my-registrations', { replace: true });
    } catch (err) {
      setError(err.message);
      setResetKey((k) => k + 1); // new captcha after a failed attempt
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <h1 className="mb-3">Volunteer Login</h1>
      <p className="text-muted small">Demo login: any name, password <code>{DEMO_PASSWORD}</code>.</p>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login-name" className="form-label">Name</label>
          <input id="login-name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">Password</label>
          <input id="login-password" type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Captcha onVerified={setHuman} resetKey={resetKey} />
        <button type="submit" className="btn btn-primary w-100" disabled={!human || !name || !password}>Login</button>
      </form>
    </div>
  );
}
