import Vue from 'vue';
import Vuex from 'vuex';

import user from './user';
import wallet from './wallet';
import ux from './ux';
import cart from './cart';

Vue.use( Vuex );

const store = new Vuex.Store( {
  namespaced: true,
  modules: {
    user: user,
    ux: ux,
    wallet: wallet,
    cart: cart,
  },
} );

export default store;
