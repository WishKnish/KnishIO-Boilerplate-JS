<template>
  <q-table
    :data="wallets"
    :columns="getColumns()"
    :pagination.sync="pagination"
    :loading="loading"
    :hide-bottom="wallets.length > 0 && wallets.length <= pagination.rowsPerPage"
    :filter="showSearch ? filter : null"
    :filter-method="filterMethod"
    :no-data-label="$t('tables.wallets.header.empty')"
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
    <template v-slot:body-cell-address="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          {{ props.value | truncateMiddle }}
        </span>
        <span
          v-else
        >
          <q-icon
            name="fa fa-spy"
          />
          Shadow Wallet
        </span>
      </q-td>
    </template>

    <template v-slot:body-cell-bundle="props">
      <q-td
        :align="props.col.align"
      >
        {{ props.row.bundle | truncateMiddle }}
      </q-td>
    </template>
    <template v-slot:body-cell-position="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          {{ props.value | truncateMiddle }}
        </span>
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-amount="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value > 0"
        >
          {{ Number( props.value ) | numberWithCommas }}
        </span>
        <span
          v-else
        >
          0
        </span>
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
import {
  PAGINATION_DEFAULTS,
  TIMESTAMP_FORMAT,
} from 'src/constants/defaults';
import application from 'src/mixins/application';

export default {
  components: {},
  mixins: [
    application,
  ],
  props: {
    wallets: {
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
    showBundle: {
      type: Boolean,
      required: false,
      default: true,
    },
    showToken: {
      type: Boolean,
      required: false,
      default: true,
    },
    showSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
    showTimestamp: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    const data = {
      pagination: PAGINATION_DEFAULTS,
      timestampFormat: TIMESTAMP_FORMAT,
      filter: '',
    };
    data.pagination[ 'sortBy' ] = 'amount';
    return data;
  },
  methods: {
    filterMethod ( rows, terms ) {
      const lowerTerms = terms ? terms.toLowerCase() : '';
      return rows.filter( ( row ) => {
        return JSON.stringify( row ).toLowerCase().indexOf( lowerTerms ) !== -1;
      } );
    },
    getColumns () {
      const columns = [];

      columns.push(
        {
          name: 'address',
          label: this.$t( 'tables.wallets.columns.address' ),
          field: 'address',
          align: 'center',
          sortable: true,
          required: true,
        }
      );

      if ( this.showBundle ) {
        columns.push(
          {
            name: 'bundle',
            label: this.$t( 'tables.wallets.columns.bundle' ),
            field: 'bundleHash',
            align: 'center',
            sortable: true,
            required: true,
          }
        );
      }

      columns.push(
        {
          name: 'position',
          label: this.$t( 'tables.wallets.columns.position' ),
          field: 'position',
          align: 'center',
          sortable: true,
          required: true,
        }
      );

      if ( this.showToken ) {
        columns.push(
          {
            name: 'token',
            label: this.$t( 'tables.wallets.columns.token' ),
            field: 'token',
            align: 'center',
            sortable: true,
            required: true,
          }
        );
      }

      columns.push(
        {
          name: 'amount',
          label: this.$t( 'tables.wallets.columns.amount' ),
          field: 'balance',
          align: 'center',
          sortable: true,
          sort: ( a, b, rowA, rowB ) => parseInt( a, 10 ) - parseInt( b, 10 ),
          required: true,
        }
      );

      if ( this.showTimestamp ) {
        columns.push(
          {
            name: 'created',
            label: this.$t( 'tables.wallets.columns.created' ),
            field: row => Number( row.createdAt ),
            align: 'center',
            sortable: true,
            required: true,
          }
        );
      }

      return columns;
    },
  },
};
</script>

<style>
</style>
