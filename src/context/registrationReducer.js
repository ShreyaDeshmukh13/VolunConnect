export const initialState = { registrations: [] };

export function registrationReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { opportunityId, email } = action.payload;
      const duplicate = state.registrations.some(
        (r) => String(r.opportunityId) === String(opportunityId) &&
               r.email.toLowerCase() === email.toLowerCase()
      );
      return duplicate ? state : { registrations: [...state.registrations, action.payload] };
    }
    case "CANCEL":
      return { registrations: state.registrations.filter((r) => r.registrationId !== action.id) };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}
