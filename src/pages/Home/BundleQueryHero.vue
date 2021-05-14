<template>
  <wk-hero-card
    :disable="disable"
    :loading="loading"
    :prefix="prefix"
    title="Querying Bundle Data"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Your `bundleHash` is a pointer via which you can retrieve any metadata and wallets associated with a Wallet Bundle."
      />
    </div>
    <q-item>
      <q-item-section>
        <wk-input
          v-model="demoBundle"
          label="Enter a Bundle Hash (empty = query own bundle):"
          class="fit"
        />
      </q-item-section>
    </q-item>
    <q-item
      class="q-pb-lg"
    >
      <q-item-section>
        <q-checkbox
          v-model="demoRaw"
        >
          Raw results?
        </q-checkbox>
      </q-item-section>
      <q-item-section
        side
      >
        <wk-button
          :outline="false"
          label="Query Bundle"
          @click="query"
        />
      </q-item-section>
    </q-item>
    <sequential-entrance>
      <wk-code-example
        :example="example"
      />
      <wk-bundle-table
        v-if="!loading && bundleMeta"
        :bundle="bundleMeta"
        :show-search="false"
        :show-timestamp="demoRaw"
        class="q-mt-lg"
      />
      <wk-input
        v-if="!loading && bundleMeta"
        label="Raw Metadata:"
        :value="JSON.stringify( decycle( result ) )"
        type="textarea"
        class="q-mt-md"
        readonly
      />
      <wk-banner
        v-if="error"
        :caption="error"
        label="Error querying wallet bundle metadata:"
        class="q-mt-lg"
      />
    </sequential-entrance>
  </wk-hero-card>
</template>

<script>
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import WkCodeExample from 'components/WkCodeExample';
import vuex from 'src/mixins/vuex';
import WkBundleTable from 'components/tables/WkBundleTable';
import WkBanner from 'components/WkBanner';
import WkInput from 'components/forms/fields/WkInput';
import { decycle, } from 'src/libraries/strings';

export default {
  components: {
    WkInput,
    WkBanner,
    WkBundleTable,
    WkCodeExample,
    WkButton,
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
      loading: false,
      demoBundle: null,
      demoRaw: false,
      bundleMeta: null,
      result: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `const result = await client.queryBundle ( {
  bundleHash: '${ this.demoBundle ? this.demoBundle : '>>BUNDLE HASH (or null)<<' }'${ this.demoRaw ? `,
  raw: ${ this.demoRaw }` : '' }
} );

// Raw Metadata
console.log( result );`;
    },
  },
  mounted () {
    this.bundleHash = this.demoClient.getBundle();
  },
  methods: {
    decycle,
    async query () {
      this.loading = true;
      try {
        this.error = null;
        this.result = null;
        this.bundleMeta = null;
        const result = await this.demoClient.queryBundle( {
          bundleHash: this.demoBundle ? this.demoBundle : null,
          raw: this.demoRaw,
        } );
        if ( !result ) {
          this.error = `No bundles with hash "${ this.demoBundle }" were found!`;
        } else {
          this.result = result;
          this.bundleMeta = this.demoRaw ? result.data().pop() : Object.values( result ).pop();
          this.$emit( 'input', this.bundleMeta );
        }
        this.loading = false;
      } catch ( e ) {
        this.error = e;
        console.error( e );
        this.loading = false;
      }
    },
  },
};
</script>
