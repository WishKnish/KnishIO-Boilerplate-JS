import { getField as getFieldWrapper, } from 'vuex-map-fields';

export const getField = getFieldWrapper;

export const GET_DEFAULT_STATE = () => {
  return {
    wallets: {},
    shadowWallets: {},
  };
};

export const GET_WALLETS = state => () => {
  return state.wallets;
};
