import { registrationReducer, initialState } from '../store/registrationReducer';
import { addRegistrationAction, cancelRegistrationAction, clearRegistrationsAction } from '../store/actions';
import { createAppStore } from '../store/store';

const reg = (over = {}) => ({ registrationId: 'VOL-1', opportunityId: '1', email: 'a@x.com', name: 'A', ...over });

describe('registrationReducer', () => {
  it('adds a registration', () => {
    expect(registrationReducer(initialState, addRegistrationAction(reg())).registrations).toHaveLength(1);
  });
  it('ignores duplicate email for the same drive', () => {
    const s1 = registrationReducer(initialState, addRegistrationAction(reg()));
    const s2 = registrationReducer(s1, addRegistrationAction(reg({ registrationId: 'VOL-2', email: 'A@X.com' })));
    expect(s2.registrations).toHaveLength(1);
  });
  it('allows same email on a different drive', () => {
    const s1 = registrationReducer(initialState, addRegistrationAction(reg()));
    const s2 = registrationReducer(s1, addRegistrationAction(reg({ registrationId: 'VOL-2', opportunityId: '2' })));
    expect(s2.registrations).toHaveLength(2);
  });
  it('cancels by id and clears', () => {
    const s1 = registrationReducer(initialState, addRegistrationAction(reg()));
    expect(registrationReducer(s1, cancelRegistrationAction('VOL-1')).registrations).toHaveLength(0);
    expect(registrationReducer(s1, clearRegistrationsAction())).toEqual(initialState);
  });
  it('returns same state for unknown action', () => {
    expect(registrationReducer(initialState, { type: 'NOPE' })).toBe(initialState);
  });
});

describe('store', () => {
  it('dispatch updates state and persists to localStorage', () => {
    const store = createAppStore({ registrations: [] });
    store.dispatch(addRegistrationAction(reg()));
    expect(store.getState().registrations).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('volunconnect.registrations'))).toHaveLength(1);
  });
});
