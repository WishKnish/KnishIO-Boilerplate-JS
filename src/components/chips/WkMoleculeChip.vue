<template>
  <q-chip
    clickable
    :color="color"
    :text-color="textColor"
    @click="$router.push( { name: 'molecule', params: { molecularHash: molecule.molecularHash } } ).catch( err => {} )"
  >
    <span
      class="q-pr-xs"
    >
      {{ molecule.molecularHash | truncateMiddle }}
    </span>
    <div class="column inline">
      <q-badge
        v-if="molecule.cascades"
        color="info"
        :class="`q-mb-xs ${ molecule.cascades.length === 0 ? 'disabled' : null }`"
      >
        {{ molecule.cascades.length }}
        <q-tooltip
          max-width="200px"
          anchor="top middle"
          self="bottom middle"
          :transition-show="transitions.in"
          :transition-hide="transitions.out"
        >
          <span
            v-if="molecule.cascades.length > 0"
          >
            This molecule is being referenced by
            <strong
              v-html="molecule.cascades.length"
            />
            subsequent molecules.
          </span>
          <span
            v-else
          >
            No other molecules are referencing this one.
          </span>
        </q-tooltip>
      </q-badge>
      <q-badge
        v-if="molecule.bonds"
        color="info"
        :class="molecule.bonds.length === 0 ? 'disabled' : null"
      >
        {{ molecule.bonds.length }}
        <q-tooltip
          v-if="molecule.bonds.length > 0"
          max-width="200px"
        >
          This molecule references
          <strong
            v-html="molecule.bonds.length"
          />
          previous molecules.
        </q-tooltip>
        <q-tooltip
          v-else
          max-width="200px"
        >
          This molecule does not reference any previous ones.
        </q-tooltip>
      </q-badge>
    </div>
  </q-chip>
</template>

<script>
import application from 'src/mixins/application';

export default {
  components: {},
  mixins: [
    application,
  ],
  props: {
    molecule: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'accent',
    },
    textColor: {
      type: String,
      required: false,
      default: 'white',
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
