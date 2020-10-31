<template>
  <form
    :class="formHasError ? 'error' : ''"
    @submit.prevent="submit"
  >
    <q-card-section
      class="q-pa-none"
    >
      <q-stepper
        ref="stepper"
        v-model="step"
        :vertical="$q.screen.lt.md"
        active-color="accent"
        done-color="accent"
        class="q-pb-none"
        animated
        dark
        flat
      >
        <q-step
          :name="1"
          :done="step > 1"
          :title="$t( 'forms.register.stepper.step1' )"
          icon="fa fa-edit"
          active-icon="fa fa-edit"
          done-icon="fa fa-check-circle"
          error-icon="fa fa-times-circle"
        >
          <div
            class="row q-col-gutter-md"
          >
            <div
              class="col-xs-12"
            >
              {{ $t( 'forms.register.login.header' ) }}<br>
              <small
                v-html="$t( 'forms.register.login.caption' )"
              />
            </div>
            <q-input
              ref="username"
              v-model="auth.username"
              :label="$t( 'forms.register.fields.username.label' )"
              :rules="[
                val => !!val || $t( 'forms.register.fields.username.validation.required' ),
                val => !val || val.length > 4 || $t( 'forms.register.fields.username.validation.short' ),
                val => !val || val.length <=64 || $t( 'forms.register.fields.username.validation.long' ),
                val => !val || emailPattern.test(val) || $t( 'forms.register.fields.username.validation.invalid' ),
                val => !val || isUsernameUnique( val ) || $t( 'forms.register.fields.username.validation.exists' ),
              ]"
              type="email"
              maxlength="64"
              debounce="1000"
              class="col-xs-12 col-md-4"
              color="accent"
              rounded
              outlined
              dark
              lazy-rules
              hide-bottom-space
              @input="username = $event.toLowerCase()"
            >
              <template
                v-slot:before
              >
                <q-icon
                  name="fa fa-envelope"
                />
              </template>
            </q-input>

            <q-input
              ref="password"
              v-model="auth.password"
              :label="$t( 'forms.register.fields.password.label' )"
              :rules="[
                val => !!val || $t( 'forms.register.fields.password.validation.required' ),
                val => !val || val.length > 5 || $t( 'forms.register.fields.password.validation.short' ),
                val => !val || val.length <=64 || $t( 'forms.register.fields.password.validation.long' ),
              ]"
              type="password"
              maxlength="64"
              class="col-xs-12 col-md-4"
              color="accent"
              rounded
              outlined
              dark
              lazy-rules
              hide-bottom-space
            >
              <template
                v-slot:before
              >
                <q-icon
                  name="fa fa-lock"
                />
              </template>
            </q-input>

            <q-input
              ref="name"
              v-model="auth.publicName"
              :label="$t( 'forms.register.fields.nickname.label' )"
              maxlength="64"
              class="col-xs-12 col-md-4"
              color="accent"
              rounded
              outlined
              dark
              hide-bottom-space
              readonly
            >
              <template
                v-slot:before
              >
                <q-btn
                  color="accent"
                  icon="fa fa-sync"
                  size="xs"
                  round
                  @click="generatePublicName"
                />
              </template>
            </q-input>
          </div>
        </q-step>

        <q-step
          :name="2"
          :title="$t( 'forms.register.stepper.step2' )"
          :done="step > 2"
          :error="submitStatus === 'ERROR'"
          icon="fa fa-dna"
          active-icon="fa fa-dna"
          done-icon="fa fa-check-circle"
          error-icon="fa fa-times-circle"
        >
          <q-inner-loading
            :showing="submitStatus === 'PENDING'"
            dark
          >
            <q-spinner
              size="50px"
              color="primary"
            />
          </q-inner-loading>
          <section
            v-if="submitStatus === 'ERROR'"
          >
            <blockquote
              v-html="error"
            />
          </section>
        </q-step>

        <q-step
          :name="3"
          :title="$t( 'forms.register.stepper.step3' )"
          :done="submitStatus === 'SUCCESS'"
          :error="submitStatus === 'ERROR'"
          icon="fa fa-server"
          active-icon="fa fa-server"
          done-icon="fa fa-check-circle"
          error-icon="fa fa-times-circle"
        >
          <div
            v-if="submitStatus === 'SUCCESS'"
          >
            <p
              v-html="$t( 'forms.register.confirmation.success', { publicName: auth.publicName, } )"
            />
          </div>
          <div
            v-if="submitStatus === 'ERROR'"
          >
            {{ $t( 'forms.register.confirmation.failure' ) }}
            <blockquote
              v-html="error"
            />
          </div>
        </q-step>
      </q-stepper>
    </q-card-section>

    <wk-dialog-actions
      class="text-center"
    >
      <div
        v-show="step === 1"
      >
        <q-checkbox
          id="registerAccept"
          v-model="auth.accept"
          color="accent"
          dark
        />
        <label
          for="registerAccept"
          v-html="$t( 'forms.register.fields.accept.label' )"
        />
      </div>
      <q-btn
        v-show="step === 1"
        v-ripple
        :disabled="!auth.accept || submitStatus === 'PENDING'"
        color="accent"
        rounded
        outline
        @click="submit()"
      >
        <span
          class="text-white"
          v-html="$t( 'forms.register.buttons.submit' )"
        />
      </q-btn>
      <q-btn
        v-show="showButtonRetry"
        v-ripple
        color="accent"
        outline
        rounded
        @click="retry"
      >
        <span
          class="text-white"
          v-html="$t( 'ux.common.retry' )"
        />
      </q-btn>
      <q-btn
        v-show="step === 3"
        v-close-popup
        v-ripple
        color="accent"
        outline
        rounded
      >
        <span
          class="text-white"
          v-html="$t( 'ux.common.close' )"
        />
      </q-btn>
    </wk-dialog-actions>
  </form>
</template>

<script>
import { Wallet, } from '@wishknish/knishio-client-js/src';
import {
  KNISHIO_SETTINGS,
} from 'src/constants/knishio';
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
import { randomName, } from 'src/libraries/strings';
import WkDialogActions from 'components/dialogs/WkDialogActions';
import application from 'src/mixins/application';
import knishio from 'src/mixins/knishio';
import notifies from 'src/mixins/notifies';
import vuex from 'src/mixins/vuex';

const profileFieldsForValidation = [
  'username',
  'password',
];

export default {
  components: {
    WkDialogActions,
  },
  mixins: [
    knishio,
    notifies,
    application,
    vuex,
  ],
  props: {},
  data () {
    return {
      step: 1,
      auth: {
        username: '',
        password: '',
        publicName: '',
        accept: false,
      },
      submitStatus: '',
      error: null,
      formHasError: false,
    };
  },
  computed: {
    showButtonRetry () {
      return this.step > 1 && this.submitStatus === 'ERROR';
    },
    tempSecret () {
      return generateSecret( `${ this.auth.username }:${ this.auth.password }:${ KNISHIO_SETTINGS.salt }` );
    },
    tempMasterWallet () {
      return new Wallet( this.tempSecret, 'USER' );
    },
  },
  beforeMount () {
    this.generatePublicName();
  },
  methods: {

    /**
     * Generating a random public name
     */
    generatePublicName () {
      this.auth.publicName = randomName();
    },

    /**
     * Wrapper for validation method
     *
     * @returns {boolean}
     */
    validateNew () {
      return this.validate( profileFieldsForValidation );
    },

    /**
     * Submits the registration data to the ledger
     *
     * @returns {Promise<void>}
     */
    async submit () {

      // Validating one last time
      if ( this.validateNew() ) {

        // Switch to step 2
        this.step = 2;
        this.submitStatus = 'PENDING';

        // Attempting to hash an available secret
        await this.$store.dispatch( 'user/REGISTER', {
          username: this.auth.username,
          password: this.auth.password,
          vm: this,
        } );

        // No collisions, we're good
        if ( this.loggedIn ) {

          // Building profile metadata
          const metaType = 'WalletBundle';
          const metaId = this.tempMasterWallet.bundle;
          const metaData = {
            publicName: this.auth.publicName,
            usernameHash: this.hashUsername( this.auth.username ),
          };

          try {
            const response = await this.$knishio.createMeta( metaType, metaId, metaData );

            if ( response.success() ) {

              // Success! Switching to step 3
              this.submitStatus = 'SUCCESS';
              this.step = 3;
              this.notify( this.$q.notify, this.$t( 'forms.messaging.confirmation.success' ), 'success' );
              this.$emit( 'success' );

            } else {

              // The molecule was rejected on the server
              this.submitStatus = 'ERROR';
              this.error = response.error();
              this.notify( this.$q.notify, this.$t( 'forms.messaging.confirmation.failure' ), 'failure' );
              await this.$store.dispatch( 'user/LOGOUT', { vm: this, } );
              this.$emit( 'error' );

            }

          } catch ( knishIoException ) {

            // Something happened with signature or verification
            this.error = knishIoException.message;
            this.submitStatus = 'ERROR';
            console.log( knishIoException );
            await this.$store.dispatch( 'user/LOGOUT', { vm: this, } );

          }

        } else {

          // We found metadata for our username/password combination, so the registration is a dupe
          this.notify( this.$q.notify, this.$t( 'forms.register.confirmation.duplicate' ), 'failure' );
          this.submitStatus = 'ERROR';
          this.error = this.$t( 'forms.register.confirmation.duplicate' );
          this.$emit( 'error' );

        }
      } else {
        this.notify( this.$q.notify, this.$t( 'ux.common.error' ), 'negative' );
      }
    },
    retry () {

      // Switch to step 1
      this.formHasError = true;
      this.submitStatus = '';
      this.step = 1;

    },
  },
};
</script>
