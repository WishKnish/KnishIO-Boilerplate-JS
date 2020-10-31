<template>
  <section
    class="column q-col-gutter-xl q-pt-xl q-pb-xl"
  >
    <sequential-entrance
      from-bottom
      :tag="false"
    >
      <home-hero />
      <client-hero />
      <cell-hero
        v-if="demoClient"
        @cell="setCell"
      />
      <secret-hero
        v-if="demoClient && demoCell"
        @secret="setSecret"
      />
      <auth-hero
        v-if="demoClient && demoCell && demoSecret"
        :demo-secret="demoSecret"
        @auth="setAuth"
      />
      <bundle-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
    </sequential-entrance>
  </section>
</template>

<script>
import HomeHero from 'pages/Home/HomeHero';
import ClientHero from 'pages/Home/ClientHero';
import CellHero from 'pages/Home/CellHero';
import SecretHero from 'pages/Home/SecretHero';
import AuthHero from 'pages/Home/AuthHero';
import BundleHero from 'pages/Home/BundleHero';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    BundleHero,
    AuthHero,
    SecretHero,
    CellHero,
    ClientHero,
    HomeHero,
  },
  mixins: [
    vuex,
  ],
  props: {},
  data () {
    return {
      demoCell: null,
      demoSecret: null,
      demoAuth: null,
    };
  },
  computed: {},
  mounted () {
  },
  methods: {
    setCell ( cell ) {
      this.demoCell = cell;
      console.log( this.demoClient.cellSlug() );
    },
    setSecret ( secret ) {
      this.demoSecret = secret;
    },
    setAuth ( auth ) {
      this.demoAuth = auth;
      console.log( this.demoClient.getAuthToken() );
    },
  },
};
</script>
