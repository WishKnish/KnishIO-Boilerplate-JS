<template>
  <section
    class="column q-col-gutter-xl q-pt-xl q-pb-xl"
  >
    <sequential-entrance
      from-bottom
      :tag="false"
    >
      <home-hero />
      <installation-hero
        prefix="1."
      />
      <client-hero
        id="clientHero"
        prefix="2."
        @input="setClient"
      />
      <secret-hero
        v-if="hasClient"
        id="secretHero"
        prefix="3."
        @input="setAuth"
      />
      <no-client-hero
        v-else
        disable
      />
      <bundle-hero
        v-if="hasAuth"
        id="bundleHero"
        prefix="4."
      />
      <no-secret-hero
        v-else-if="hasClient"
        disable
      />
      <bundle-query-hero
        v-if="hasAuth"
        prefix="5."
      />
      <meta-query-hero
        v-if="hasAuth"
        prefix="6."
      />
      <meta-mutation-hero
        v-if="hasAuth"
        prefix="7."
      />
      <wallet-query-hero
        v-if="hasAuth"
        prefix="8."
      />
      <wallet-mutation-hero
        v-if="hasAuth"
        prefix="9."
      />
      <token-hero
        v-if="hasAuth"
        prefix="10."
      />
      <transfer-hero
        v-if="hasAuth"
        prefix="11."
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
import MetaQueryHero from 'pages/Home/MetaQueryHero';
import application from 'src/mixins/application';
import MetaMutationHero from 'pages/Home/MetaMutationHero';
import WalletQueryHero from 'pages/Home/WalletQueryHero';
import TokenHero from 'pages/Home/TokenHero';
import InstallationHero from 'pages/Home/InstallationHero';
import NoClientHero from 'pages/Home/NoClientHero';
import NoSecretHero from 'pages/Home/NoSecretHero';
import TransferHero from 'pages/Home/TransferHero';
import WalletMutationHero from 'pages/Home/WalletMutationHero';

export default {
  components: {
    WalletMutationHero,
    TransferHero,
    NoSecretHero,
    NoClientHero,
    InstallationHero,
    TokenHero,
    WalletQueryHero,
    MetaMutationHero,
    MetaQueryHero,
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
