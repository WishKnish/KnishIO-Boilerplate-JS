<template>
  <section
    v-if="loggedIn"
  >
    <wk-page-header
      :background="cover"
      no-video
    >
      <div
        v-if="initialized"
        class="row flex-center text-center text-white"
      >
        <div
          class="col-shrink text-center text-h3 text-uppercase text-bold"
        >
          <q-avatar
            size="150px"
            color="accent"
            class="hover-zoom"
          >
            <q-img
              :src="avatar"
              class="full-height"
              cover
            />
          </q-avatar>
          <div class="text-h6 text-no-wrap">
            {{ publicName || $t( 'ux.user.guest' ) }}
          </div>
        </div>
      </div>
      <template slot="parallax">
        &nbsp;
      </template>
      <q-inner-loading
        :showing="avatarLoading"
      >
        <q-spinner
          size="50px"
          color="accent"
        />
      </q-inner-loading>
    </wk-page-header>
    <wk-breadcrumbs>
      {{ $t( 'pages.profile.header.title' ) }}
    </wk-breadcrumbs>
    <wk-page-content
      class="q-pt-lg"
      no-padding
    >
      <div class="row justify-center">
        <q-btn-toggle
          v-model="selectedSlide"
          class="full-width"
          color="accent"
          toggle-color="accent disabled"
          :size="$q.screen.gt.xs ? 'lg' : 'md'"
          :options="routes"
          rounded
          stack
          spread
          no-wrap
          @input="$router.push( selectedSlide ).catch( err => {} )"
        />
      </div>
    </wk-page-content>
    <transition
      :enter-active-class="transitions.enter"
      :leave-active-class="transitions.leave"
      :duration="200"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<style>
</style>

<script>
import WkPageHeader from 'components/layout/page/WkPageHeader';
import WkBreadcrumbs from 'components/layout/WkBreadcrumbs';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';
import WkPageContent from 'components/layout/page/WkPageContent';

export default {
  components: {
    WkPageContent,
    WkBreadcrumbs,
    WkPageHeader,
  },
  mixins: [
    application,
    vuex,
  ],
  props: {
    slide: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      selectedSlide: this.slide,
    };
  },
  computed: {
    routes () {
      return [
        {
          label: this.$q.screen.gt.xs ? this.$t( 'pages.profile.buttons.dashboard' ) : null,
          value: this.$router.resolve( { name: 'profile', } ).href,
          icon: 'fa fa-fw fa-tachometer',
        },
        {
          label: this.$q.screen.gt.xs ? this.$t( 'pages.profile.buttons.favorites' ) : null,
          value: this.$router.resolve( { name: 'favorites', } ).href,
          icon: 'fa fa-fw fa-heart',
        },
        {
          label: this.$q.screen.gt.xs ? this.$t( 'pages.profile.buttons.messages' ) : null,
          value: this.$router.resolve( { name: 'messages', } ).href,
          icon: 'fa fa-fw fa-envelope',
        },
        {
          label: this.$q.screen.gt.xs ? this.$t( 'pages.profile.buttons.purchases' ) : null,
          value: this.$router.resolve( { name: 'purchases', } ).href,
          icon: 'fa fa-fw fa-bags-shopping',
        },
      ];
    },
  },
  watch: {
    loggedIn ( val ) {
      // Just got initialized
      if ( !val ) {
        console.log( 'Watcher Guard: Not logged in!' );
        this.guardRedirect();
      }
    },
  },
  mounted () {
    if ( !this.loggedIn ) {
      console.log( 'Mounted Guard: Not logged in!' );
      this.guardRedirect();
    }
  },
  methods: {
    guardRedirect () {
      // this.$q.notify( this.notifySetup( 'Please log in first!', 'fa fa-times-circle', 'negative') );
      this.$router.push( {
        name: 'login',
        params: {
          redirect: this.$router.resolve( { name: 'profile', } ).href,
        },
      } ).catch( err => {
      } );
    },
  },
};
</script>
