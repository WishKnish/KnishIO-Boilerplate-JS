<template>
  <wk-hero-card
    :disable="disable"
    title="Hold your horses!"
  >
    <div
      :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
    >
      <VueShowdown
        markdown="Please instantiate a `KnishIOClient` instance using the card above to view more examples. This class instance will be used to communicate with the Knish.IO ledger on your behalf."
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
