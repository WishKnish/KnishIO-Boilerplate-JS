<template>
  <form>
    <q-card-section>
      <q-input
        ref="secret"
        v-model="restoreSecret"
        :label="$t( 'forms.restore.fields.secret.title' )"
        :hint="$t( 'forms.restore.fields.secret.hint' )"
        :rules="[
          val => !!val || $t( 'forms.restore.fields.secret.required' ),
          val => val.length === 2048 || val.length === 1024 || $t( 'forms.restore.fields.secret.length' ),
          val => hexPattern.test(val) || $t( 'forms.restore.fields.secret.hex' ),
        ]"
        type="textarea"
        color="accent"
        counter
        filled
        dark
        lazy-rules
      />
    </q-card-section>
    <wk-dialog-actions
      class="text-center"
    >
      <q-btn
        v-close-popup="closeRestoreForm"
        :disabled="restoreSecret.hasError"
        color="accent"
        size="md"
        outline
        rounded
        @click="restore()"
      >
        <span
          class="text-white"
          v-html="$t( 'forms.restore.buttons.submit' )"
        />
      </q-btn>
    </wk-dialog-actions>
  </form>
</template>

<script>
import { HEX_PATTERN, } from 'src/constants/patterns';
import knishio from 'src/mixins/knishio';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';
import WkDialogActions from 'components/dialogs/WkDialogActions';

const fieldsForValidation = [
  'secret',
];

export default {
  components: { WkDialogActions, },
  mixins: [
    knishio,
    application,
    vuex,
  ],
  data () {
    return {
      restoreSecret: '',
      restoreStatus: null,
      closeRestoreForm: false,
      hexPattern: HEX_PATTERN,
    };
  },
  computed: {},

  methods: {
    restore () {
      if ( this.validate( fieldsForValidation ) ) {
        this.$store.dispatch( 'user/INIT', { newSecret: this.restoreSecret, vm: this, } );
        if ( this.$q.screen.gt.xs ) {
          this.$q.notify( {
            message: 'The active account has been successfully restored.',
            color: 'primary',
            icon: 'fa fa-check-circle',
            closeBtn: 'Close',
          } );
        }
        this.closeRestoreForm = true;
      }
    },
  },
};
</script>

<style>
</style>
