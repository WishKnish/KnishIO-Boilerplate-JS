<template>
  <q-banner
    :class="color"
  >
    <q-item
      dark
    >
      <q-item-section
        avatar
      >
        <q-avatar>
          <q-icon
            :name="icon"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <slot />
        <q-item-label
          v-if="label"
          v-html="label"
        />
        <q-item-label
          v-if="caption"
          caption
          v-html="caption"
        />
      </q-item-section>
    </q-item>
  </q-banner>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'bg-negative',
    },
    icon: {
      type: String,
      required: false,
      default: 'fa fa-exclamation',
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    caption: {
      type: [ String, Error, ],
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
};
</script>

<style>
</style>
