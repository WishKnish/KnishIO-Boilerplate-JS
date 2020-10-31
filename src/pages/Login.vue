<template>
  <section
    class="q-pt-md q-pb-md"
  >
    <wk-page-content
      title="Log In"
      icon="fal fa-users"
    >
      <div
        class="row"
      >
        <q-input
          ref="username"
          v-model="auth.username"
          :rules="[
            val => !!val || 'Username is required.',
            val => !val || val.length > 4 || 'Username is too short.',
            val => !val || val.length <=64 || 'Username is too long.',
          ]"
          class="col-xs-12 q-mb-sm"
          label="Your Username"
          maxlength="64"
          color="primary"
          outlined
          dense
          square
          lazy-rules
        />
        <q-input
          ref="password"
          v-model="auth.password"
          :rules="[
            val => !!val || 'Password is required.',
            val => !val || val.length > 5 || 'Password is too short.',
            val => !val || val.length <=64 || 'Password is too long.',
          ]"
          type="password"
          class="col-xs-12"
          label="Your Password"
          maxlength="64"
          color="primary"
          outlined
          dense
          square
          lazy-rules
        />
      </div>
      <q-btn-group
        class="q-mt-sm"
        color="primary"
        push
        outline
        spread
        stretch
      >
        <q-btn
          label="Log In"
          size="md"
          color="primary"
          outline
          no-wrap
          @click="login"
        />
        <q-btn
          v-close-popup
          label="Register"
          size="md"
          color="info"
          outline
          no-wrap
          @click="registerDialogOpen = true"
        />
        <q-btn
          v-close-popup
          label="Restore"
          size="md"
          color="warning"
          outline
          no-wrap
          @click="restoreDialogOpen = true"
        />
      </q-btn-group>
    </wk-page-content>
  </section>
</template>

<style>
</style>

<script>
import WkPageContent from 'components/layout/page/WkPageContent';
import notifies from 'src/mixins/notifies';
import vuex from 'src/mixins/vuex';

const fieldsForValidation = [
  'username',
  'password',
];

export default {
  components: {
    WkPageContent,
  },
  mixins: [
    notifies,
    vuex,
  ],
  props: {
    redirect: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      auth: {
        username: null,
        password: null,
      },
    };
  },
  computed: {},
  watch: {
    loggedIn ( val ) {
      // Just got initialized
      if ( val ) {
        this.guardRedirect();
      }
    },
  },
  mounted () {
    if ( this.loggedIn ) {
      this.guardRedirect();
    }
  },
  methods: {
    guardRedirect () {
      // this.$q.notify( this.notifySetup( 'You are already logged in!', 'fal fa-times-circle', 'negative' ) );
      this.$router.push( {
        name: 'profile',
      } ).catch( err => {
      } );
    },
    validate () {
      const refs = this.$refs;
      let formHasError = false;
      fieldsForValidation.forEach( function ( field ) {
        if ( refs[ field ] ) {
          refs[ field ].validate();
          if ( refs[ field ].hasError ) {
            formHasError = true;
          }
        }
      } );
      this.formHasError = formHasError;
      return !this.formHasError;
    },
    login () {
      if ( this.validate() ) {
        this.$store.dispatch( 'user/LOGIN', {
          username: this.auth.username,
          password: this.auth.password,
          vm: this,
        } ).finally( ( result ) => {
          if ( !this.loggedIn ) {
            this.notify( $q.notify, 'Invalid username / password combination.', 'negative' );
          } else {
            this.$router.push( this.redirect ? this.redirect : '/profile' ).catch( err => {
            } );
          }
        } );
      }
    },
  },
};
</script>
