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
        v-model="client"
      />
      <cell-hero
        v-model="client"
        :class="`${ client ? '' : 'disabled no-pointer-events' }`"
        @cell="setCell"
      />
      <secret-hero
        v-model="client"
        :class="`${ cell ? '' : 'disabled no-pointer-events' }`"
        @secret="setSecret"
      />
      <auth-hero
        v-model="client"
        :secret="secret"
        :class="`${ secret ? '' : 'disabled no-pointer-events' }`"
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

export default {
  components: {
    AuthHero,
    SecretHero,
    CellHero,
    ClientHero,
    HomeHero,
  },
  props: {},
  data () {
    return {
      client: null,
      cell: null,
      secret: null,
    };
  },
  computed: {},
  mounted () {
  },
  methods: {
    setCell( cell ){
      this.cell = cell;
    },
    setSecret( secret ){
      this.secret = secret;
    },
  },
};
</script>
