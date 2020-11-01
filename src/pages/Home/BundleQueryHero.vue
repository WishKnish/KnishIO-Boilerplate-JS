<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      6. Querying Wallet Bundle Metadata
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
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
            label="Enter a Bundle Hash:"
            class="fit"
          />
        </q-item-section>
        <q-item-section
          side
        >
          <wk-button
            :outline="false"
            label="Query Bundle Metadata"
            @click="queryBundle"
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
        />
        <wk-input
          v-if="!loading && bundleMeta"
          label="Raw Metadata:"
          :value="JSON.stringify( bundleMeta )"
          type="textarea"
          class="q-mt-md"
          readonly
        />
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error querying wallet bundle metadata:"
        />
      </sequential-entrance>
    </div>
    <wk-inner-loading
      :loading="loading"
    />
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
import WkInnerLoading from 'components/layout/WkInnerLoading';

export default {
  components: {
    WkInnerLoading,
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
  },
  data () {
    return {
      loading: false,
      demoBundle: null,
      bundleMeta: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `client.queryBundle ( '${ this.demoBundle ? this.demoBundle : '>>BUNDLE HASH (or null)<<' }' );`;
    },
  },
  mounted () {
    this.bundleHash = this.demoClient.bundle();
  },
  methods: {
    async queryBundle () {
      this.loading = true;
      try {
        this.error = null;
        const result = await this.demoClient.queryBundle( this.demoBundle > '' ? this.demoBundle : null );
        if ( !result ) {
          this.error = `No bundles with hash "${ this.demoBundle }" were found!`;
        }
        else {
          this.bundleMeta = Object.values( result ).pop();
          this.$emit( 'input', this.bundleMeta );
        }
        this.loading = false;
      } catch ( e ) {
        this.error = e;
        console.error( e );
        this.loading = false;
      }
    },
    resetQuery () {
      this.bundleMeta = null;
      this.error = null;
      this.$emit( 'input', null );
    },
  },
};
</script>
