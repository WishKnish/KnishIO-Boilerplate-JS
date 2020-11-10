<template>
  <wk-hero-card
    :disable="disable"
    :prefix="prefix"
    title="Client SDK Installation"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="The Knish.IO SDK provides the necessary libraries to easily integrate ledger functions into your dApp (decentralized application) via the `KnishIOCLient` class. This guide will walk you through installing and using the SDK."
      />
    </div>
    <q-item>
      <q-item-section>
        <div
          class="row q-col-gutter-md items-center"
        >
          <div>
            Which package manager do you use?
          </div>
          <q-radio
            v-model="packageManager"
            val="yarn"
            label="yarn"
          />
          <q-radio
            v-model="packageManager"
            val="npm"
            label="npm"
          />
        </div>
      </q-item-section>
    </q-item>
    <sequential-entrance>
      <wk-code-example
        :example="example"
      />
    </sequential-entrance>
  </wk-hero-card>
</template>

<script>
import WkHeroCard from 'components/layout/WkHeroCard';
import WkCodeExample from 'components/WkCodeExample';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkCodeExample,
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
      packageManager: 'yarn',
      error: null,
    };
  },
  computed: {
    example () {
      return this.packageManager === 'yarn' ? 'yarn add @wishknish/knishio-client-js' : 'npm install @wishknish/knishio-client-js --save';
    },
  },
  methods: {
  },
};
</script>
