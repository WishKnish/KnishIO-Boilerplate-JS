import { getField as getFieldWrapper, } from 'vuex-map-fields';

export const getField = getFieldWrapper;

export const GET_DEFAULT_STATE = () => {
  return {
    checkoutProducts: {},
    favoriteProducts: {},
    favoriteBrands: {},
    favoriteCards: {},
  };
};

export const GET_CHECKOUT_PRODUCTS = state => () => {
  return state.checkoutProducts;
};
