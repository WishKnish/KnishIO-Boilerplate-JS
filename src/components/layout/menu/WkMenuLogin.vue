<template>
  <q-menu
    :content-class="$q.screen.lt.sm ? 'full-max-width full-max-height' : 'auto-max-width'"
    :transition-show="transitions.in"
    :transition-hide="transitions.out"
    :offset="[0, 8]"
    separate-close-popup
    dark
    square
  >
    <q-card
      class="border-knishio-primary"
      :style="`${ $q.screen.lt.sm ? '' : 'width: 300px;' } border-top: none !important;`"
      dark
      square
    >
      <q-item
        dark
      >
        <q-item-section
          avatar
        >
          <q-avatar>
            <q-icon
              name="fa fa-sign-in"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-h5"
            v-html="$t( 'ux.menus.login.header' )"
          />
        </q-item-section>
      </q-item>
      <wk-login-form />
    </q-card>
  </q-menu>
</template>

<script>
import WkLoginForm from 'components/forms/WkLoginForm';
import knishio from 'src/mixins/knishio';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkLoginForm,
  },
  mixins: [
    knishio,
    application,
    vuex,
  ],
  data () {
    return {
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
</style>
