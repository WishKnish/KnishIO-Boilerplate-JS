<template>
  <q-avatar
    color="secondary"
  >
    <q-img
      :src="chipAvatar"
      :title="chipName"
      ratio="1"
      class="fit"
    />
  </q-avatar>
</template>

<script>
import { AVATAAARS_OPTIONS, } from 'src/constants/defaults';

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    bundleHash: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
  computed: {
    chipBundle () {
      if ( this.bundleHash ) {
        return this.bundleHash;
      }

      return this.user ? this.user.bundleHash : null;
    },
    chipName () {
      if ( this.name ) {
        return this.name;
      }

      if ( this.user ) {
        return this.user.publicName ? this.user.publicName : this.user.name ? this.user.name : this.user.metas && this.user.metas.name ? this.user.metas.name : this.$t( 'ux.user.guest' );
      }

      return this.$t( 'ux.user.guest' );
    },
    chipAvatar () {
      if ( this.avatar ) {
        return this.avatar;
      }

      let avatar = null;

      if ( this.user ) {
        avatar = this.user.avatar ? this.user.avatar : this.user.metas && this.user.metas.avatar ? this.user.metas.avatar : null;
      }

      if ( !avatar ) {
        avatar = 'https://avatars.dicebear.com/v2/avataaars/';
        avatar += this.chipBundle;
        avatar += `.svg?${ AVATAAARS_OPTIONS }`;
      }

      return avatar;
    },
  },
  methods: {},
};
</script>

<style>
</style>
