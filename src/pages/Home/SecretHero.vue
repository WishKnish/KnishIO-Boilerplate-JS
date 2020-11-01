<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      3. The Secret
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Your `secret` is used to build wallets, sign transactions, and figure out your user ID. It can be derived through any cryptographic methods, so long as you end up with 2048 hexadecimal symbols."
        />
      </div>
      <q-item>
        <q-item-section>
          <wk-input
            v-model="password"
            :disable="secretIsSet"
            label="Enter a Password:"
            class="fit"
            type="password"
          />
        </q-item-section>
        <q-item-section
          side
        >
          <wk-button
            v-if="!secretIsSet"
            :disable="!password"
            :outline="false"
            label="Hash Password"
            @click="setSecret"
          />
          <wk-button
            v-else
            :outline="false"
            label="Reset"
            color="negative"
            @click="resetSecret"
          />
        </q-item-section>
      </q-item>
      <sequential-entrance>
        <WkCodeExample
          :example="example"
        />
        <q-item
          v-if="demoSecret"
        >
          <q-item-section>
            <q-item-label
              caption
            >
              <wk-input
                label="Your secret is:"
                :value="demoSecret"
                type="textarea"
                readonly
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error creating your secret:"
        />
      </sequential-entrance>
    </div>
  </wk-hero-card>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';
import WkCodeExample from 'components/WkCodeExample';
import vuex from 'src/mixins/vuex';
import WkBanner from 'components/WkBanner';

export default {
  components: {
    WkBanner,
    WkCodeExample,
    WkButton,
    WkInput,
    WkHeroCard,
  },
  mixins: [
    vuex,
  ],
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      password: null,
      demoSecret: null,
      secretIsSet: false,
      error: null,
    };
  },
  computed: {
    example () {
      return `import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
const secret = generateSecret( \`${ this.password ? this.password : '>>YOUR PASSWORD<<' }:${ KNISHIO_SETTINGS.salt }\` );`;
    },
  },
  methods: {
    async setSecret () {
      try {
        this.error = null;
        this.demoSecret = generateSecret( `${ this.password }:${ KNISHIO_SETTINGS.salt }` );
        this.secretIsSet = true;
        this.$emit( 'input', this.demoSecret );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetSecret () {
      this.demoSecret = null;
      this.error = null;
      this.secretIsSet = false;
      this.$emit( 'input', null );
    },
  },
};
</script>
