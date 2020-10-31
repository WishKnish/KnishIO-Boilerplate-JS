<template>
  <section>
    <home-hero />
    <sequential-entrance>
      <client-hero
        v-model="client"
        class="q-pb-xl"
      />
      <cell-hero
        v-model="client"
        :class="`${ client ? '' : 'disabled no-pointer-events' } q-pb-xl`"
        @cell="setCell"
      />
      <secret-hero
        v-model="client"
        :class="`${ cellIsSet ? '' : 'disabled no-pointer-events' } q-pb-xl`"
      />
    </sequential-entrance>
  </section>
</template>

<script>
import HomeHero from 'pages/Home/HomeHero';
import ClientHero from 'pages/Home/ClientHero';
import CellHero from 'pages/Home/CellHero';
import SecretHero from 'pages/Home/SecretHero';

export default {
  components: {
    SecretHero,
    CellHero,
    ClientHero,
    HomeHero,
  },
  props: {},
  data () {
    return {
      client: null,
      cellIsSet: false,
    };
  },
  computed: {},
  mounted () {
  },
  methods: {
    setCell( cellIsSet ){
      this.cellIsSet = cellIsSet;
    },
  },
};
</script>
