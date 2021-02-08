<template>
  <q-table
    :data="rows"
    :columns="getColumns()"
    :pagination.sync="pagination"
    :loading="loading"
    :hide-bottom="rows.length > 0 && rows.length <= pagination.rowsPerPage"
    :filter="showSearch ? filter : null"
    :filter-method="filterMethod"
    :no-data-label="$t('tables.bundle.header.empty')"
    :dense="$q.screen.lt.md"
    :wrap-cells="$q.screen.lt.md"
    :dark="dark"
    :flat="dark"
    row-key="name"
    class="full-width"
  >
    <template
      v-if="showSearch"
      v-slot:top
    >
      <q-space />
      <q-input
        v-model="filter"
        :dark="dark"
        debounce="300"
        color="info"
        standout="info"
        class="input-sm"
        rounded
      >
        <template v-slot:append>
          <q-icon
            name="fa fa-search"
          />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-value="props">
      <q-td
        :align="props.col.align"
      >
        <div
          v-if="props.row.id === 'created'"
        >
          <span
            v-if="props.value"
          >
            {{ Number( props.value ) | moment(timestampFormat) }}
          </span>
          <q-icon
            v-else
            name="fa fa-times-circle"
            color="danger"
          />
        </div>
        <div
          v-else-if="props.row.id === 'meta'"
        >
          <wk-meta-table
            v-if="props.value && Object.keys( props.value ).length"
            :metas="props.value"
            :show-molecule="false"
            :show-search="false"
            :show-timestamp="showTimestamp"
          />
          <q-icon
            v-else
            name="fa fa-times-circle"
            color="danger"
          />
        </div>
        <div
          v-else-if="props.row.id === 'atoms'"
        >
          <div
            v-if="props.value && props.value.length"
          >
            <wk-atom-chip
              v-for="(atom, key) in props.value"
              :key="key"
              :atom="atom"
            />
          </div>
          <q-icon
            v-else
            name="fa fa-times-circle"
            color="danger"
          />
        </div>
        <div
          v-else
        >
          <q-icon
            v-if="!props.value"
            name="fa fa-times-circle"
            color="danger"
          />
          <span
            v-else
          >
            {{ props.value }}
          </span>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import WkAtomChip from 'components/chips/WkAtomChip';
import WkMetaTable from './WkMetaTable';
import { PAGINATION_DEFAULTS, } from 'src/constants/defaults';
import application from 'src/mixins/application';

export default {
  components: {
    WkMetaTable,
    WkAtomChip,
  },
  mixins: [
    application,
  ],
  props: {
    bundle: {
      type: [ Object, Array, ],
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    bundleHash: {
      type: String,
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    showTimestamp: {
      type: Boolean,
      required: false,
      default: true,
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      pagination: PAGINATION_DEFAULTS,
      filter: '',
    };
  },
  computed: {
    rows () {
      return this.bundle && Object.keys( this.bundle ).length > 0 ? [
        {
          id: 'bundle',
          name: this.$t( 'tables.bundle.columns.bundle' ),
          value: this.bundle.bundleHash,
        },
        {
          id: 'created',
          name: this.$t( 'tables.bundle.columns.created' ),
          value: this.bundle.createdAt,
        },
        {
          id: 'meta',
          name: this.$t( 'tables.bundle.columns.meta' ),
          value: this.bundle.metas,
        },
      ] : [];
    },
  },
  methods: {
    filterMethod ( rows, terms ) {
      const lowerTerms = terms ? terms.toLowerCase() : '';
      return rows.filter( ( row ) => {
        return JSON.stringify( row ).toLowerCase().indexOf( lowerTerms ) !== -1;
      } );
    },
    getColumns () {
      return [
        {
          name: 'parameter', // unique id (used by row-key, pagination.sortBy, ...)
          label: this.$t( 'tables.bundle.columns.parameter' ), // label for header
          field: 'name',
          align: 'center', // (optional) alignment
          sortable: true, // (optional) tell QTable you want this column sortable
          required: true,
          classes: 'text-uppercase text-bold text-no-wrap',
        },
        {
          name: 'value',
          label: this.$t( 'tables.bundle.columns.value' ),
          field: 'value',
          align: 'center',
          sortable: true,
        },
      ];
    },
  },
};
</script>

<style>
</style>
