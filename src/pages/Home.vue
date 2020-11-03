<template>
  <section
    class="column q-col-gutter-xl q-pt-xl q-pb-xl"
  >
    <sequential-entrance
      from-bottom
      :tag="false"
    >
      <home-hero />
      <client-hero
        id="clientHero"
        @input="setClient"
      />
      <cell-hero
        v-if="demoClient"
        id="cellHero"
        @input="setCell"
      />
      <secret-hero
        v-if="demoClient && demoCell"
        id="secretHero"
        @input="setSecret"
      />
      <auth-hero
        v-if="demoClient && demoCell && demoSecret"
        id="authHero"
        :demo-secret="demoSecret"
        @input="setAuth"
      />
      <bundle-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
      <bundle-query-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
      <meta-type-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
      <meta-mutation-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
      <wallet-query-hero
        v-if="demoClient && demoCell && demoSecret && demoAuth"
      />
      <token-hero
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
import BundleQueryHero from 'pages/Home/BundleQueryHero';
import MetaTypeHero from 'pages/Home/MetaTypeHero';
import application from 'src/mixins/application';
import MetaMutationHero from 'pages/Home/MetaMutationHero';
import WalletQueryHero from 'pages/Home/WalletQueryHero';
import TokenHero from 'pages/Home/TokenHero';

export default {
  components: {
    TokenHero,
    WalletQueryHero,
    MetaMutationHero,
    MetaTypeHero,
    BundleQueryHero,
    BundleHero,
    AuthHero,
    SecretHero,
    CellHero,
    ClientHero,
    HomeHero,
  },
  mixins: [
    application,
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
    setClient ( client ) {
      this.scrollToTimeout('cellHero');
    },
    setCell ( cell ) {
      this.demoCell = cell;
      console.log( this.demoClient.cellSlug() );
      if(cell) {
        this.scrollToTimeout( 'secretHero' );
      }
    },
    setSecret ( secret ) {
      this.demoSecret = secret;
      if( secret ) {
        this.scrollToTimeout( 'authHero' );
      }
    },
    setAuth ( auth ) {
      this.demoAuth = auth;
      console.log( this.demoClient.getAuthToken() );
      if( auth ) {
        this.scrollToTimeout( 'bundleHero' );
      }
    },
  },
};
</script>
