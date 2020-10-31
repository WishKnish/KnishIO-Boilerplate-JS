<template>
  <q-chip
    clickable
    @click="$router.push({ name: 'atom', params: { molecularHash: molecularHash ? molecularHash : atom.molecularHash, position: atom.position }})"
  >
    <wk-atom-isotope
      :isotope="atom.isotope"
    />
    {{ atom.tokenSlug }}
  </q-chip>
</template>

<script>
import WkAtomIsotope from './WkAtomIsotope';

export default {
  name: 'WkAtomChip',
  components: { WkAtomIsotope, },
  props: {
    atom: {
      type: Object,
      required: true,
    },
    molecularHash: {
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
