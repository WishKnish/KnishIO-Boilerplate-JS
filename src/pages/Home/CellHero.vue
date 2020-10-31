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
            2. The Cell
          </h4>
          <div
            :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
          >
            <div
              :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
            >
              <VueShowdown
                markdown="Your Cell represents your Knish.IO dApp. You should have received a `cellSlug` to use."
              />
            </div>
            <q-item>
              <q-item-section>
                <wk-input
                  v-model="cellSlug"
                  label="Enter your Cell Slug:"
                  class="fit"
                />
              </q-item-section>
              <q-item-section
                side
              >
                <wk-button
                  v-if="!cellSlugSet"
                  :disable="!cellSlug"
                  :outline="false"
                  label="Set Cell"
                  @click="setCell"
                />
                <wk-button
                  v-else
                  :outline="false"
                  label="Reset"
                  color="negative"
                  @click="resetCell"
                />
              </q-item-section>
            </q-item>
            <sequential-entrance>
              <VueShowdown
                v-if="cellSlug"
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
                        name="fa fa-exclamation"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      Error setting your Cell slug:
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
      cellSlug: null,
      cellSlugSet: false,
      error: null,
    };
  },
  computed: {
    example () {
      return `\`\`\`javascript
client.setCellSlug( '${ this.cellSlug }' );
\`\`\``;
    },
  },
  methods: {
    setCell () {
      try {
        this.error = null;
        this.value.setCellSlug( this.cellSlug );
        this.cellSlugSet = true;
        this.$emit('cell', this.cellSlug );
      } catch ( e ) {
        this.error = e;
        console.error(e);
      }
    },
    resetCell () {
      this.cellSlug = null;
      this.error = null;
      this.cellSlugSet = false;
      this.$emit('cell', null );
    },
  },
};
</script>
