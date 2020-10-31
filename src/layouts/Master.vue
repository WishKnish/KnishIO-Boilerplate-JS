<template>
  <q-layout
    view="hHh LpR fff"
  >
    <transition
      :duration="1000"
      :enter-active-class="transitions.in"
      :leave-active-class="transitions.out"
      appear
    >
      <section
        v-if="initialized"
      >
        <wk-header
          id="headerContent"
          :css="{
            maxWidth: '5em',
            maxHeight: '35px',
          }"
          :show-profile="true"
          :show-language="false"
          :show-share="false"
          :show-cart="$router.currentRoute.name !== 'checkout'"
          logo="statics/branding/logo-knishio.svg"
          class="animate-event"
        />
        <q-drawer
          v-model="drawerOpen"
          side="left"
          content-class="bg-tiling-dark bg-gradient"
          dark
          elevated
        >
          <wk-menu
            :show-language="false"
            :show-profile="false"
            :show-share="false"
            :show-cart="false"
            vertical
          />
        </q-drawer>
        <q-page-container>
          <q-page class="row no-wrap">
            <div class="col">
              <div class="column fit">
                <q-scroll-area
                  class="col"
                  @scroll="setScrollPosition"
                >
                  <transition
                    :enter-active-class="transitions.enter"
                    :leave-active-class="transitions.leave"
                    mode="out-in"
                    :duration="200"
                  >
                    <router-view />
                  </transition>
                </q-scroll-area>
              </div>
            </div>
          </q-page>
        </q-page-container>
        <wk-footer />
      </section>
      <div
        v-else
        class="fixed-full row flex-center items-center z-fullscreen bg-tiling-dark"
      >
        <q-img
          :ratio="1"
          :src="`statics/branding/icon-knishio.svg`"
          :class="logoSpin ? 'fa-spin' : 'animated pulse infinite'"
          style="max-width: 50%; max-height: 50%;"
          contain
        />
      </div>
    </transition>

    <dialogs />

    <wk-back-to-top />

    <q-resize-observer
      @resize="setHeight"
    />
  </q-layout>
</template>

<script>
import WkHeader from 'components/layout/WkHeader';
import WkFooter from 'components/layout/WkFooter';
import WkBackToTop from 'components/layout/WkBackToTop';
import { animateCSS, } from 'src/libraries/ux';
import vuex from 'src/mixins/vuex';
import application from 'src/mixins/application';
import knishio from 'src/mixins/knishio';
import Dialogs from 'layouts/Dialogs';
import WkMenu from 'components/layout/menu/WkMenu';

export default {
  components: {
    WkMenu,
    Dialogs,
    WkHeader,
    WkFooter,
    WkBackToTop,
  },
  mixins: [
    vuex,
    application,
    knishio,
  ],
  props: {
    anchorTarget: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
  computed: {},
  watch: {
    $route ( to, from ) {
      if ( to.hash ) {
        this.scrollToTimeout( to.hash, 1000 );
      }
    },
    errorState ( val, oldVal ) {
      if ( val !== oldVal && val === true ) {
        animateCSS( '.animate-event', 'shake', function () {
          this.errorState = false;
        }.bind( this ) );
      }
    },
  },
  mounted () {
    this.setHeight();
  },
  methods: {
    setHeight () {
      this.headerHeight = this.getElementHeight( 'headerContent' );
    },
    setScrollPosition( scroll ) {
      this.scrollY = scroll.verticalPosition;
    },
  },
};
</script>

<style>
</style>
