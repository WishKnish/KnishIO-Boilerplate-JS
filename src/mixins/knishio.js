import {
  KNISHIO_SETTINGS,
} from 'src/constants/knishio';
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';

export default {
  data () {
    return {};
  },
  computed: {
    wallets: {
      cache: false,
      get () {
        console.log( 'KnishIO::wallets() - Accessing computed wallets list...' );
        return this.$store.getters[ 'wallet/GET_WALLETS' ]();
      },
    },
    walletsMinusUser: {
      cache: false,
      get() {
        const wallets = {};
        Object.keys( this.wallets ).forEach( walletKey => {
          if ( walletKey !== 'USER' ) {
            wallets[ walletKey ] = this.wallets[ walletKey ];
          }
        } );
        return wallets;
      },
    },
  },
  methods: {
    /**
     * Hashes a string with a salt
     *
     * @param {string} username
     * @param {number} length
     * @returns {string|*}
     */
    hashUsername ( username, length = 64 ) {
      return generateSecret( `${ username }:${ KNISHIO_SETTINGS.salt }`, length );
    },

    /**
     * Checks the ledger for presence of a given hashed username
     *
     * @param {string} username
     * @returns {Promise<boolean>}
     */
    async isUsernameUnique ( username ) {
      const usernameHash = this.hashUsername( username );
      const result = await this.$knishio.queryBundle( false, 'usernameHash', usernameHash, false, { bundleHash: null, } );
      if( result ) {
        console.log( `KnishIO::isUsernameUnqiue() - Found a match for ${ usernameHash }...` );
        return false;
      }
      else {
        console.log( `KnishIO::isUsernameUnqiue() - No matches found for ${ usernameHash }...` );
        return true;
      }
    },

    /**
     * Reinitializes the user session
     *
     * @returns {Promise<void>}
     */
    async initUser () {
      await this.$store.dispatch( 'user/INIT', { vm: this, } );
    },
  },
};
