<template>
  <div>
    <q-select
      :ref="refId"
      v-model="myValue"
      :options="fieldKey ? Object.keys( $t( `${ fieldKey }.options` ) ) : options"
      :options-dense="false"
      :label="fieldKey ? $t( `${ fieldKey }.header` ) : label"
      :disable="disable"
      :dark="dark"
      :color="dark ? 'white' : 'primary'"
      :options-dark="dark"
      :standout="dark ? 'white' : null"
      :bg-color="dark ? 'accent' : null"
      :outlined="!dark"
      :dense="dense"
      :rules="rules"
      :multiple="multiple"
      class="q-pb-md"
      options-selected-class="bg-accent text-white"
      emit-value
      map-options
      rounded
      lazy-rules
      @input="emitValue"
    >
      <template
        v-if="icon"
        v-slot:before
      >
        <q-icon
          :name="icon"
        />
      </template>
      <template
        v-slot:selected
      >
        <div
          v-if="multiple && myValue && myValue.length > 0"
        >
          <q-chip
            v-for="(val, key) in myValue"
            :key="key"
            dense
            v-html="fieldKey ? $t( `${ fieldKey }.options.${ val }.label` ) : val"
          />
        </div>
        <div
          v-else-if="!multiple && myValue"
          v-html="fieldKey ? $t( `${ fieldKey }.options.${ myValue }.label` ) : myValue"
        />
        <span
          v-else
        />
      </template>
      <template
        v-slot:option="scope"
      >
        <q-item
          v-bind="scope.itemProps"
          :dark="dark"
          v-on="scope.itemEvents"
        >
          <q-item-section>
            <q-item-label
              v-html="fieldKey ? $t( `${ fieldKey }.options.${ scope.opt }.label` ) : scope.opt"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    refId: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: Array,
      required: false,
      default: Array,
    },
    fieldKey: {
      type: String,
      required: false,
      default: null,
    },
    options: {
      type: Array,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    rules: {
      type: Array,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    noneValue: {
      type: String,
      required: false,
      default: 'none',
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      myValue: null,
    };
  },
  computed: {},
  watch: {
    value ( newVal, oldVal ) {
      if ( newVal !== oldVal ) {
        this.myValue = newVal;
      }
    },
  },
  beforeMount () {
    this.myValue = this.value;
  },
  methods: {
    emitValue ( val ) {
      if ( this.multiple && val ) {
        if ( val[ val.length - 1 ] === this.noneValue ) {
          val = [ this.noneValue, ];
          this.myValue = val;
        } else if ( val[ 0 ] === this.noneValue ) {
          val.shift();
        }
      }
      this.$emit( 'input', val );
    },
  },
};
</script>

<style>
</style>
