<template>
  <div
    id="WkMenu"
    :class="`${ vertical ? 'column fit justify-between q-pa-sm' : '' } overflow-hidden`"
  >
    <div
      :class="`${ vertical ? 'column' : 'row'} q-gutter-sm`"
    >
      <wk-button
        v-for="link in links"
        :key="link"
        :label="$t( `ux.menus.${ link }` )"
        :to="{ name: link, }"
      />

      <wk-button
        v-if="showProfile"
      >
        <div
          v-if="initialized && loggedIn"
        >
          <q-avatar
            size="2em"
            color="accent"
          >
            <q-img
              :src="avatar"
              :ratio="1"
            />
          </q-avatar>
          <span
            v-if="$q.screen.gt.xs"
            class="q-pl-xs text-white"
          >
            {{ publicName || $t( 'ux.user.guest' ) }}
          </span>
        </div>
        <div
          v-else-if="initialized"
        >
          <q-avatar
            size="2em"
            color="accent"
          >
            <q-icon
              name="fal fa-user"
              color="white"
            />
          </q-avatar>
          <span
            class="gt-xs q-pl-xs text-white"
          >
            {{ $t( 'ux.user.notLoggedIn' ) }}
          </span>
        </div>
        <div
          v-else
        >
          <q-avatar
            size="2em"
          >
            <q-icon
              name="fal fa-sync fa-spin"
            />
          </q-avatar>
          <span
            class="gt-xs q-pl-xs"
          >
            Connecting&hellip;
          </span>
        </div>
        <q-icon
          v-if="$q.screen.gt.xs && initialized && !loggedIn"
          name="fal fa-caret-down"
        />
        <wk-menu-profile
          v-if="initialized && loggedIn"
          :vertical="vertical"
        />
        <wk-menu-login
          v-else-if="initialized"
        />
      </wk-button>

      <q-btn
        v-if="showLanguage"
        v-ripple
        color="grey"
        size="md"
        icon-right="fal fa-caret-down"
        flat
      >
        <q-avatar>
          <country-flag
            :country="languages[language].flag"
          />
        </q-avatar>

        <wk-menu-language />
      </q-btn>
    </div>

    <wk-button
      v-if="vertical"
      :label="trans( 'ux.common.close' )"
      :shrink-label="false"
      icon="fal fa-times"
      color="secondary"
      @click="drawerOpen = !drawerOpen"
    />
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag';
import WkMenuLanguage from './WkMenuLanguage';
import WkMenuProfile from './WkMenuProfile';
import WkMenuLogin from './WkMenuLogin';
import WkButton from 'components/WkButton';
import knishio from 'src/mixins/knishio';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkButton,
    WkMenuLogin,
    WkMenuProfile,
    WkMenuLanguage,
    CountryFlag,
  },
  mixins: [
    knishio,
    application,
    vuex,
  ],
  props: {
    showLinks: {
      type: Boolean,
      required: false,
      default: true,
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
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      loginError: false,
      links: this.showLinks ? [
        'about',
      ] : [],
    };
  },
};
</script>

<style>
</style>
