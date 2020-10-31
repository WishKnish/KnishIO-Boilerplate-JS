import {
  connectionDB,
  getDataPromise, setDataPromise,
} from 'src/libraries/storageDB';

// Declaring indexedDB database
const db = connectionDB();

export async function INIT ( context ) {

  let checkoutProducts = await getDataPromise( db, 'checkoutProducts' );
  if (checkoutProducts) {
    await context.commit( 'SET_CHECKOUT_PRODUCTS', checkoutProducts );
  }
}

export async function UPDATE_CHECKOUT_STATE ( context, ) {
  let products = context.getters.GET_CHECKOUT_PRODUCTS();
  setDataPromise( db, 'checkoutProducts', products );
}
