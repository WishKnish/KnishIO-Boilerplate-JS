export const APP_SETTINGS = {
  appUri: `${ [ true, 'true', ].includes( process.env.KNISHIO_APP_HTTPS ) ? 'https' : 'http' }://${ process.env.KNISHIO_APP_HOST }`,
  appHost: `${ process.env.KNISHIO_APP_HOST }`,
  languages: {
    'en-us': {
      label: 'English',
      flag: 'us',
    },
    /*
    'es': {
      label: 'Español',
      flag: 'mx',
    },
    'cn': {
      label: '汉语',
      flag: 'cn',
    },
    'ru': {
      label: 'Русский',
      flag: 'ru',
    },
     */
  },
};
export const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'MM-DD-YYYY';
export const TRANSITIONS = {
  in: 'jump-up',
  out: 'jump-down',
  enter: 'animated fadeIn',
  leave: 'animated fadeOut',
};
export const PAGINATION_DEFAULTS = {
  rowsPerPage: 12,
  sortBy: 'created',
  descending: true,
};
export const AVATAAARS_OPTIONS = 'options[mouth]=["smile","smile","serious","tongue","twinkle"]&options[eyebrow]=["defaultValue","flat","raised","unibrow","up"]';
