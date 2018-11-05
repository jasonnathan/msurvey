import { all, omit } from 'ramda';
export const TYPES = {
  INIT: '@features/forms/INIT',
  SET_ERROR: '@features/forms/SET_ERROR',
  UNSET_ERROR: '@features/forms/UNSET_ERROR'
};

export default function reducer(state = {}, action) {
  switch (action.type) {
      case TYPES.INIT:
        return {
          ...state,
          [action.payload.name]: {
            pristine: 1
          }
        };
      case TYPES.SET_ERROR:
        return {
          ...state,
          [action.payload.name]: {
            [action.payload.field]: true,
            pristine: 0
          }
        };
      case TYPES.UNSET_ERROR:
        return {
          ...state,
          [action.payload.name]: {
            [action.payload.field]: false,
            pristine: 0
          }
        };
      default:
        return state;
  }
}

export const init = name => ({
  type: TYPES.INIT,
  payload: { name }
});

export const setError = (name, field) => ({
  type: TYPES.SET_ERROR,
  payload: { name, field }
});

export const unsetError = (name, field) => ({
  type: TYPES.UNSET_ERROR,
  payload: { name, field }
});

export const formHasErrors = obj => {
  return all(Boolean, Object.values(omit(['pristine'], obj)));
};
