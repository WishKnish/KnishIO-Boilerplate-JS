<template>
  <wk-hero-card
    :disable="disable"
    :prefix="prefix"
    title="The Secret and Authorization"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Your `secret` is used to request authorization tokens from the node, build wallets, sign transactions, and figure out your user ID. It can be derived through any cryptographic methods, so long as you end up with 2048 hexadecimal symbols."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-md items-center"
        >
          <div>
            Auth method:
          </div>
          <q-radio
            v-model="method"
            val="password"
            label="Password + Salt"
          />
          <q-radio
            v-model="method"
            val="secret"
            label="User Secret"
          />
        </div>
      </q-item-section>
    </q-item>
    <q-item
      v-if="method === 'password'"
    >
      <q-item-section>
        <wk-input
          v-model="password"
          :readonly="!!authToken"
          label="Enter a Password:"
          class="fit"
          type="password"
        />
      </q-item-section>
      <q-item-section>
        <wk-input
          v-model="salt"
          :readonly="!!authToken"
          label="Enter a Salt:"
          class="fit"
          type="text"
        />
      </q-item-section>
      <q-item-section
        side
      >
        <wk-button
          v-if="!authToken"
          :disable="!password"
          :outline="false"
          label="Request Authorization Token"
          @click="requestAuth"
        />
        <wk-button
          v-else
          :outline="false"
          label="Reset"
          color="negative"
          @click="resetAuth"
        />
      </q-item-section>
    </q-item>
    <q-item
      v-else
    >
      <q-item-section>
        <wk-input
          v-model="demoSecret"
          :readonly="!!authToken"
          :maxlength="2048"
          label="Enter a 2048-character user secret:"
          class="fit"
          type="textarea"
        />
      </q-item-section>
      <q-item-section
        side
      >
        <wk-button
          v-if="!authToken"
          :disable="!demoSecret"
          :outline="false"
          label="Request Authorization Token"
          @click="requestAuth"
        />
        <wk-button
          v-else
          :outline="false"
          label="Reset"
          color="negative"
          @click="resetAuth"
        />
      </q-item-section>
    </q-item>
    <sequential-entrance>
      <wk-code-example
        :example="example"
      />
      <q-list
        v-if="authToken"
        class="q-mt-lg"
      >
        <q-item>
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
              <wk-input
                label="Your authorization token is:"
                :value="authToken"
                type="textarea"
                readonly
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <wk-banner
        v-if="error"
        :caption="error"
        label="Error requesting an authorization token:"
        class="q-mt-lg"
      />
    </sequential-entrance>
  </wk-hero-card>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import WkCodeExample from 'components/WkCodeExample';
import WkBanner from 'components/WkBanner';
import vuex from 'src/mixins/vuex';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

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
    prefix: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      method: 'password',
      password: '12345',
      salt: KNISHIO_SETTINGS.salt,
      demoSecret: null,
      authToken: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `
// Using our secret to get an authorization token from the node
const result = await client.requestAuthToken ( {
  ${ this.method === 'password' ? `seed: '${ this.password ? this.password : '>>YOUR PASSWORD<<' }:${ this.salt }` : `secret: '${ this.demoSecret ? this.demoSecret : '>>YOUR SECRET<<' }` }'
} );

// Raw result payload
console.log( result.payload() );

// What's our auth token?
console.log( client.getAuthToken() );

// What's our secret?
console.log( client.getSecret() );`;
    },
  },
  methods: {
    async requestAuth () {
      try {
        this.error = null;

        // Using our secret to get an authorization token from the node
        const result = await this.demoClient.requestAuthToken( {
          seed: this.method === 'password' ? `${ this.password }:${ this.salt }` : null,
          secret: this.method !== 'password' ? this.demoSecret : null,
        } );

        if ( this.demoClient.getServerSdkVersion() > 2 ) {

          // Raw result payload
          console.log( result.payload() );

          // What's our auth token?
          this.authToken = JSON.stringify( this.demoClient.getAuthToken() );

          // What's our secret?
          this.demoSecret = this.demoClient.getSecret();

        } else {

          this.authToken = 'No auth token needed for legacy API!';

        }
        this.$emit( 'input', this.authToken );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetAuth () {
      this.demoSecret = null;
      this.authToken = null;
      this.error = null;
      this.$emit( 'input', null );
    },
  },
};
</script>
