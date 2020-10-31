import { updateField as setFieldWrapper, } from 'vuex-map-fields';

export const updateField = setFieldWrapper;

export const RESET_STATE = ( state, defaultState ) => {
  Object.keys( defaultState ).forEach( key => {
    state[ key ] = defaultState[ key ];
  } );
};

export const SET_WALLET = ( state, wallet ) => {
  const oldWallet = state.wallets[ wallet.token ] || null;
  if ( !oldWallet || !wallet.createdAt || oldWallet.createdAt <= wallet.createdAt ) {
    console.log( `Wallet::SET_WALLET - Setting ${ wallet.token } wallet with a balance of ${ wallet.balance }...` );
    state.wallets[ wallet.token ] = wallet;
    state.wallets = state.wallets;
  } else {
    console.log( `Wallet::SET_WALLET - ${ wallet.token } wallet with a balance of ${ wallet.balance } is outdated; Not setting...` );
  }
};

export const SET_SHADOW_WALLET = ( state, wallet ) => {
  console.log( `Wallet::SET_WALLET - Setting ${ wallet.token } shadow wallet...` );
  state.shadowWallets[ wallet.token ] = wallet;
  state.shadowWallets = state.shadowWallets;
};
