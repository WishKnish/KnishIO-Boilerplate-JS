<template>
  <q-card
    :style="!maximized && $q.screen.gt.xs ? `width: ${ width }px; max-width: 80vw;` : null"
    :class="`overflow-hidden-x ${ noPadding || $slots.actions ? '' : 'q-pb-md' }`"
    dark
  >
    <q-bar
      v-if="bar"
      class="bg-primary"
    >
      <div
        v-html="bar"
      />

      <q-space />

      <q-btn
        v-close-popup
        dense
        flat
        icon="fal fa-times-circle"
      >
        <q-tooltip
          content-class="bg-white text-primary"
        >
          {{ $t( 'ux.common.close' ) }}
        </q-tooltip>
      </q-btn>
    </q-bar>
    <q-item
      v-if="header"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-avatar>
          <q-icon
            :name="icon"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label
          class="text-h6"
          v-html="header"
        />
      </q-item-section>
    </q-item>
    <slot />
    <wk-dialog-actions
      v-if="$slots.actions"
    >
      <slot
        name="actions"
      />
    </wk-dialog-actions>
  </q-card>
</template>

<script>
import WkDialogActions from 'components/dialogs/WkDialogActions';

export default {
  components: { WkDialogActions, },
  mixins: [],
  props: {
    bar: {
      type: String,
      required: false,
      default: null,
    },
    header: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false,
    },
    maximized: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: Number,
      required: false,
      default: 800,
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
