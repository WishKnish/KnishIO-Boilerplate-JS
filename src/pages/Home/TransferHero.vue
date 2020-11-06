<template>
  <wk-hero-card
    :disable="disable"
    :loading="loading"
    title="10. Transferring Tokens"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Moving Tokens between Wallets is as simple as finding out your recipient's `bundleHash` and issuing a single command."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-sm items-center"
        >
          <div
            class="col-6"
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
            class="col-6"
          >
            <wk-input
              v-model="demoAmount"
              :maxlength="46"
              type="number"
              label="Amount to Move:"
              mask="###############################################"
              class="fit"
            />
          </div>
          <div
            class="col-grow"
          >
            <wk-input
              v-model="demoBundle"
              :maxlength="64"
              label="Recipient Bundle Hash:"
              class="fit"
              type="text"
            />
          </div>
          <div
            class="col-shrink"
          >
            <wk-button
              :outline="false"
              :disable="!demoBundle || !demoSlug || !demoAmount"
              label="Transfer Tokens"
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
        label="Error issuing tokens:"
        class="q-mt-lg"
      />
      <wk-banner
        v-if="successMessage"
        :caption="successMessage"
        label="Token successfully created:"
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
  },
  data () {
    return {
      demoSlug: null,
      demoAmount: null,
      demoBundle: null,
      loading: false,
      result: null,
      error: null,
      successMessage: null,
    };
  },
  computed: {
    example () {
      const transferBundle = this.demoBundle ? this.demoBundle : '>>BUNDLE HASH<<';
      const transferSlug = this.demoSlug ? this.demoSlug : '>>TOKEN SLUG<<';
      const transferAmount = this.demoAmount ? this.demoAmount : '>>INITIAL AMOUNT<<';
      return `const result = await client.transferToken (
  '${ transferBundle }',
  '${ transferSlug }',
  '${ transferAmount }'
);

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
        const result = await this.demoClient.transferToken( this.demoBundle, this.demoSlug, this.demoAmount );
        if ( !result.success() ) {
          this.error = result.reason();
        } else {
          this.result = result.data();
          this.successMessage = `The ${ this.demoAmount } "${ this.demoSlug }" tokens were successfully transferred!`;
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
