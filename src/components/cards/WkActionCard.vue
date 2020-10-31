<template>
  <div
    class="col-sm-6 col-md-4"
  >
    <q-card
      class="hover-zoom full-height column"
    >
      <q-img
        :src="`statics/bgs/card-${ $vnode.key }.jpg`"
        :alt="card.header"
      />
      <q-card-section
        class="col"
      >
        <div
          class="text-h6"
          v-html="card.header"
        />
        <div
          v-html="card.description"
        />
      </q-card-section>
      <q-card-actions
        v-if="enabled"
        align="center"
        class="q-pb-lg"
      >
        <q-btn
          :label="card.button.label"
          :icon="`${ card.button.icon } ${ authorized ? 'fa-spin' : '' }`"
          :disable="!authorized"
          color="accent"
          rounded
          size="lg"
          class="hover-zoom"
          @click="$emit( 'action', $vnode.key )"
        >
          <q-tooltip
            v-if="!authorized && unauthorizedTooltip"
            max-width="300px"
          >
            <span
              v-html="unauthorizedTooltip"
            />
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    card: {
      type: Object,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    authorized: {
      type: Boolean,
      required: false,
      default: true,
    },
    unauthorizedTooltip: {
      type: String,
      required: false,
      default: null,
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
