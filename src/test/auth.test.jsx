import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signJwt, verifyJwt } from '../auth/jwt';
import Captcha from '../components/Captcha';

describe('JWT', () => {
  it('signs and verifies a token', async () => {
    const t = await signJwt({ sub: 'Asha' }, 's3cret');
    expect(t.split('.')).toHaveLength(3);
    expect((await verifyJwt(t, 's3cret')).sub).toBe('Asha');
  });
  it('rejects wrong secret, tampered payload and expired token', async () => {
    const t = await signJwt({ sub: 'Asha' }, 's3cret');
    expect(await verifyJwt(t, 'other')).toBeNull();
    const [h, , s] = t.split('.');
    const forged = `${h}.${btoa(JSON.stringify({ sub: 'admin', exp: 9999999999 }))}.${s}`;
    expect(await verifyJwt(forged, 's3cret')).toBeNull();
    expect(await verifyJwt(await signJwt({}, 's3cret', -10), 's3cret')).toBeNull();
    expect(await verifyJwt('garbage', 's3cret')).toBeNull();
  });
});

describe('Captcha', () => {
  it('verifies only with the right answer', async () => {
    const onVerified = vi.fn();
    render(<Captcha onVerified={onVerified} />);
    const [, a, b] = screen.getByText(/what is/i).textContent.match(/(\d+) \+ (\d+)/);
    await userEvent.type(screen.getByLabelText(/human check/i), String(Number(a) + Number(b) + 1));
    expect(onVerified).toHaveBeenLastCalledWith(false);
    await userEvent.clear(screen.getByLabelText(/human check/i));
    await userEvent.type(screen.getByLabelText(/human check/i), String(Number(a) + Number(b)));
    expect(onVerified).toHaveBeenLastCalledWith(true);
  });
  it('fails when the honeypot is filled', async () => {
    const onVerified = vi.fn();
    const { container } = render(<Captcha onVerified={onVerified} />);
    const [, a, b] = screen.getByText(/what is/i).textContent.match(/(\d+) \+ (\d+)/);
    await userEvent.type(screen.getByLabelText(/human check/i), String(Number(a) + Number(b)));
    await userEvent.type(container.querySelector('input[name="website"]'), 'spam');
    expect(onVerified).toHaveBeenLastCalledWith(false);
  });
});
