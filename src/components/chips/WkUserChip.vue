<template>
  <q-chip
    :dark="dark"
    :class="dark ? 'border-knishio-primary' : null"
    :color="dark ? 'grey-9' : null"
  >
    <q-avatar
      size="2em"
      color="secondary"
    >
      <q-img
        :src="chipAvatar"
        :title="chipName"
        ratio="1"
        class="fit"
      />
    </q-avatar>
    {{ chipName }}
  </q-chip>
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
    dark: {
      type: Boolean,
      required: false,
      default: false,
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

      let name = '';

      if ( this.name ) {
        name = this.name;
      } else if ( this.user ) {
        if ( this.user.publicName ) {
          name = this.user.publicName;
        } else if ( this.user.name ) {
          name = this.user.name;
        } else if ( this.user.metas ) {
          if ( this.user.metas.publicName ) {
            name = this.user.metas.publicName;
          } else if ( this.user.metas.name ) {
            name = this.user.metas.name;
          }
        }
      } else {
        name = this.$t( 'ux.user.guest' );
      }

      if ( name.length === 0 ) {
        name = this.$t( 'ux.user.guest' );
      } else if ( name.length > 64 ) {
        name = this.$t( 'ux.user.anonymous' );
      }

      return name;
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
