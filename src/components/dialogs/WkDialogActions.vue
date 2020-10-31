<template>
  <q-card-actions
    align="stretch"
    class="overflow-hidden-x"
  >
    <q-separator
      v-if="!noSeparator"
      color="primary"
    />
    <div
      :class="`${ noPadding ? '' : 'q-pa-md' } full-width`"
    >
      <slot />
    </div>
  </q-card-actions>
</template>

<script>
export default {
  components: {},
  props: {
    noSeparator: {
      type: Boolean,
      required: false,
      default: false,
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style>
</style>
