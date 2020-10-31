import {
  EMAIL_PATTERN,
  FULL_NAME_PATTERN,
  URL_PATTERN,
} from 'src/constants/patterns';
import {
  APP_SETTINGS,
  DATE_FORMAT,
  TIMESTAMP_FORMAT,
  TRANSITIONS,
} from 'src/constants/defaults';
import { dom, date, scroll, } from 'quasar';
import { randomString, truncateMiddle, } from 'src/libraries/strings';
const { height, } = dom;

export default {
  data () {
    return {
      transitions: TRANSITIONS,
      emailPattern: EMAIL_PATTERN,
      urlPattern: URL_PATTERN,
      fullNamePattern: FULL_NAME_PATTERN,
      dateFormat: DATE_FORMAT,
      timestampFormat: TIMESTAMP_FORMAT,

      whitelabel: APP_SETTINGS.whitelabel,
      appUri: APP_SETTINGS.appUri,
      appHost: APP_SETTINGS.appHost,
      languages: APP_SETTINGS.languages,

      formHasError: false,
    };
  },
  computed: {
    language () {
      return this.$i18n.locale;
    },
  },
  methods: {

    /**
     * Translates an i18n key, overridable by whitelabel (if present)
     *
     * @param key
     * @returns {VueI18n.TranslateResult}
     */
    trans ( key ) {
      if ( this.whitelabel && this.$te( `${ key }_${ this.whitelabel }` ) ) {
        return this.$t( `${ key }_${ this.whitelabel }` );
      } else {
        return this.$t( key );
      }
    },

    /**
     * Forces validation on a list of refs
     *
     * @param fields
     * @returns {boolean}
     */
    validate ( fields ) {
      const refs = this.$refs;
      let formHasError = false;
      fields.forEach( ( field ) => {
        if ( refs[ field ] ) {
          const validator = refs[ field ].validate || refs [ field ].$children[ 0 ].validate;
          validator();
          if ( refs[ field ].hasError ) {
            formHasError = true;
          }
        }
      } );
      this.formHasError = formHasError;
      return !this.formHasError;
    },

    /**
     * Sets the i18n locale
     *
     * @param key
     */
    setLanguage ( key ) {
      this.$i18n.locale = this.languages[ key ];
      // this.$q.cookies.set( 'episentry_lang', key, {
      //  secure: true,
      // } );
    },

    /**
     * Gets maximum height among list of CSS class elements, and sets it across the whole list
     *
     * @param elementClass
     * @returns {number}
     */
    setMaxHeight ( elementClass ) {
      return this.setMaxParam( elementClass, 'height' );
    },

    /**
     * Gets maximum width among list of CSS class elements, and sets it across the whole list
     *
     * @param elementClass
     * @returns {number}
     */
    setMaxWidth ( elementClass ) {
      return this.setMaxParam( elementClass, 'width' );
    },

    /**
     * Gets maximum parameter among list of CSS class elements, and sets it across the whole list
     *
     * @param elementClass
     * @param param
     * @returns {number}
     */
    setMaxParam ( elementClass, param ) {
      const elements = document.getElementsByClassName( elementClass );

      const domParamMapping = {
        height: 'offsetHeight',
        width: 'offsetWidth',
      };

      let maxParam = 0;
      let domParam = domParamMapping[ param ] ? domParamMapping[ param ] : param;

      elements.forEach( ( element ) => {
        element.style[ param ] = 'auto';
        if ( element[ domParam ] > maxParam ) {
          maxParam = element [ domParam ];
        }
      } );

      elements.forEach( ( element ) => {
        element.style[ param ] = `${ maxParam }px`;
      } );

      return maxParam;
    },

    /**
     * Gets the DOM height of an element
     *
     * @param elementId
     * @returns {number}
     */
    getElementHeight ( elementId ) {
      const elementContent = document.getElementById( elementId );
      const elementContentHeight = elementContent && height( elementContent ) > 0 ? height( elementContent ) : 0;
      return elementContentHeight;
    },

    /**
     * Computes the ideal hero height based on content height inside the hero element
     *
     * @param heroContentHeight
     * @param halfHeight
     * @returns {number}
     */
    getHeroHeight ( heroContentHeight, halfHeight = true ) {
      // Default height = content height
      let height = heroContentHeight;

      // If the content fits, use half screen height
      if ( halfHeight === true && heroContentHeight <= this.$q.screen.height / 2 ) {
        height = this.$q.screen.height / 2;
      } else if ( halfHeight === false && heroContentHeight <= this.$q.screen.height ) {
        height = this.$q.screen.height;
      }

      // If the the screen is small, use full screen height
      // if ( this.$q.screen.xs && heroContentHeight <= this.$q.screen.height ) {
      //  height = this.$q.screen.height;
      // }

      return height;
    },

    /**
     * Scrolls to targetId after timeout milliseconds
     *
     * @param targetId
     * @param timeout
     */
    scrollToTimeout ( targetId, timeout ) {
      setTimeout( this.scrollTo, Number( timeout ), targetId );
    },

    /**
     * Scrolls to targetId
     *
     * @param targetId
     */
    scrollTo ( targetId ) {

      if ( targetId && targetId[ 0 ] === '#' ) {
        targetId = targetId.substr( 1 );
      }

      const target = document.getElementById( targetId );
      if ( target ) {
        const source = scroll.getScrollTarget( target );
        const offset = target.offsetTop;
        const duration = 500;
        scroll.setScrollPosition( source, offset + 50, duration );
      } else {
        console.log( `Application::scrollTo() - Unable to find scroll target ${ targetId }...` );
      }
    },

    /**
     * Formats and humanizes a Date timestamp
     * @param timestamp
     * @returns {string|*}
     */
    formatTimestamp( timestamp ) {
      const nowDate = Date.now();
      const thenDate = Number(timestamp);

      if(nowDate - thenDate > 1000 * 60 * 60 * 12) {
        return date.formatDate(thenDate, this.timestampFormat);
      }

      return this.$moment.duration(thenDate - nowDate, 'milliseconds').humanize(true);
    },

    // Importing methods from external libraries
    truncateMiddle,
  },
};
