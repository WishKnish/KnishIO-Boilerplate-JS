<template>
  <q-avatar
    color="info"
    text-color="white"
    :size="size"
  >
    {{ isotope }}
    <q-tooltip
      max-width="200px"
    >
      <span
        v-html="$t( `ux.isotopes.${ isotope }` )"
      />
    </q-tooltip>
  </q-avatar>
</template>

<script>
export default {
  components: {},
  props: {
    isotope: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>
