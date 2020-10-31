// Knish.IO-specific constants
export const KNISHIO_SETTINGS = {
  salt: process.env.KNISHIO_APP_SALT,
  appSlug: process.env.KNISHIO_APP_SLUG,
  serverUri: `${ [ true, 'true', ].includes( process.env.KNISHIO_SERVER_HTTPS ) ? 'https' : 'http' }://${ process.env.KNISHIO_SERVER_HOST }:${ process.env.KNISHIO_SERVER_PORT }/${ process.env.KNISHIO_SERVER_PATH }`,
};
