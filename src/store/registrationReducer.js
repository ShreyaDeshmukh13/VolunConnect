import { ADD_REGISTRATION, CANCEL_REGISTRATION, CLEAR_REGISTRATIONS } from './actions';

export const initialState = { registrations: [] };

// Pure reducer: (state, action) => newState
export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REGISTRATION: {
      const { opportunityId, email } = action.payload;
      const duplicate = state.registrations.some(
        (r) => String(r.opportunityId) === String(opportunityId) &&
               r.email.toLowerCase() === email.toLowerCase()
      );
      return duplicate ? state : { registrations: [...state.registrations, action.payload] };
    }
    case CANCEL_REGISTRATION:
      return { registrations: state.registrations.filter((r) => r.registrationId !== action.id) };
    case CLEAR_REGISTRATIONS:
      return initialState;
    default:
      return state;
  }
}
