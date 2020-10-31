<template>
  <wk-hero-card>
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
        <VueShowdown
          v-if="password"
          :markdown="example"
        />
        <q-item
          v-if="secret"
        >
          <q-item-section>
            <q-item-label
              caption
            >
              <wk-input
                label="Your secret is:"
                :value="secret"
                type="textarea"
                readonly
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-banner
          v-if="error"
          class="bg-negative"
        >
          <q-item
            dark
          >
            <q-item-section
              avatar
            >
              <q-avatar>
                <q-icon
                  name="fa fa-exclamation"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Error creating your secret:
              </q-item-label>
              <q-item-label
                caption
              >
                {{ error }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-banner>
      </sequential-entrance>
    </div>
  </wk-hero-card>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import { KnishIOClient, } from '@wishknish/knishio-client-js';
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

export default {
  components: {
    WkButton,
    WkInput,
    WkHeroCard,
  },
  props: {
    value: {
      type: KnishIOClient,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      password: null,
      secret: null,
      secretIsSet: false,
      error: null,
    };
  },
  computed: {
    example () {
      return `\`\`\`javascript
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
const secret = generateSecret( \`${ this.password }:${ KNISHIO_SETTINGS.salt }\` );
\`\`\``;
    },
  },
  methods: {
    async setSecret () {
      try {
        this.error = null;
        this.secret = generateSecret( `${ this.password }:${ KNISHIO_SETTINGS.salt }` );
        this.secretIsSet = true;
        this.$emit( 'secret', this.secret );
      } catch ( e ) {
        this.error = e;
        console.log( this.value );
        console.error( e );
      }
    },
    resetSecret () {
      this.secret = null;
      this.error = null;
      this.secretIsSet = false;
      this.$emit( 'secret', null );
    },
  },
};
</script>
