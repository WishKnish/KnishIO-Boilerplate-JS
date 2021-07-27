<template>
  <q-table
    :data="metas"
    :columns="getColumns()"
    :pagination.sync="pagination"
    :loading="loading"
    :hide-bottom="metas && metas.length > 0 && metas.length <= pagination.rowsPerPage"
    :filter="showSearch ? filter : null"
    :filter-method="showSearch ? filterMethod : null"
    :no-data-label="$t( 'tables.metas.header.empty' )"
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
        v-if="metaType && metaId"
        :dark="dark"
      >
        <q-item-section>
          <q-item-label>
            {{ $t( 'tables.metas.header.title', { metaType: metaType, metaId: metaId, } ) }}
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
    <template v-slot:body-cell-value="props">
      <q-td
        :align="props.col.align"
      >
        <span
          v-if="props.value"
        >
          <tree-view
            v-if="typeof jsonValue(props.value) === 'object'"
            root-object-key="root"
            :options="treeViewOptions"
            :data="jsonValue(props.value)"
          />
          <span
            v-else
          >
            <q-item>
              <q-item-section>
                <q-item-label
                  lines="3"
                >
                  <div
                    class="ellipsis"
                    style="max-width: 300px;"
                  >
                    {{ props.value }}
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </span>
        </span>
        <q-icon
          v-else
          name="fa fa-times-circle"
          color="danger"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-molecule="props">
      <q-td
        :align="props.col.align"
      >
        <wk-molecule-chip
          v-if="props.value"
          :molecule="props.value"
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
import WkMoleculeChip from 'components/chips/WkMoleculeChip';
import { PAGINATION_DEFAULTS, } from 'src/constants/defaults';
import application from 'src/mixins/application';
import Meta from '@wishknish/knishio-client-js/src/Meta';

export default {
  components: {
    WkMoleculeChip,
  },
  mixins: [
    application,
  ],
  props: {
    metaType: {
      type: String,
      required: false,
      default: null,
    },
    metaId: {
      type: String,
      required: false,
      default: null,
    },
    metas: {
      type: [Array, Object, ],
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
    showMolecule: {
      type: Boolean,
      required: false,
      default: true,
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
      treeViewOptions: {
        maxDepth: 1,
        rootObjectKey: 'root',
      },
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
    maskValue ( key, val ) {
      if ( this.emailPattern.test( val ) || key === 'phone' || key === 'name' ) {
        val = this.$options.filters.truncateMiddle( val, 3 );
      }
      return val;
    },
    getColumns () {
      const columns = [];

      if ( this.showMolecule ) {
        columns.push(
          {
            name: 'molecule',
            label: this.$t( 'tables.metas.columns.molecule' ),
            field: row => {
              return { molecularHash: row.molecularHash, };
            },
            align: 'center',
            sortable: false,
          } );
      }

      columns.push(
        {
          name: 'key', // unique id (used by row-key, pagination.sortBy, ...)
          label: this.$t( 'tables.metas.columns.parameter' ), // label for header
          field: 'key',
          align: 'center', // (optional) alignment
          sortable: true, // (optional) tell QTable you want this column sortable
          required: true,
          classes: 'text-uppercase text-bold',
        }
      );

      columns.push(
        {
          name: 'value',
          label: this.$t( 'tables.metas.columns.value' ),
          field: 'value',
          align: 'center',
          sortable: true,
        }
      );

      if ( this.showTimestamp ) {
        columns.push(
          {
            name: 'created',
            label: this.$t( 'tables.metas.columns.created' ),
            field: row => Number( row.createdAt ),
            align: 'center',
            sortable: true,
          }
        );
      }

      return columns;
    },
    jsonValue ( value ) {
      try {
        return JSON.parse( value );
      } catch ( e ) {
        // Not JSON, don't worry
        return value;
      }
    },
  },
};
</script>

<style>
.tree-view-wrapper {
  text-align: left;
}
</style>
