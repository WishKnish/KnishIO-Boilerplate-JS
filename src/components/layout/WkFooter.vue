<template>
  <q-footer
    id="WkFooter"
    elevated
    class="bg-tiling-dark text-white"
  >
    <q-separator
      color="primary"
    />
    <q-toolbar>
      <span
        class="text-uppercase text-overline"
        style="font-size: 50%;"
      >
        Powered by
      </span>
      <a
        href="https://knish.io"
        target="_blank"
      >
        <q-img
          alt="Knish.IO"
          title="Knish.IO Post-Blockchain Platform"
          contain
          :src="logo"
          :ratio="ratio"
          :style="css"
        />
      </a>
      <q-space />
      <q-btn
        v-for="(button, key) in getButtons()"
        :key="key"
        v-ripple
        :to="button.to"
        :dense="!$q.screen.gt.xs"
        color="grey"
        size="md"
        flat
        rounded
      >
        <span v-html="button.title" />
      </q-btn>
    </q-toolbar>
  </q-footer>
</template>

<script>
import application from '../../mixins/application';

export default {
  name: 'WkFooter',
  mixins: [
    application,
  ],
  props: {
    logo: {
      type: String,
      required: false,
      default: 'statics/logo-simple-knishio.svg',
    },
    ratio: {
      type: Number,
      required: false,
      default: 214 / 50,
    },
    css: {
      type: Object,
      required: false,
      default: function () {
        return {
          width: '3.5em',
          height: '1em',
          marginBottom: '0.35em',
        };
      },
    },
  },
  data () {
    return {};
  },
  methods: {
    getButtons () {
      return [
        {
          title: this.$t( 'ux.footer.privacy' ),
          to: '/privacy',
        },
        {
          title: this.$t( 'ux.footer.tos' ),
          to: '/tos',
        },
      ];
    },
  },
};
</script>

<style>
</style>
