<template>
  <section
    class="column q-col-gutter-xl q-pt-xl q-pb-xl"
  >
    <sequential-entrance
      from-bottom
      :tag="false"
    >
      <home-hero />
      <installation-hero />
      <client-hero
        id="clientHero"
        @input="setClient"
      />
      <secret-hero
        v-if="hasClient"
        id="secretHero"
        @input="setAuth"
      />
      <no-client-hero
        v-else
        disable
      />
      <bundle-hero
        v-if="hasAuth"
        id="bundleHero"
      />
      <no-secret-hero
        v-else-if="hasClient"
        disable
      />
      <bundle-query-hero
        v-if="hasAuth"
      />
      <meta-type-hero
        v-if="hasAuth"
      />
      <meta-mutation-hero
        v-if="hasAuth"
      />
      <wallet-query-hero
        v-if="hasAuth"
      />
      <token-hero
        v-if="hasAuth"
      />
      <transfer-hero
        v-if="hasAuth"
      />
    </sequential-entrance>
  </section>
</template>

<script>
import HomeHero from 'pages/Home/HomeHero';
import ClientHero from 'pages/Home/ClientHero';
import SecretHero from 'pages/Home/SecretHero';
import BundleHero from 'pages/Home/BundleHero';
import vuex from 'src/mixins/vuex';
import BundleQueryHero from 'pages/Home/BundleQueryHero';
import MetaTypeHero from 'pages/Home/MetaTypeHero';
import application from 'src/mixins/application';
import MetaMutationHero from 'pages/Home/MetaMutationHero';
import WalletQueryHero from 'pages/Home/WalletQueryHero';
import TokenHero from 'pages/Home/TokenHero';
import InstallationHero from 'pages/Home/InstallationHero';
import NoClientHero from 'pages/Home/NoClientHero';
import NoSecretHero from 'pages/Home/NoSecretHero';
import TransferHero from 'pages/Home/TransferHero';

export default {
  components: {
    TransferHero,
    NoSecretHero,
    NoClientHero,
    InstallationHero,
    TokenHero,
    WalletQueryHero,
    MetaMutationHero,
    MetaTypeHero,
    BundleQueryHero,
    BundleHero,
    SecretHero,
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
      demoAuth: null,
    };
  },
  computed: {
    hasClient () {
      return !!this.demoClient;
    },
    hasAuth () {
      return this.hasClient && this.demoAuth;
    },
  },
  mounted () {
  },
  methods: {
    setClient () {
      this.scrollToTimeout( 'secretHero' );
    },
    setAuth ( auth ) {
      this.demoAuth = auth;
      console.log( this.demoClient.getAuthToken() );
      if ( auth ) {
        this.scrollToTimeout( 'bundleHero' );
      }
    },
  },
};
</script>
