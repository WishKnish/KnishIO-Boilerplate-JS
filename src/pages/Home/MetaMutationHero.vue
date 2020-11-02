<template>
  <wk-hero-card
    :disable="disable"
  >
    <h4
      class="text-center"
    >
      8. Writing New Metadata
    </h4>
    <div
      :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
    >
      <div
        :class="`${ $q.screen.gt.xs ? 'text-h5' : 'text-h6' } text-center`"
      >
        <VueShowdown
          markdown="Meta Assets can be changed by committing new metadata via the `KnishIOClient.createMeta` method. Though new metadata may get written to the same virtual field, its old metadata never goes away."
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
                label="Meta ID:"
                class="fit"
              />
            </div>
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoKey"
                label="Key:"
                class="fit"
              />
            </div>
            <div
              class="col-6"
            >
              <wk-input
                v-model="demoValue"
                label="New Value:"
                class="fit"
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
      <div
        class="text-center"
      >
        <wk-button
          :outline="false"
          :disable="!demoMetaType || !demoMetaId"
          label="Write New Metadata"
          @click="mutate"
        />
      </div>
      <sequential-entrance>
        <wk-code-example
          :example="example"
        />
        <wk-input
          v-if="!loading && result"
          label="Raw Response:"
          :value="JSON.stringify( decycle( result ) )"
          type="textarea"
          class="q-mt-md"
          readonly
        />
        <wk-banner
          v-if="error"
          :caption="error"
          label="Error writing new metadata:"
        />
        <wk-banner
          v-if="successMessage"
          :caption="successMessage"
          label="Metadata has been updated:"
          color="bg-positive"
          icon="fa fa-check"
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
import { decycle, } from 'src/libraries/strings';

export default {
  components: {
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
      demoKey: 'foo',
      demoValue: 'bar',
      demoLatest: true,
      result: null,
      error: null,
      successMessage: null,
    };
  },
  computed: {
    example () {
      const metaType = this.demoMetaType ? `'${ this.demoMetaType }'` : '>>META TYPE<<';
      const metaId = this.demoMetaId ? `'${ this.demoMetaId }'` : '>>META ID<<';
      const metadata = `{
    '${ this.demoKey ? this.demoKey : '>>KEY<<' }': '${ this.demoValue ? this.demoValue : '>>VALUE<<' }'
  }`;
      return `const result = await client.createMeta (
  ${ metaType }, // MetaType
  ${ metaId }, // Meta ID
  ${ metadata } // Metadata JSON
);
if( result.success() ) {
  // Do things!
}
console.log( result.data() ); // Raw response
`;
    },
  },
  mounted () {
    this.demoMetaId = this.demoClient.bundle();
  },
  methods: {
    decycle,
    async mutate () {
      this.loading = true;
      try {
        this.error = null;
        this.successMessage = null;
        const metadata = {};
        metadata[ this.demoKey ] = this.demoValue;
        const result = await this.demoClient.createMeta( this.demoMetaType, this.demoMetaId, metadata );
        if ( !result.success() ) {
          this.error = result.reason();
        } else {
          this.result = result.data();
          this.successMessage = `The "${ this.demoMetaType }" instance was successfully updated!`;
          this.$emit( 'input', this.result );
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
