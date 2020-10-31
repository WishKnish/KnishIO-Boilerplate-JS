import { getField as getFieldWrapper, } from 'vuex-map-fields';
import { connectionDB, getDataPromise, } from 'src/libraries/storageDB';

// Declaring indexedDB database
const db = connectionDB();

export const getField = getFieldWrapper;

export const GET_DEFAULT_STATE = () => {
  return {
    secret: null,
    username: null,
    bundle: null,
    bundleObject: null,
    avatar: null,
    cover: null,
    publicName: null,
    metas: null,
    createdAt: null,
    loggedIn: false,
    initialized: false,
    authToken: '',
  };
};

export const GET_SECRET = async ( state ) => {
  return state.secret ? state.secret : getDataPromise( db, 'secret' );
};

export const GET_USERNAME = ( state ) => {
  return state.username ? state.username : getDataPromise( db, 'username' );
};

export const GET_AVATAR = ( state ) => {
  return state.avatar;
};

export const GET_COVER = ( state ) => {
  return state.cover;
};

export const GET_BUNDLE = ( state ) => {
  return state.bundle;
};

export const GET_PUBLIC_NAME = ( state ) => {
  return state.publicName;
};

export const GET_METAS = ( state ) => {
  return state.metas;
};

export const GET_BUNDLE_OBJECT = ( state ) => {
  return state.bundleObject;
};

export const GET_INITIALIZED = ( state ) => {
  return state.initialized;
};

export const GET_LOGGED_IN = ( state ) => {
  return state.loggedIn;
};

export const GET_AUTHTOKEN = ( state ) => {
  return state.authToken;
};
