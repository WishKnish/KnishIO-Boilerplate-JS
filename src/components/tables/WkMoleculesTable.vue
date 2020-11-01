<template>
  <q-table
    :data="molecules"
    :columns="getColumns()"
    :pagination.sync="pagination"
    :loading="loading"
    :hide-bottom="molecules.length > 0 && molecules.length <= pagination.rowsPerPage"
    :filter="showSearch ? filter : null"
    :filter-method="filterMethod"
    :no-data-label="$t('tables.types.header.empty')"
    :dense="$q.screen.lt.md"
    :wrap-cells="$q.screen.lt.md"
    :dark="dark"
    :flat="dark"
    row-key="name"
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
    <template v-slot:body-cell-molecule="props">
      <q-td
        :align="props.col.align"
      >
        <wk-molecule-chip
          :molecule="props.row"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-cell="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          {{ props.value }}
        </span>
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-atoms="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value.length"
        >
          <wk-atom-chip
            v-for="(atom, key) in props.value"
            :key="key"
            :atom="atom"
            :molecular-hash="props.row.molecularHash"
          />
        </span>
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-wallet="props">
      <q-td
        :align="props.col.align"
      >
        <router-link
          :to="{ name: 'wallet', params: { walletAddress: props.value }}"
        >
          <a>{{ props.value | truncateMiddle }}</a>
        </router-link>
      </q-td>
    </template>
    <template v-slot:body-cell-created="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          {{ props.value | moment(timestampFormat) }}
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
import WkAtomChip from 'components/chips/WkAtomChip';
import WkMoleculeChip from 'components/chips/WkMoleculeChip';
import {
  PAGINATION_DEFAULTS,
  TIMESTAMP_FORMAT,
} from 'src/constants/defaults';

export default {
  components: {
    WkMoleculeChip,
    WkAtomChip,
  },
  props: {
    molecules: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    showWallet: {
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
      timestampFormat: TIMESTAMP_FORMAT,
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
          name: 'molecule',
          label: this.$t( 'tables.molecules.columns.molecule' ),
          field: 'molecularHash',
          align: 'center',
          sortable: true,
          required: true,
        },
        {
          name: 'atoms',
          label: this.$t( 'tables.molecules.columns.atoms' ),
          field: 'atoms',
          align: 'center',
          sortable: true,
          required: true,
        },
        {
          name: 'cell',
          label: this.$t( 'tables.molecules.columns.cell' ),
          field: 'cellSlug',
          align: 'center',
          sortable: true,
          required: true,
        },
        {
          name: 'created',
          label: this.$t( 'tables.molecules.columns.created' ),
          field: row => Number( row.createdAt ),
          align: 'center',
          sortable: true,
          required: true,
        },
      ];

      return columns;
    },
  },
};
</script>

<style>
</style>
