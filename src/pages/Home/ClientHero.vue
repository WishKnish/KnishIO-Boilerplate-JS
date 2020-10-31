<template>
  <section
    class="relative-position"
  >
    <div
      class="row flex-center"
    >
      <q-card
        class="col-xs-12 col-sm-8"
      >
        <div
          class="q-pa-md"
        >
          <h4
            class="text-center"
          >
            1. The Knish.IO Client
          </h4>
          <div
            :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
          >
            <div
              :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
            >
              <VueShowdown
                markdown="The first step is to instantiate a `KnishIOClient` instance:"
              />
            </div>
            <q-item>
              <q-item-section>
                <wk-input
                  v-model="nodeUri"
                  :readonly="!!client"
                  label="Enter your Knish.IO Node URI:"
                  class="fit"
                />
              </q-item-section>
              <q-item-section
                side
              >
                <wk-button
                  v-if="!client"
                  :disable="!nodeUri"
                  :outline="false"
                  label="Create"
                  @click="createClient"
                />
                <wk-button
                  v-else
                  :outline="false"
                  label="Reset"
                  color="negative"
                  @click="resetClient"
                />
              </q-item-section>
            </q-item>
            <sequential-entrance>
              <VueShowdown
                v-if="nodeUri"
                :markdown="example"
              />
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
                      Error creating a KnishIOClient instance:
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
  },
  data () {
    return {
      nodeUri: null,
      client: null,
      error: null,
    };
  },
  computed: {
    example() {
      return `\`\`\`javascript
import { KnishIOClient } from '@wishknish/knishio-client-js'
const client = new KnishIOClient( '${ this.nodeUri }' );
\`\`\``;
    },
  },
  mounted () {
    this.client = this.value;
  },
  methods: {
    createClient() {
      try {
        this.error = null;
        this.client = new KnishIOClient( this.nodeUri );
        this.$emit('input', this.client );
      }
      catch (e) {
        this.error = e;
        console.error(e);
      }
    },
    resetClient() {
      this.client = null;
      this.nodeUri = null;
      this.error = null;
      this.$emit('input', null );
    },
  },
};
</script>
