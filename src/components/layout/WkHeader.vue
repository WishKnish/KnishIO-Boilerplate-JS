<template>
  <q-header
    id="WkHeader"
    class="bg-tiling-dark text-white"
    reveal
    elevated
  >
    <q-toolbar>
      <q-btn
        v-if="$q.screen.lt.md"
        icon="fal fa-bars"
        dense
        flat
        round
        @click="drawerOpen = !drawerOpen"
      />
      <q-toolbar-title>
        <q-item
          tag="label"
          style="max-width: 150px;"
          dark
          dense
          to="/"
        >
          <q-item-section>
            <q-img
              :src="logo"
              :ratio="ratio"
              :style="css"
              contain
            />
          </q-item-section>
        </q-item>
      </q-toolbar-title>
      <wk-menu
        :show-language="showLanguage"
        :show-profile="showProfile"
        :show-links="$q.screen.gt.sm"
      />
    </q-toolbar>
    <q-separator
      color="primary"
    />
  </q-header>
</template>

<script>
import WkMenu from './menu/WkMenu';
import knishio from 'src/mixins/knishio';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkMenu,
  },
  mixins: [
    knishio,
    application,
    vuex,
  ],
  props: {
    logo: {
      type: String,
      required: false,
      default: 'statics/branding/logo-knishio.svg',
    },
    ratio: {
      type: Number,
      required: false,
      default: 2,
    },
    css: {
      type: Object,
      required: false,
      default: function () {
        return {
          maxWidth: '6em',
        };
      },
    },
    showProfile: {
      type: Boolean,
      required: false,
      default: true,
    },
    showLanguage: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {};
  },
  methods: {},
};
</script>
<style>
</style>
