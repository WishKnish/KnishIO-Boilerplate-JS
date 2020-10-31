<template>
  <section>
    <div
      class="row flex-center"
    >
      <q-card
        class="col-xs-12 col-sm-8"
      >
        <div
          class="col q-pa-md"
        >
          <h4
            class="text-center"
          >
            4. The Auth Token
          </h4>
          <div
            :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
          >
            <div
              :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
            >
              <VueShowdown
                markdown="Authorization tokens are temporarily given by Knish.IO nodes and are provided in the `X-Auth-Token` HTTP header. The Knish.IO client will manage these for you automatically."
              />
            </div>
            <div
              class="text-center"
            >
              <wk-button
                v-if="!authToken"
                :outline="false"
                label="Request Authorization Token"
                @click="requestAuth"
              />
              <wk-button
                v-else
                :disable="!value || !secret"
                :outline="false"
                label="Reset"
                color="negative"
                @click="resetAuth"
              />
            </div>
            <sequential-entrance>
              <VueShowdown
                v-if="secret"
                :markdown="example"
              />
              <q-item
                v-if="authToken"
              >
                <q-item-section>
                  <q-item-label
                    caption
                  >
                    <wk-input
                      label="Your authorization token is:"
                      :value="authToken"
                      readonly
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-banner
                v-if="error"
                class="bg-negative"
              >
                <q-item
                  dark
                >
                  <q-item-section
                    avatar
                  >
                    <q-avatar>
                      <q-icon
                        name="fal fa-exclamation"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      Error requsting an authorization token:
                    </q-item-label>
                    <q-item-label
                      caption
                    >
                      {{ error }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-banner>
            </sequential-entrance>
          </div>
        </div>
      </q-card>
    </div>
  </section>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import { KnishIOClient, } from '@wishknish/knishio-client-js';

export default {
  components: { WkButton, WkInput, },
  props: {
    value: {
      type: KnishIOClient,
      required: false,
      default: null,
    },
    secret: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      authToken: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `\`\`\`javascript
client.requestAuthToken ( '${ this.secret.substr(0, 16 )}...' );
\`\`\``;
    },
  },
  methods: {
    async requestAuth () {
      try {
        this.error = null;
        await this.value.requestAuthToken( this.secret );
        this.authToken = this.value.getAuthToken();
        this.$emit( 'auth', this.authToken );
      } catch ( e ) {
        this.error = e;
        console.log( this.value );
        console.error( e );
      }
    },
    resetAuth () {
      this.authToken = null;
      this.error = null;
      this.$emit( 'auth', null );
    },
  },
};
</script>
