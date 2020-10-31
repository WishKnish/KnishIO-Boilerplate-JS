import { updateField as setFieldWrapper, } from 'vuex-map-fields';

export const updateField = setFieldWrapper;

export const SET_ERROR_STATE = ( state, errorState ) => {
  state.errorState = errorState;
};
