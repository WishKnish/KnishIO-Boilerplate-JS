<template>
  <wk-hero-card
    :disable="disable"
    :loading="loading"
    :prefix="prefix"
    title="Creating Wallets"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Wallets can be pre-defined for a particular `tokenSlug` on the ledger prior to receiving tokens. If tokens are transferred to a `bundleHash` that does not have an appropriate wallet available, a Shadow Wallet will be created as a placeholder to hold these tokens. A Shadow Wallet can then be claimed by simply creating a new Wallet for its `tokenSlug`."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-sm items-center"
        >
          <div
            class="col-grow"
          >
            <wk-input
              v-model="demoSlug"
              :maxlength="16"
              :value="demoSlug"
              type="text"
              label="Token Slug:"
              mask="X"
              class="fit"
              reverse-fill-mask
            />
          </div>
          <div
            class="col-shrink"
          >
            <wk-button
              :outline="false"
              :disable="!demoSlug"
              label="Create Wallet"
              @click="mutate"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
    <sequential-entrance>
      <wk-code-example
        :example="example"
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
        label="Error creating wallet:"
        class="q-mt-lg"
      />
      <wk-banner
        v-if="successMessage"
        :caption="successMessage"
        label="Wallet successfully created:"
        color="bg-positive"
        icon="fa fa-check"
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

export default {
  components: {
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
      demoSlug: null,
      loading: false,
      result: null,
      error: null,
      successMessage: null,
    };
  },
  computed: {
    example () {
      const slug = this.demoSlug ? this.demoSlug : '>>TOKEN SLUG<<';
      return `const result = await client.createWallet ( {
  token: '${ slug }'
} );

if( result.success() ) {
  // Do things!
}

console.log( result.data() ); // Raw response
`;
    },
  },
  methods: {
    decycle,
    async mutate () {
      this.loading = true;
      try {
        this.error = null;
        this.result = null;
        const result = await this.demoClient.createWallet( {
          token: this.demoSlug,
        } );
        if ( !result.success() ) {
          this.error = result.reason();
        } else {
          this.result = result.data();
          this.successMessage = `A new "${ this.demoSlug }" wallet was successfully created!`;
          this.$emit( 'input', this.result );
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
