import { Wallet, } from '@wishknish/knishio-client-js';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

export function INIT ( context, { secret, token, position = null, } ) {
  const wallet = new Wallet( secret, token, position );
  context.commit( 'SET_WALLET', wallet );
}

export async function RESET ( context ) {
  console.log( 'Wallet::reset() - Deleting wallet meta...' );
  context.commit( 'RESET_STATE', context.getters.GET_DEFAULT_STATE );
}

export async function IMPORT ( context, { secret, wallets, } ) {
  console.log( `Wallet::import() - Preparing to restore ${ wallets.length } remote wallets...` );

  // If we have an address, t's a regular wallet; otherwise, it's a show wallet
  wallets.forEach( wallet => {
    if ( wallet.address ) {
      context.commit( 'SET_WALLET', wallet );
    } else {
      context.commit( 'SET_SHADOW_WALLET', wallet );
    }
  });

  if ( !context.getters.GET_WALLETS().USER ) {
    console.log( 'Wallet::import() - No USER wallet restored - initializing locally...' );

    // Generating initial master wallet
    await context.dispatch( 'wallet/INIT', { secret, token: 'USER', }, { root: true, } );
  }

  console.log( 'Wallet::import() - All remote wallets restored...' );
}
