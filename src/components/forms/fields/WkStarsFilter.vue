<template>
  <q-select
    v-model="filterStars"
    :options="filterStarsOptions"
    standout="white"
    bg-color="primary"
    color="white"
    label="Minimum Stars"
    style="min-width: 10em;"
    options-dense
    dark
    rounded
    dense
    @input="emitValue"
  >
    <template
      v-slot:selected
    >
      <q-rating
        :value="filterStars"
        size="1em"
        icon="fa fa-star"
        icon-selected="fas fa-star"
        icon-half="fas fa-star-half-alt"
        class="q-col-gutter-xs no-wrap"
        readonly
      />
    </template>
    <template
      v-slot:option="scope"
    >
      <q-item
        v-bind="scope.itemProps"
        v-on="scope.itemEvents"
      >
        <q-item-section>
          <q-rating
            :value="scope.opt"
            size="1em"
            icon="fa fa-star"
            icon-selected="fas fa-star"
            icon-half="fas fa-star-half-alt"
            class="q-col-gutter-xs no-wrap"
            readonly
          />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>

export default {
  components: {},
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data () {
    return {
      filterStars: 0,
      filterStarsOptions: [ 0, 1, 2, 3, 4, 5, ],
    };
  },
  computed: {},
  watch: {
    value ( newVal, oldVal ) {
      if ( newVal !== oldVal ) {
        this.filterStars = newVal;
      }
    },
  },
  mounted () {
    this.filterStars = this.value > 0 ? this.value : 0;
  },
  methods: {
    emitValue ( val ) {
      this.$emit( 'input', val );
    },
  },
};
</script>

<style>
</style>
