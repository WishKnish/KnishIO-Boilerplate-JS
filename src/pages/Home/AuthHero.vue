<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      4. The Auth Token
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Authorization tokens are temporarily given by Knish.IO nodes and are provided in the `X-Auth-Token` HTTP header. The Knish.IO client will manage these for you automatically."
        />
      </div>
      <div
        class="text-center"
      >
        <wk-button
          v-if="!authToken"
          :outline="false"
          label="Request Authorization Token"
          @click="requestAuth"
        />
        <wk-button
          v-else
          :disable="!demoClient || !demoSecret"
          :outline="false"
          label="Reset"
          color="negative"
          @click="resetAuth"
        />
      </div>
      <sequential-entrance>
        <wk-code-example
          :example="example"
        />
        <q-item
          v-if="authToken"
        >
          <q-item-section>
            <q-item-label
              caption
            >
              <wk-input
                label="Your authorization token is:"
                :value="authToken"
                readonly
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error requesting an authorization token:"
        />
      </sequential-entrance>
    </div>
  </wk-hero-card>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
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
    demoSecret: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      authToken: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `client.requestAuthToken ( '${ this.demoSecret ? `${ this.demoSecret.substr( 0, 16 ) }...` : '>>YOUR SECRET<<'}' );`;
    },
  },
  methods: {
    async requestAuth () {
      try {
        this.error = null;
        await this.demoClient.requestAuthToken( this.demoSecret );
        this.authToken = this.demoClient.getAuthToken();
        this.$emit( 'input', this.authToken );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetAuth () {
      this.authToken = null;
      this.error = null;
      this.$emit( 'input', null );
    },
  },
};
</script>
