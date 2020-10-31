<template>
  <q-input
    :type="type"
    :value="value"
    :label="label ? label : $t( `${ fieldKey }.header` )"
    :disable="disable"
    :readonly="readonly"
    :mask="mask"
    :reverse-fill-mask="reverseFillMask"
    :unmasked-value="unmaskedValue"
    :prefix="prefix"
    :maxlength="maxlength"
    :hint="hint"
    :dark="dark"
    :bg-color="dark ? null : 'white'"
    :color="dark ? 'white' : 'white'"
    :input-class="dark ? 'text-white' : 'text-primary'"
    :standout="dark ? 'bg-secondary' : 'bg-white'"
    :dense="dense"
    :rules="rulesArray"
    :debounce="debounce"
    :loading="loading"
    :rounded="rounded"
    outlined
    lazy-rules
    @input="emitValue"
    @blur="emitValue(value)"
  >
    <template
      v-if="icon"
      v-slot:before
    >
      <q-icon
        :name="icon"
      />
    </template>
    <template v-slot:append>
      <slot />
    </template>
    <template v-slot:control="{ id, floatingLabel, value, emitValue, }">
      <input
        v-show="floatingLabel"
        :id="id"
        class="q-field__input text-right"
        :value="value"
        @change="e => emitValue(e.target.value)"
      >
    </template>
  </q-input>
</template>

<script>
import { EMAIL_PATTERN, } from 'src/constants/patterns';

export default {
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
    fieldKey: {
      type: String,
      required: false,
      default: null,
    },
    prefix: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: null,
    },
    debounce: {
      type: Number,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    mask: {
      type: String,
      required: false,
      default: '',
    },
    reverseFillMask: {
      type: Boolean,
      required: false,
      default: false,
    },
    unmaskedValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxlength: {
      type: Number,
      required: false,
      default: null,
    },
    maximum: {
      type: Number,
      required: false,
      default: null,
    },
    hint: {
      type: String,
      required: false,
      default: null,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
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
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: Array,
      required: false,
      default: Array,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  computed: {
    rulesArray () {
      let rulesArray = this.rules;

      if ( this.type === 'email' ) {
        rulesArray.unshift(
          val => EMAIL_PATTERN.test( val ) || this.$t( 'ux.validation.email', { field: this.$t( 'ux.validation.thisField' ), } ),
        );
      }

      if ( this.required ) {
        rulesArray.unshift(
          val => !!val || this.$t( 'ux.validation.required', { field: this.$t( 'ux.validation.thisField' ), } ),
        );
      }

      return rulesArray;
    },
  },
  methods: {
    emitValue ( val ) {
      if ( this.maximum && this.maximum < Number( val ) ) {
        val = String( this.maximum );
      }
      this.$emit( 'input', val );
    },
  },
};
</script>

<style>
</style>
