<template>
  <section
    class="relative-position"
  >
    <div
      class="row flex-center"
    >
      <q-card
        class="col-xs-12 col-sm-8"
      >
        <div
          class="q-pa-md"
        >
          <q-img
            id="bodyLogo"
            :title="$t( 'ux.appTitle' )"
            src="statics/branding/logo-knishio-blurb.png"
            class="hover-zoom full-width"
            ratio="3"
            style="max-width: 800px;"
          />
          <div
            class="row justify-center"
          >
            <div
              :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
            >
              <div
                :class="`${ $q.screen.gt.xs ? 'text-h4' : 'text-h5' } q-mb-md text-uppercase text-center`"
                v-html="$t( 'pages.home.homeHero.slogan' )"
              />

              <div
                :class="$q.screen.gt.xs ? 'text-h6' : 'text-h7'"
                v-html="$t( 'pages.home.homeHero.description' )"
              />
            </div>
          </div>
        </div>
      </q-card>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    };
  },
  computed: {},
  methods: {},
};
</script>
