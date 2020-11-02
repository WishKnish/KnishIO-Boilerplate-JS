<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      9. The Wallet(s)
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Your `bundleHash` may be associated with an arbitrary number of one-time-use Wallets, only one of which may be active for each Token, with others permanently disabled."
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
        <q-item-section
          side
        >
          <wk-button
            :outline="false"
            label="Query Wallets"
            @click="query"
          />
        </q-item-section>
      </q-item>
      <sequential-entrance>
        <wk-code-example
          :example="example"
        />
        <wk-wallets-table
          v-if="!loading && result"
          :wallets="result"
          :show-search="false"
        />
        <wk-input
          v-if="!loading && result"
          label="Raw Response:"
          :value="JSON.stringify( decycle( result ) )"
          type="textarea"
          class="q-mt-md"
          readonly
        />
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error querying wallet data:"
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
import WkBanner from 'components/WkBanner';
import WkInput from 'components/forms/fields/WkInput';
import WkInnerLoading from 'components/layout/WkInnerLoading';
import { decycle, } from 'src/libraries/strings';
import WkWalletsTable from 'components/tables/WkWalletsTable';

export default {
  components: {
    WkWalletsTable,
    WkInnerLoading,
    WkInput,
    WkBanner,
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
      demoBundle: null,
      loading: false,
      result: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `const result = await client.queryWallets ( '${ this.demoBundle ? this.demoBundle : '>>BUNDLE HASH (or null)<<' }' );`;
    },
  },
  mounted () {
    this.demoBundle = this.demoClient.bundle();
  },
  methods: {
    decycle,
    async query () {
      this.loading = true;
      try {
        this.error = null;
        this.result = null;
        const result = await this.demoClient.queryWallets( this.demoBundle > '' ? this.demoBundle : null );
        if ( !result ) {
          this.error = `No wallets for Bundle Hash hash "${ this.demoBundle }" were found!`;
        } else {
          this.result = result;
          this.$emit( 'input', result );
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
