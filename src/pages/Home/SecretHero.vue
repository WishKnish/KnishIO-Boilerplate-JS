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
            3. The Secret
          </h4>
          <div
            :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
          >
            <div
              :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
            >
              <VueShowdown
                markdown="Your `secret` is used to build wallets, sign transactions, and figure out your user ID. It can be derived through any cryptographic methods, so long as you end up with 2048 hexadecimal symbols."
              />
            </div>
            <q-item>
              <q-item-section>
                <wk-input
                  v-model="password"
                  label="Enter a Password:"
                  class="fit"
                  type="password"
                />
              </q-item-section>
              <q-item-section
                side
              >
                <wk-button
                  v-if="!secretIsSet"
                  :disable="!password"
                  :outline="false"
                  label="Hash Password"
                  @click="setSecret"
                />
                <wk-button
                  v-else
                  :outline="false"
                  label="Reset"
                  color="negative"
                  @click="resetSecret"
                />
              </q-item-section>
            </q-item>
            <sequential-entrance>
              <VueShowdown
                v-if="password"
                :markdown="secretExample"
              />
              <q-item
                v-if="secret"
              >
                <q-item-section>
                  <q-item-label
                    caption
                  >
                    <wk-input
                      label="Your secret is:"
                      :value="secret"
                      type="textarea"
                      readonly
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <VueShowdown
                v-if="bundleHash"
                :markdown="authExample"
              />
              <q-item
                v-if="secret"
              >
                <q-item-section>
                  <q-item-label
                    caption
                  >
                    <wk-input
                      label="Your user ID (bundle hash) is:"
                      :value="bundleHash"
                      type="textarea"
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
                      Error creating your secret:
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
import { dom, } from 'quasar';
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import { KnishIOClient, } from '@wishknish/knishio-client-js';
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
import { KNISHIO_SETTINGS, } from 'src/constants/knishio';

const { height, } = dom;

export default {
  components: { WkButton, WkInput, },
  props: {
    value: {
      type: KnishIOClient,
      required: false,
      default: null,
    },
  },
  data () {
    return {
      password: null,
      secret: null,
      secretIsSet: false,
      bundleHash: null,
      error: null,
    };
  },
  computed: {
    secretExample () {
      return `\`\`\`javascript
import { generateSecret, } from '@wishknish/knishio-client-js/src/libraries/crypto';
const secret = generateSecret( \`${ this.password }:${ KNISHIO_SETTINGS.salt }\` );
\`\`\``;
    },
    authExample () {
      return `\`\`\`javascript
client.requestAuthToken ( secret );
const bundle = client.bundle ();
\`\`\``;
    },
  },
  methods: {
    async setSecret () {
      try {
        this.secret = generateSecret( `${ this.password }:${ KNISHIO_SETTINGS.salt }` );
        const result = await this.value.requestAuthToken( this.secret );
        console.log(result);
        this.bundleHash = this.value.bundle();
        this.secretIsSet = true;
        this.$emit('secret', true );
      } catch ( e ) {
        this.error = e;
        console.log(this.value);
        console.error(e);
      }
    },
    resetSecret () {
      this.secret = null;
      this.error = null;
      this.bundleHash = null;
      this.secretIsSet = false;
      this.$emit('secret', false );
    },
  },
};
</script>
