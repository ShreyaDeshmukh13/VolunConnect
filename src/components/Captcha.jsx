import React, { useState, useEffect } from 'react';

const newQuestion = () => ({ a: 1 + Math.floor(Math.random() * 9), b: 1 + Math.floor(Math.random() * 9) });

// Human verification: arithmetic challenge + hidden honeypot field (bots tend to fill every input)
export default function Captcha({ onVerified, resetKey = 0 }) {
  const [q, setQ] = useState(newQuestion);
  const [answer, setAnswer] = useState('');
  const [trap, setTrap] = useState('');

  useEffect(() => { setQ(newQuestion()); setAnswer(''); }, [resetKey]);
  useEffect(() => {
    onVerified(Number(answer) === q.a + q.b && trap === '');
  }, [answer, trap, q]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mb-3">
      <label htmlFor="captcha" className="form-label">Human check: what is {q.a} + {q.b}?</label>
      <input id="captcha" className="form-control" inputMode="numeric" value={answer}
        onChange={(e) => setAnswer(e.target.value)} autoComplete="off" />
      {/* Honeypot: hidden from real users */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px' }} value={trap} onChange={(e) => setTrap(e.target.value)} />
    </div>
  );
}
