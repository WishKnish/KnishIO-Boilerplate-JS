<template>
  <wk-hero-card
    :disable="disable"
    :prefix="prefix"
  >
    <q-img
      id="bodyLogo"
      :title="$t( 'ux.appTitle' )"
      src="statics/branding/logo-knishio-blurb.png"
      class="hover-zoom full-width"
      ratio="3"
      style="max-width: 800px;"
    />
    <div
      class="row justify-center"
    >
      <div
        :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
      >
        <div
          :class="`${ $q.screen.gt.xs ? 'text-h4' : 'text-h5' } q-mb-md text-uppercase text-center`"
          v-html="$t( 'pages.home.homeHero.slogan' )"
        />

        <div
          :class="$q.screen.gt.xs ? 'text-h6' : 'text-h7'"
          v-html="$t( 'pages.home.homeHero.description' )"
        />
      </div>
    </div>
  </wk-hero-card>
</template>

<script>
import WkHeroCard from 'components/layout/WkHeroCard.vue';
export default {
  components: {
    WkHeroCard,
  },
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
    };
  },
  computed: {},
  methods: {},
};
</script>
