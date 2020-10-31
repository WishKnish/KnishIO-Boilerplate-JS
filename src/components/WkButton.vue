<template>
  <q-btn
    :color="color"
    :size="size"
    :to="to"
    :outline="outline"
    :dense="dense"
    :flat="flat"
    :round="round"
    :rounded="rounded"
    :disable="disable"
    :stack="stack"
    no-wrap
    @click="$emit( 'click', $event.target )"
  >
    <q-badge
      v-if="badge"
      :color="badgeColor"
      floating
    >
      {{ badge }}
    </q-badge>
    <q-icon
      v-if="icon"
      :name="icon"
      :color="textColor"
    />
    <span
      v-if="( !icon || $q.screen.gt.xs || !shrinkLabel ) && label"
      :class="`${ icon ? 'q-pl-sm ' : '' }text-${ textColor }`"
      v-html="label"
    />
    <slot />
    <q-tooltip
      v-if="tooltip || $q.screen.xs && label"
    >
      <span
        v-html="tooltip ? tooltip : label"
      />
    </q-tooltip>
  </q-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    textColor: {
      type: String,
      required: false,
      default: 'white',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    tooltip: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    to: {
      type: [ String, Object, ],
      required: false,
      default: null,
    },
    dense: {
      type: Boolean,
      required: false,
      default: false,
    },
    flat: {
      type: Boolean,
      required: false,
      default: false,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    outline: {
      type: Boolean,
      required: false,
      default: true,
    },
    round: {
      type: Boolean,
      required: false,
      default: null,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: null,
    },
    click: {
      type: Function,
      required: false,
      default: null,
    },
    badge: {
      type: [ String, Number, ],
      required: false,
      default: null,
    },
    badgeColor: {
      type: String,
      required: false,
      default: 'green',
    },
    shrinkLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    stack: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
};
</script>

<style>
</style>
