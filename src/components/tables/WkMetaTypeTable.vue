<template>
  <q-table
    :data="instances"
    :columns="getColumns()"
    :pagination.sync="pagination"
    :loading="loading"
    :hide-bottom="instances.length > 0 && instances.length <= pagination.rowsPerPage"
    :filter="showSearch ? filter : null"
    :filter-method="filterMethod"
    :no-data-label="$t('tables.type.header.empty')"
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
      <q-item
        v-if="metaType"
        :dark="dark"
      >
        <q-item-section>
          <q-item-label>
            {{ $t( 'tables.type.header.title', { metaType: metaType, } ) }}
          </q-item-label>
        </q-item-section>
      </q-item>
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
    <template v-slot:body-cell-name="props">
      <q-td
        :align="props.col.align"
      >
        <div
          class="ellipsis"
          style="max-width: 200px;"
        >
          {{ props.value }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-id="props">
      <q-td
        :align="props.col.align"
      >
        {{ props.row.metaId }}
      </q-td>
    </template>
    <template v-slot:body-cell-metas="props">
      <q-td
        :align="props.col.align"
      >
        <wk-meta-table
          v-if="props.value && Object.keys( props.value ).length"
          :metas="props.value"
          :show-molecule="false"
          :show-search="false"
          :show-timestamp="false"
        />
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-created="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          {{ props.value | moment( timestampFormat ) }}
        </span>
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { PAGINATION_DEFAULTS, } from 'src/constants/defaults';
import application from 'src/mixins/application';
import WkMetaTable from 'components/tables/WkMetaTable';

export default {
  components: { WkMetaTable, },
  mixins: [
    application,
  ],
  props: {
    metaType: {
      type: String,
      required: false,
      default: null,
    },
    instances: {
      type: Array,
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
    showMolecule: {
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
  methods: {
    filterMethod ( rows, terms ) {
      const lowerTerms = terms ? terms.toLowerCase() : '';
      return rows.filter( ( row ) => {
        return JSON.stringify( row ).toLowerCase().indexOf( lowerTerms ) !== -1;
      } );
    },
    getColumns () {
      const columns = [
        {
          name: 'id',
          label: this.$t( 'tables.type.columns.id' ),
          field: row => row.metaId,
          align: 'center',
          sortable: true,
          required: true,
        },
        {
          name: 'metas',
          label: this.$t( 'tables.type.columns.metas' ),
          field: row => row.metas,
          align: 'center',
          sortable: true,
          required: true,
        },
      ];

      if ( this.showMolecule ) {
        columns.push( {
          name: 'molecules',
          label: this.$t( 'tables.type.columns.molecules' ),
          field: row => row.molecules.length,
          align: 'center',
          sortable: true,
          required: true,
        } );
      }

      columns.push( {
        name: 'created',
        label: this.$t( 'tables.type.columns.created' ),
        field: row => Number( row.createdAt ),
        align: 'center',
        sortable: true,
        required: true,
      } );

      return columns;
    },
  },
};
</script>

<style>
</style>
