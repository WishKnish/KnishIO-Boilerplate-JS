<template>
  <div
    id="q-app"
  >
    <router-view />
  </div>
</template>

<script>
import application from './mixins/application';

export default {
  name: 'App',
  mixins: [
    application,
  ],
  data () {
    return {};
  },
  meta () {
    return {
      title: this.trans( 'ux.appTitle' ),
    };
  },
  async mounted () {
    try {
      await this.$store.dispatch( 'user/INIT', { vm: this, } );
      await this.$store.dispatch( 'cart/INIT', { vm: this, } );
    } catch ( error ) {
      console.log( 'App Component Init: Caught exception!' );
      console.log( error );
    }
  },
  methods: {},
};
</script>

<style>
</style>
