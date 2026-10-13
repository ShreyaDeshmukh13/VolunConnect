// Action types and action creators
export const ADD_REGISTRATION = 'registrations/add';
export const CANCEL_REGISTRATION = 'registrations/cancel';
export const CLEAR_REGISTRATIONS = 'registrations/clear';

export const addRegistrationAction = (payload) => ({ type: ADD_REGISTRATION, payload });
export const cancelRegistrationAction = (id) => ({ type: CANCEL_REGISTRATION, id });
export const clearRegistrationsAction = () => ({ type: CLEAR_REGISTRATIONS });
