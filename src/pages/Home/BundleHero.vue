<template>
  <wk-hero-card
    :disable="disable"
    title="4. The Wallet Bundle"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Wallet Bundles (literally, bundles of wallets and other metadata) represent a single, specific party that signs transactions - in other words, a user. They are represented by a 64-character hexadecimal `bundleHash`."
      />
    </div>
    <div
      class="text-center q-pb-lg"
    >
      <wk-button
        v-if="!bundleHash"
        :outline="false"
        label="Get Bundle Hash"
        @click="getBundle"
      />
      <wk-button
        v-else
        :outline="false"
        label="Reset"
        color="negative"
        @click="resetBundle"
      />
    </div>
    <sequential-entrance>
      <wk-code-example
        :example="example"
      />
      <q-item
        v-if="bundleHash"
        class="q-mt-lg"
      >
        <q-item-section>
          <q-item-label
            caption
          >
            <wk-input
              label="Your bundle hash is:"
              :value="bundleHash"
              readonly
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <wk-banner
        v-if="error"
        :caption="error"
        label="Error getting bundle hash:"
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
  },
  data () {
    return {
      bundleHash: null,
      error: null,
    };
  },
  computed: {
    example () {
      return 'const bundleHash = client.bundle();';
    },
  },
  methods: {
    getBundle () {
      this.error = null;
      try {
        this.bundleHash = this.demoClient.bundle();
        this.$emit( 'input', this.bundleHash );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetBundle () {
      this.error = null;
      this.$emit( 'input', null );
    },
  },
};
</script>
