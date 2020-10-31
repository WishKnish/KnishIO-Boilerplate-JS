<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      5. The Wallet Bundle
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Wallet Bundles (literally, bundles of wallets and other metadata) represent a single, specific party that signs transactions - in other words, a user. They are represented by a 64-character hexadecimal `bundleHash`."
        />
      </div>
      <div
        class="text-center"
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
        <WkCodeExample
          :example="example"
        />
        <q-item
          v-if="bundleHash"
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
        <q-banner
          v-if="error"
          class="bg-negative"
        >
          <q-item
            dark
          >
            <q-item-section
              avatar
            >
              <q-avatar>
                <q-icon
                  name="fa fa-exclamation"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Error getting bundle hash:
              </q-item-label>
              <q-item-label
                caption
              >
                {{ error }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-banner>
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

export default {
  components: {
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
    getBundle() {
      this.error = null;
      try {
        this.bundleHash = this.demoClient.bundle();
      }
      catch (e) {
        this.error = e;
        console.error(e);
      }
    },
    resetBundle() {
      this.error = null;
      this.bundleHash = null;
    },
  },
};
</script>
