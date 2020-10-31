<template>
  <section
    :style="{height: `${ sectionHeight }px`}"
  >
    <div
      class="row full-height flex-center"
    >
      <q-card
        class="col-xs-12 col-sm-8"
      >
        <div
          id="homeHeroContent"
          class="col column items-center q-pa-md"
        >
          <q-img
            id="bodyLogo"
            :title="trans('ux.appTitle' )"
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
                v-html="trans( 'pages.home.homeHero.slogan' )"
              />

              <div
                :class="$q.screen.gt.xs ? 'text-h6' : 'text-h7'"
                v-html="trans( 'pages.home.homeHero.description' )"
              />
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-resize-observer
      @resize="setHeight"
    />
  </section>
</template>

<script>
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';
import { dom, } from 'quasar';

const { height, } = dom;

export default {
  components: {},
  mixins: [
    application,
    vuex,
  ],
  props: {},
  data () {
    return {
      heroContentHeight: 0,
      heroHeight: 0,
    };
  },
  computed: {
    sectionHeight() {
      const screenHeight = this.$q.screen.height - 100;
      if(screenHeight > this.heroContentHeight) {
        return screenHeight;
      }
      else {
        return this.heroContentHeight;
      }
    },
  },
  watch: {},
  mounted () {
    this.setHeight();
  },
  methods: {
    setHeight () {
      // this.setMaxWidth('homeHeroButton');
      this.heroContentHeight = this.getElementHeight( 'homeHeroContent' );
      this.heroHeight = this.getHeroHeight( this.heroContentHeight, false );
    },
  },
};
</script>
