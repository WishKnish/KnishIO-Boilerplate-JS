<template>
  <wk-hero-card
    :disable="disable"
    :prefix="prefix"
    title="The Knish.IO Client"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="The first step is to instantiate a `KnishIOClient` instance and assign a Cell. Your Cell represents your specific Knish.IO dApp. You should have received a `cellSlug` for production use."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-sm"
        >
          <div
            class="col-xs-12 col-sm-6"
          >
            <wk-input
              v-model="nodeUri"
              :readonly="!!demoClient"
              prefix="https://"
              suffix="/graphql"
              label="Knish.IO Node URI:"
              class="fit"
            />
          </div>
          <div
            class="col-xs-12 col-sm-6"
          >
            <wk-input
              v-model="cellSlug"
              :readonly="!!demoClient"
              type="text"
              label="Cell Slug:"
              mask="X"
              class="fit"
              reverse-fill-mask
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-item
      class="q-pb-lg"
    >
      <q-item-section>
        <q-checkbox
          v-model="legacy"
          :disable="!nodeUri || !cellSlug"
        >
          Use the legacy (V2) API?
        </q-checkbox>
      </q-item-section>
      <q-item-section
        side
      >
        <wk-button
          v-if="!demoClient"
          :disable="!nodeUri || !cellSlug"
          :outline="false"
          label="Start Client"
          @click="createClient"
        />
        <wk-button
          v-else
          :outline="false"
          label="Reset"
          color="negative"
          @click="resetClient"
        />
      </q-item-section>
    </q-item>
    <sequential-entrance>
      <wk-code-example
        :example="example"
      />
      <wk-banner
        v-if="error"
        :caption="error"
        label="Error creating KnishIOClient instance:"
        class="q-mt-lg"
      />
    </sequential-entrance>
  </wk-hero-card>
</template>

<script>
import { KnishIOClient, } from '@wishknish/knishio-client-js/src/index';
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import WkCodeExample from 'components/WkCodeExample';
import application from 'src/mixins/application';
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
    application,
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
      nodeUri: 'testnet.knish.io',
      cellSlug: 'TESTCELL',
      error: null,
      legacy: false,
    };
  },
  computed: {
    example () {
      return `import { KnishIOClient } from '@wishknish/knishio-client-js'

// Instantiate a new Knish.IO client instance
const client = new KnishIOClient( {
 uri: '${ this.nodeUri ? this.fullNodeUri : '>>YOUR URI HERE<<' }'${ this.legacy ? `,
 serverSdkVersion: 2` : '' }
} );

// Assign a Cell slug
client.setCellSlug( '${ this.cellSlug ? this.cellSlug : '>>YOUR CELL SLUG<<' }' );`;
    },
    fullNodeUri () {
      return `https://${ this.nodeUri }/graphql`;
    },
  },
  methods: {
    createClient () {
      try {
        this.error = null;

        // Making sure URI is valid
        if ( !this.urlPattern.test( this.fullNodeUri ) ) {
          this.error = 'Node URI is not a valid URI path! Please check again.';
          return;
        }

        this.demoClient = new KnishIOClient( {
          uri: this.fullNodeUri,
          serverSdkVersion: this.legacy ? 2 : 3,
          logging: true,
        } );
        this.demoClient.setCellSlug( this.cellSlug );
        this.$emit( 'input', this.demoClient );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetClient () {
      this.demoClient = null;
      this.error = null;
    },
  },
};
</script>
