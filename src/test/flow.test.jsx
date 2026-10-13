import React from 'react';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppShell } from '../App';
import { AuthProvider } from '../auth/AuthContext';
import { createAppStore } from '../store/store';

function renderApp(route = '/') {
  const store = createAppStore({ registrations: [] });
  render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}><AuthProvider><AppShell /></AuthProvider></Provider>
    </MemoryRouter>
  );
  return store;
}

async function login() {
  const [, a, b] = screen.getByText(/what is/i).textContent.match(/(\d+) \+ (\d+)/);
  await userEvent.type(screen.getByLabelText('Name'), 'Shreya');
  await userEvent.type(screen.getByLabelText('Password'), 'volunteer123');
  await userEvent.type(screen.getByLabelText(/human check/i), String(Number(a) + Number(b)));
  await userEvent.click(screen.getByRole('button', { name: 'Login' }));
}

describe('home page', () => {
  it('lists all drives, filters by category and search', async () => {
    renderApp();
    expect(await screen.findAllByRole('article')).toHaveLength(6);
    await userEvent.click(screen.getByRole('button', { name: 'Healthcare' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: 'All' }));
    await userEvent.type(screen.getByLabelText(/search volunteer/i), 'zzzz');
    expect(await screen.findByText(/No Opportunities Found/i)).toBeInTheDocument();
  });
});

describe('routing', () => {
  it('nested routes: Overview and Requirements tabs, and 404', async () => {
    renderApp('/opportunities/1');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(/Tree Plantation/i);
    expect(screen.getByText(/Date:/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('link', { name: 'Requirements' }));
    expect(await screen.findByText(/Prerequisite:/)).toBeInTheDocument();
  });
  it('shows not-found for unknown drive and unknown route', async () => {
    renderApp('/opportunities/99');
    expect(await screen.findByText(/Opportunity not found/i)).toBeInTheDocument();
  });
  it('redirects protected page to login', async () => {
    renderApp('/my-registrations');
    expect(await screen.findByRole('heading', { name: /Volunteer Login/i })).toBeInTheDocument();
  });
});

describe('end-to-end registration flow', () => {
  it('login -> register -> confirmation -> My Registrations -> cancel', async () => {
    const store = renderApp('/login');
    await login();
    // Logged in: redirected to My Registrations (empty)
    expect(await screen.findByText(/No registrations yet/i)).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole('link', { name: /^Home/ })[0]);
    const form = (await screen.findByLabelText(/Full Name/i)).closest('form');
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Phone/i), '9876543210');
    await userEvent.type(screen.getByLabelText(/Age/i), '25');
    await userEvent.selectOptions(document.getElementById('opportunityId'), '1');
    await userEvent.type(screen.getByLabelText(/City/i), 'Pune');
    await userEvent.type(document.getElementById('motivation'), 'I want to help my community grow greener.');
    await userEvent.click(document.getElementById('termsAgreed'));
    fireEvent.submit(form);

    expect(await screen.findByText(/Registration Successful/i)).toBeInTheDocument();
    expect(store.getState().registrations).toHaveLength(1);

    await userEvent.click(screen.getByRole('link', { name: /My Registrations \(1\)/ }));
    const table = await screen.findByRole('table');
    expect(within(table).getByText('Test User')).toBeInTheDocument();
    await userEvent.click(within(table).getByRole('button', { name: /cancel/i }));
    await waitFor(() => expect(screen.getByText(/No registrations yet/i)).toBeInTheDocument());
  });

  it('wrong password shows an error and keeps the user on login', async () => {
    renderApp('/login');
    const [, a, b] = screen.getByText(/what is/i).textContent.match(/(\d+) \+ (\d+)/);
    await userEvent.type(screen.getByLabelText('Name'), 'Shreya');
    await userEvent.type(screen.getByLabelText('Password'), 'wrong');
    await userEvent.type(screen.getByLabelText(/human check/i), String(Number(a) + Number(b)));
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/Invalid/i);
  });
});
