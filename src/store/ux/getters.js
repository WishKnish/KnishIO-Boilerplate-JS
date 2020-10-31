import { getField as getFieldWrapper, } from 'vuex-map-fields';

export const getField = getFieldWrapper;

export const GET_ERROR_STATE = ( state ) => {
  return state.errorState;
};
