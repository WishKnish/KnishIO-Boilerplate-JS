<template>
  <wk-hero-card
    :disable="disable"
    :loading="loading"
    :prefix="prefix"
    title="The Token"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Tokens can be easily issued by any user and may represent all types of transferable value. The `KnishIOClient` class provides helpful methods to issue new tokens at any time."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-sm"
        >
          <div
            class="col-6"
          >
            <wk-input
              v-model="demoSlug"
              :maxlength="16"
              :value="demoSlug"
              type="text"
              label="Token Slug (ticker symbol):"
              mask="X"
              class="fit"
              reverse-fill-mask
            />
          </div>
          <div
            class="col-6"
          >
            <wk-input
              v-model="demoToken"
              :maxlength="64"
              type="text"
              label="Token Name:"
              class="fit"
            />
          </div>
          <div
            class="col-6"
          >
            <wk-input
              v-model="demoDecimals"
              :maximum="16"
              :maxlength="2"
              type="number"
              label="Decimal Places:"
              class="fit"
            />
          </div>
          <div
            class="col-6"
          >
            <wk-input
              v-model="demoAmount"
              :maxlength="46"
              type="number"
              label="Initial Amount:"
              mask="###############################################"
              class="fit"
            />
          </div>
          <div
            class="col-6"
          >
            <wk-multi-select
              :options="Object.values(fungibilityOptions)"
              :multiple="false"
              label="Fungibility Method"
              @input="demoFungibility = $event.value"
            />
          </div>
          <div
            class="col-6"
          >
            <wk-multi-select
              :options="Object.values(supplyOptions)"
              :multiple="false"
              label="Supply Style"
              @input="demoSupply = $event.value"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
    <div
      class="text-center q-mb-lg"
    >
      <wk-button
        :outline="false"
        :disable="!demoSlug || !demoToken || !demoDecimals || !demoAmount || !demoSupply || !demoFungibility"
        label="Issue Tokens"
        @click="mutate"
      />
    </div>
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
import WkMultiSelect from 'components/forms/fields/WkMultiSelect';

export default {
  components: {
    WkMultiSelect,
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
      demoToken: null,
      demoDecimals: null,
      demoAmount: null,
      demoSupply: null,
      demoFungibility: null,
      fungibilityOptions: [
        {
          label: 'Fungible',
          value: 'fungible',
          description: 'Can be split into pieces',
          icon: 'fa fa-coins',
        },
        {
          label: 'Stackable',
          value: 'stackable',
          description: 'Units are grouped by unique batches',
          icon: 'fa fa-inventory',
        },
      ],
      supplyOptions: [
        {
          label: 'Replenishable',
          value: 'replenishable',
          description: 'You can mint more tokens at any time.',
          icon: 'fa fa-infinity',
        },
        {
          label: 'Limited',
          value: 'limited',
          description: 'The supply you start with can never be replenished.',
          icon: 'fa fa-parachute-box',
        },
      ],
      loading: false,
      result: null,
      error: null,
      successMessage: null,
    };
  },
  computed: {
    example () {
      const tokenName = this.demoToken > '' ? this.demoToken : '>>TOKEN NAME<<';
      const tokenFungibility = this.demoFungibility ? this.demoFungibility : '>>FUNGIBILITY<<';
      const tokenSupply = this.demoSupply ? this.demoSupply : '>>SUPPLY STYLE<<';
      const tokenDecimals = this.demoDecimals ? this.demoDecimals : '>>DECIMAL PLACES<<';
      const tokenSlug = this.demoSlug ? this.demoSlug : '>>TOKEN SLUG<<';
      const tokenAmount = this.demoAmount ? this.demoAmount : '>>INITIAL AMOUNT<<';
      return `const tokenMeta = {
  name: '${ tokenName }', // Public name for the token
  fungibility: '${ tokenFungibility }', // Fungibility style
  supply: '${ tokenSupply }', // Supply style
  decimals: '${ tokenDecimals }', // Decimal places
};

const result = await client.createToken (
  '${ tokenSlug }',
  '${ tokenAmount }',
  tokenMeta // Metadata JSON
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
        const tokenMeta = {
          name: this.demoToken, // Public name for the token
          fungibility: this.demoFungibility, // Fungibility style
          supply: this.demoSupply, // Supply style
          decimals: this.demoDecimals, // Decimal places
        };
        const result = await this.demoClient.createToken( this.demoSlug, this.demoAmount, tokenMeta );
        if ( !result.success() ) {
          this.error = result.reason();
        } else {
          this.result = result.data();
          this.successMessage = `The "${ this.demoSlug }" token was successfully issued!`;
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
