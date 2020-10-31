<template>
  <form
    :class="formHasError ? 'error' : ''"
    @submit.prevent="validate"
  >
    <q-card-section
      class="column q-col-gutter-md"
    >
      <q-input
        ref="username"
        v-model="auth.username"
        :label="trans( 'forms.login.fields.username.label' )"
        :rules="[
          val => !!val || 'Username is required.',
          val => !val || val.length > 4 || 'Username is too short.',
          val => !val || val.length <=64 || 'Username is too long.',
        ]"
        maxlength="64"
        color="accent"
        rounded
        outlined
        dark
        dense
        lazy-rules
        hide-bottom-space
      />
      <q-input
        ref="password"
        v-model="auth.password"
        :label="$t( 'forms.login.fields.password.label' )"
        :rules="[
          val => !!val || $t( 'ux.validation.required', { field: $t( 'forms.login.fields.password.label' ), } ),
          val => !val || val.length > 5 || $t( 'ux.validation.short', { field: $t( 'forms.login.fields.password.label' ), } ),
          val => !val || val.length <=64 || $t( 'ux.validation.long', { field: $t( 'forms.login.fields.password.label' ), } ),
        ]"
        type="password"
        maxlength="64"
        color="accent"
        rounded
        outlined
        dark
        dense
        lazy-rules
        hide-bottom-space
      />
    </q-card-section>
    <wk-dialog-actions>
      <q-btn-group
        class="full-width"
        push
        rounded
        spread
      >
        <q-btn
          v-close-popup
          :disable="!auth.username || !auth.password"
          size="md"
          color="accent"
          outline
          no-wrap
          rounded
          @click="login"
        >
          <span
            class="text-white"
            v-html="$t( 'forms.login.buttons.login' )"
          />
        </q-btn>
        <q-btn
          v-close-popup
          size="md"
          color="accent"
          outline
          no-wrap
          rounded
          @click="registerDialogOpen = true"
        >
          <span
            class="text-white"
            v-html="$t( 'forms.login.buttons.register' )"
          />
        </q-btn>
        <q-btn
          v-close-popup
          size="md"
          color="accent"
          outline
          no-wrap
          rounded
          @click="restoreDialogOpen = true"
        >
          <span
            class="text-white"
            v-html="$t( 'forms.login.buttons.restore' )"
          />
        </q-btn>
      </q-btn-group>
    </wk-dialog-actions>
  </form>
</template>

<script>
import notifies from 'src/mixins/notifies';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';
import WkDialogActions from 'components/dialogs/WkDialogActions';

const fieldsForValidation = [
  'username',
  'password',
];

export default {
  components: { WkDialogActions, },
  mixins: [
    notifies,
    application,
    vuex,
  ],
  props: {},
  data () {
    return {
      auth: {
        username: null,
        password: null,
      },
    };
  },
  computed: {},
  mounted () {
  },
  methods: {
    login () {
      if ( this.validate( fieldsForValidation ) ) {
        this.$store
          .dispatch( 'user/LOGIN', {
            username: this.auth.username,
            password: this.auth.password,
            vm: this,
          } ).then( ( result ) => {
          if ( !this.loggedIn ) {
            this.notify( this.$q.notify, 'Invalid username / password combination.', 'negative' );
            this.$emit('error');
          }
          else {
            this.$emit('login');
          }
        } );
      }
    },
  },
};
</script>
