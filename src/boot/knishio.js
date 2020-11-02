import { KnishIOClient, } from '@wishknish/knishio-client-js';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

export default async ( { Vue, } ) => {

  console.log( `Boot::knishio() - Creating Knish.IO client to endpoint ${ KNISHIO_SETTINGS.serverUri }...` );
  const client = new KnishIOClient( KNISHIO_SETTINGS.serverUri, null, 2 );

  console.log( `Boot::knishio() - Application cell for this session is ${ KNISHIO_SETTINGS.appSlug }...` );
  client.setCellSlug( KNISHIO_SETTINGS.appSlug );

  console.log( 'Boot::knishio() - Injecting Knish.IO client into Vue session...' );
  Vue.prototype.$knishio = client;

};
