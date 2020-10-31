import { updateField as setFieldWrapper, } from 'vuex-map-fields';

export const updateField = setFieldWrapper;

export const RESET_STATE = ( state, defaultState ) => {
  console.log( 'User::resetState() - Mutating cart state...' );
  Object.keys( defaultState ).forEach( key => {
    state[ key ] = defaultState[ key ];
  } );
};

export const SET_CHECKOUT_PRODUCTS = ( state, checkoutProducts ) => {
  state.checkoutProducts = checkoutProducts;
};
