import { updateField as setFieldWrapper, } from 'vuex-map-fields';
import { connectionDB, deleteDataPromise, setDataPromise, } from 'src/libraries/storageDB';

// Declaring indexedDB database
const db = connectionDB();

export const updateField = setFieldWrapper;

export const RESET_STATE = async ( state, defaultState ) => {
  console.log( 'User::resetState() - Mutating user state...' );
  await deleteDataPromise( db, 'username' );
  await deleteDataPromise( db, 'secret' );
  Object.assign(state, defaultState);
};

export const SET_USERNAME = async ( state, username ) => {
  state.username = username;
  await setDataPromise( db, 'username', username );
};

export const SET_SECRET = async ( state, secret ) => {
  state.secret = secret;
  await setDataPromise( db, 'secret', secret );
};

export const SET_BUNDLE = ( state, bundle ) => {
  state.bundle = bundle;
};

export const SET_BUNDLE_OBJECT = ( state, bundleObject ) => {
  state.bundleObject = bundleObject;
};

export const SET_COVER = ( state, cover ) => {
  state.cover = cover;
};

export const SET_AVATAR = ( state, avatar ) => {
  state.avatar = avatar;
};

export const SET_PUBLIC_NAME = ( state, publicName ) => {
  state.publicName = publicName;
};

export const SET_CREATED_AT = ( state, createdAt ) => {
  state.createdAt = createdAt;
};

export const SET_METAS = ( state, metas ) => {
  state.metas = metas;
};

export const SET_INITIALIZED = ( state, initialized ) => {
  state.initialized = initialized;
};

export const SET_LOGGED_IN = ( state, loggedIn ) => {
  state.loggedIn = loggedIn;
};

export const SET_AUTHTOKEN = ( state, xAuthToken ) => {
  state.authToken = xAuthToken;
};
