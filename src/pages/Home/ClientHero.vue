<template>
  <wk-hero-card
    :disable="disable"
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
            :readonly="!!demoClient"
            label="Enter your Knish.IO Node URI:"
            class="fit"
          />
        </q-item-section>
        <q-item-section
          side
        >
          <wk-button
            v-if="!demoClient"
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
        <WkCodeExample
          :example="example"
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
                  name="fa fa-exclamation"
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
  </wk-hero-card>
</template>

<script>
import WkInput from 'components/forms/fields/WkInput';
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import { KnishIOClient, } from '@wishknish/knishio-client-js';
import WkCodeExample from 'components/WkCodeExample';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkCodeExample,
    WkButton,
    WkInput,
    WkHeroCard,
  },
  mixins: [
    application,
    vuex,
  ],
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      nodeUri: null,
      error: null,
    };
  },
  computed: {
    example () {
      return `import { KnishIOClient } from '@wishknish/knishio-client-js'
const client = new KnishIOClient( '${ this.nodeUri ? this.nodeUri : '>>YOUR URI HERE<<' }' );`;
    },
  },
  methods: {
    createClient () {
      try {
        this.error = null;

        // Making sure URI is valid
        if( !this.urlPattern.test( this.nodeUri ) ) {
          this.error = 'Node URI is not a valid URI path! Please check again.';
          return;
        }

        this.demoClient = new KnishIOClient( this.nodeUri );
      } catch ( e ) {
        this.error = e;
        console.error( e );
      }
    },
    resetClient () {
      this.demoClient = null;
      this.nodeUri = null;
      this.error = null;
    },
  },
};
</script>
