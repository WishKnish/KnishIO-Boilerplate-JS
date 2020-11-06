<template>
  <wk-hero-card
    :disable="disable"
    title="Hold your horses!"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Please create a `secret` and authenticate yourself using the card above to view more examples. You'll need this to sign transactions and otherwise communicate with the ledger."
      />
    </div>
  </wk-hero-card>
</template>

<script>
import WkHeroCard from 'components/layout/WkHeroCard';
import vuex from 'src/mixins/vuex';

export default {
  components: {
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
    return {};
  },
};
</script>
