<template>
  <wk-hero-card
    :disable="disable"
    :loading="loading"
    :prefix="prefix"
    title="The Wallet(s)"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Your `bundleHash` may be associated with an arbitrary number of one-time-use Wallets. Think of them as disposable keys on an infinite keychain."
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
          v-model="demoUnspent"
        >
          Limit results to unspent wallets?
        </q-checkbox>
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
        class="q-mt-lg"
      />
      <wk-input
        v-if="!loading && result"
        label="Raw Response:"
        :value="JSON.stringify( decycle( result ) )"
        type="textarea"
        class="q-mt-lg"
        readonly
      />
      <wk-banner
        v-if="error"
        :caption="error"
        label="Error querying wallet data:"
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
import WkBanner from 'components/WkBanner';
import WkInput from 'components/forms/fields/WkInput';
import { decycle, } from 'src/libraries/strings';
import WkWalletsTable from 'components/tables/WkWalletsTable';

export default {
  components: {
    WkWalletsTable,
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
    prefix: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      demoBundle: null,
      demoUnspent: true,
      loading: false,
      result: null,
      error: null,
    };
  },
  computed: {
    example () {
      const bundle = this.demoBundle ? this.demoBundle : '>>BUNDLE HASH (or null)<<';
      return `const result = await client.queryWallets ( {
  bundle: '${ bundle }'${ this.demoUnspent ? `,
  unspent: ${ this.demoUnspent }` : '' }
} );

console.log( results ); // Raw response`;
    },
  },
  methods: {
    decycle,
    async query () {
      this.loading = true;
      try {
        this.error = null;
        this.result = null;
        const params = {
          bundle: this.demoBundle > '' ? this.demoBundle : null,
          unspent: this.demoUnspent,
        };
        const result = await this.demoClient.queryWallets( params );
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
