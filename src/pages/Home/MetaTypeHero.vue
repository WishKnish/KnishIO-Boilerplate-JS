<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      7. The Meta Assets
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Knish.IO provides for dynamic, virtual data structures called **Meta Assets**. Specific Meta Assets are identified via a combination of `metaType` and `metaId` fields, and can have an arbitrary amount of `metas` storing key/value pairs of properties."
        />
      </div>
      <q-item>
        <q-item-section>
          <div
            class="row q-col-gutter-sm"
          >
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoMetaType"
                label="Meta Type:"
                class="fit"
              />
            </div>
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoMetaId"
                label="(optional) Meta ID:"
                class="fit"
              />
            </div>
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoKey"
                label="(optional) Key:"
                class="fit"
              />
            </div>
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoValue"
                label="(optional) Value:"
                class="fit"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-checkbox
            v-model="demoLatest"
          >
            Limit results to the latest meta value per key?
          </q-checkbox>
        </q-item-section>
        <q-item-section
          side
        >
          <wk-button
            :outline="false"
            :disable="!demoMetaType"
            label="Query MetaType"
            @click="query"
          />
        </q-item-section>
      </q-item>
      <sequential-entrance>
        <wk-code-example
          :example="example"
        />
        <div
          v-if="!loading && results"
        >
          <wk-meta-table
            v-for="metaInstance in results"
            :key="metaInstance.metaKey"
            :metas="metaInstance.metas"
            :show-search="false"
            :show-molecule="false"
            :show-timestamp="false"
          />
        </div>

        <wk-input
          v-if="!loading && results"
          label="Raw Metadata:"
          :value="JSON.stringify( decycle( results ) )"
          type="textarea"
          class="q-mt-md"
          readonly
        />
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error querying meta type data:"
        />
      </sequential-entrance>
    </div>
    <wk-inner-loading
      :loading="loading"
    />
  </wk-hero-card>
</template>

<script>
import WkButton from 'components/WkButton';
import WkHeroCard from 'components/layout/WkHeroCard';
import WkCodeExample from 'components/WkCodeExample';
import vuex from 'src/mixins/vuex';
import WkBanner from 'components/WkBanner';
import WkInput from 'components/forms/fields/WkInput';
import WkInnerLoading from 'components/layout/WkInnerLoading';
import WkMetaTable from 'components/tables/WkMetaTable';
import { decycle, } from 'src/libraries/strings';

export default {
  components: {
    WkMetaTable,
    WkInnerLoading,
    WkInput,
    WkBanner,
    WkCodeExample,
    WkButton,
    WkHeroCard,
  },
  mixins: [
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
      loading: false,
      demoMetaType: 'WalletBundle',
      demoMetaId: null,
      demoKey: null,
      demoValue: null,
      demoLatest: true,
      results: null,
      error: null,
    };
  },
  computed: {
    example () {
      const metaType = this.demoMetaType ? `'${ this.demoMetaType }'` : '>>META TYPE<<';
      const metaId = this.demoMetaId ? `'${ this.demoMetaId }'` : 'null';
      const key = this.demoKey ? `'${ this.demoKey }'` : 'null';
      const value = this.demoValue ? `'${ this.demoValue }'` : 'null';
      const latest = this.demoLatest ? `${ this.demoLatest }` : 'null';
      return `const result = await client.queryMeta (
  ${ metaType }, // MetaType
  ${ metaId }, // Meta ID
  ${ key }, // Key
  ${ value } // Value
  ${ latest } // Limit meta values to latest per key
)`;
    },
  },
  mounted () {
    this.demoMetaId = this.demoClient.bundle();
  },
  methods: {
    decycle,
    async query () {
      this.loading = true;
      try {
        this.error = null;
        const result = await this.demoClient.queryMeta( this.demoMetaType > '' ? this.demoMetaType : null, this.demoMetaId > '' ? this.demoMetaId : null, this.demoKey > '' ? this.demoKey : null, this.demoValue > '' ? this.demoValue : null, this.demoLatest );
        if ( !result ) {
          this.error = `No "${ this.demoMetaType }" meta type instances were found!`;
        } else {
          this.results = result;
          this.$emit( 'input', this.results );
        }
        this.loading = false;
      } catch ( e ) {
        this.error = e;
        console.error( e );
        this.loading = false;
      }
    },
  },
};
</script>
