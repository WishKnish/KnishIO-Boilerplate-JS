import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
import { AVATAAARS_OPTIONS, } from 'src/constants/defaults';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

/**
 * Attempts to log in the user by hashing a new secret and retrieving the user's data
 *
 * @param context
 * @param {string} username
 * @param {string} password
 * @param {Vue} vm
 * @returns {Promise<void>}
 * @constructor
 */
export async function LOGIN ( context, { username, password, vm, } ) {
  console.log( 'User::login() - Hashing user secret...' );

  if ( !KNISHIO_SETTINGS.salt ) {
    throw 'User::login() - Salt is required for secure hashing!';
  }

  // Starting new Knish.IO session
  const secret = generateSecret( `${ username }:${ password }:${ KNISHIO_SETTINGS.salt }` );
  await vm.$knishio.requestAuthToken( secret );

  // Attempting to retrieve user's metadata for the given secret
  const result = await vm.$knishio.queryBundle(null, null, null, false, { createdAt: null, } );

  // Successful login, proceed to session initialization
  if(result && Object.keys( result ).length > 0 && Object.values( result )[0].createdAt) {
    console.log( 'User::login() - Logging in...' );
    await context.commit( 'SET_LOGGED_IN', true );
    await context.commit( 'SET_USERNAME', username );
    await context.dispatch( 'INIT', { newSecret: secret, vm, } );
  }
  else {
    console.log( 'User::login() - User not registered; Aborting login...' );
    await context.dispatch( 'LOGOUT', { vm, } );
  }
}

/**
 * Validates the registration state of the user to ensure there is no duplicate
 *
 * @param context
 * @param {string} username
 * @param {string} password
 * @param {Vue} vm
 * @returns {Promise<void>}
 * @constructor
 */
export async function REGISTER ( context, { username, password, vm, } ) {
  console.log( 'User::register() - Hashing user secret...' );

  if ( !KNISHIO_SETTINGS.salt ) {
    throw 'User::register() - Salt is required for secure hashing!';
  }

  // Starting new Knish.IO session
  const secret = generateSecret( `${ username }:${ password }:${ KNISHIO_SETTINGS.salt }` );
  await vm.$knishio.requestAuthToken( secret );

  // Attempting to retrieve user's metadata for the given secret
  const result = await vm.$knishio.queryBundle(null, null, null, false, { createdAt: null, } );

  // Successful login - this means we can't register!
  if(result && Object.keys( result ).length > 0 && Object.values( result )[0].createdAt) {
    console.log( 'User::register() - User already registered; Aborting registration...' );
    await context.dispatch( 'LOGOUT', { vm, } );
  }
  else {
    console.log( 'User::register() - User not registered; Registration can proceed...' );
    await context.commit( 'SET_USERNAME', username );
    await context.dispatch( 'INIT', { newSecret: secret, vm, } );
  }
}

/**
 * Clears the user state to begin an empty session
 *
 * @param context
 * @param {Vue} vm
 * @returns {Promise<void>}
 * @constructor
 */
export async function LOGOUT ( context, { vm, } ) {
  console.log( 'User::logout() - Clearing user session...' );
  await context.commit( 'SET_INITIALIZED', false );
  await vm.$knishio.deinitialize();
  await context.commit( 'SET_LOGGED_IN', false );
  await context.commit( 'SET_SECRET', null );
  await context.commit( 'SET_USERNAME', null );
  await context.commit( 'SET_BUNDLE', null );
  await context.commit( 'SET_BUNDLE_OBJECT', null );
  await context.commit( 'SET_AVATAR', null );
  await context.commit( 'SET_COVER', null );
  await context.commit( 'SET_PUBLIC_NAME', null );
  await context.commit( 'SET_CREATED_AT', null );
  await context.commit( 'SET_METAS', {} );
  await context.dispatch( 'wallet/RESET', { vm, }, { root: true, } );
  await context.commit( 'SET_INITIALIZED', true );
  console.log( 'User::logout() - User session cleared...' );
}

/**
 * Stores an existing user secret or produces a new one
 * This determines the user account all operations will work with
 *
 * @param context
 * @param {string|null} newSecret
 * @param {Vue} vm
 * @returns {Promise<void>}
 * @constructor
 */
export async function INIT ( context, { newSecret = null, vm = null, } ) {
  console.log( 'User::init() - Beginning bootstrap procedure...' );

  // Generating / recovering user's secret
  let secret, username;
  if ( newSecret ) {
    console.log( 'User::init() - Replacing user secret...' );
    secret = newSecret;
  } else {
    console.log( 'User::init() - Retrieving user identity...' );
    secret = await context.getters.GET_SECRET;
    username = await context.getters.GET_USERNAME;
  }

  // Saving secret and username locally
  await context.commit( 'SET_SECRET', secret );
  await context.commit( 'SET_USERNAME', username );

  if ( secret ) {

    // Authorizing, if necessary
    if(!vm.$knishio.hasSecret()) {
      console.log( 'User::init() - Asking Knish.IO client to retrieve authorization token...' );
      await vm.$knishio.requestAuthToken( secret );
    }

    // Getting everything the ledger knows about this bundle
    console.log( 'User::init() - Retrieving wallet bundle metadata...' );
    await context.commit( 'SET_BUNDLE', vm.$knishio.getBundle() );
    await context.dispatch( 'UPDATE', { vm: vm, } );
    await context.commit( 'SET_LOGGED_IN', true );

  } else {

    console.log( 'User::init() - User is not logged in...' );

  }

  context.commit( 'SET_INITIALIZED', true );
  console.log( 'User::init() - Bootstrap complete...' );
}

/**
 * Retrieves the latest metadata from the ledger and populates local state
 *
 * @param context
 * @param {Vue} vm
 * @returns {Promise<void>}
 * @constructor
 */
export async function UPDATE ( context, { vm, } ) {
  console.log( 'User::update() - Beginning remote update...' );

  return vm.$knishio
    .queryBundle()
    .then( result => {
      if(result && Object.keys( result ).length > 0) {

        const bundle = Object.values( result ).pop();

        context.commit( 'SET_BUNDLE_OBJECT', bundle );
        context.commit( 'SET_CREATED_AT', Number( bundle.createdAt ) );

        // Importing recovered wallets
        console.log( 'User::update() - Restoring remote wallets...' );
        vm.$knishio
          .queryWallets()
          .then( async wallets => {

            await context.dispatch( 'wallet/IMPORT', {
              secret: vm.$knishio.secret(),
              wallets: wallets,
            }, { root: true, } );

        });

        // Parsing recovered metadata
        console.log( 'User::update() - Restoring remote metadata...' );
        if(bundle.metas) {
          Object.keys( bundle.metas ).forEach( metaKey => {

            switch ( metaKey ) {
              default:
                // Ignoring irrelevant meta
                break;

              case 'publicName':
                console.log( `User::update() - Setting public name to ${ bundle.metas[ metaKey ] }...` );
                context.commit( 'SET_PUBLIC_NAME', bundle.metas[ metaKey ] );
                break;

              case 'avatar':
                if ( bundle.metas[ metaKey ] ) {
                  console.log( 'User::update() - Setting custom avatar...' );
                  context.commit( 'SET_AVATAR', bundle.metas[ metaKey ] );
                }
                break;
            }

          } );

          context.commit( 'SET_METAS', bundle.metas );
        }
        else {
          console.warn( 'User::update() - No remote metadata found...' );
        }

        if ( !context.getters.GET_AVATAR ) {

          // Generate a random avatar
          context.commit( 'SET_AVATAR', `https://avatars.dicebear.com/v2/avataaars/${ bundle.bundleHash }.svg?${ AVATAAARS_OPTIONS }` );

        }

        console.log( 'User::update() - Update complete...' );
        context.commit( 'SET_INITIALIZED', true );
      }
    } );
}
