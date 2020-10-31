<template>
  <div
    :class="`${ size } self-center ${ noPadding ? '' : `q-pa-${ gutter }` }`"
  >
    <q-card
      :class="`fit ${ zoom ? 'hover-zoom' : '' } ${ dark ? '' : 'bg-grey-2' } ${ dimmed ? dark ? 'dark-dimmed' : 'light-dimmed' : '' }`"
      :dark="dark"
      :flat="flat"
      :bordered="bordered"
      style="border-radius: 28px;"
    >
      <div
        v-if="ribbon"
        :class="`ribbon ${ ribbonColor } ${ dimmed ? dark ? 'dark-dimmed' : 'light-dimmed' : '' }`"
      >
        <span
          v-html="ribbon"
        />
      </div>
      <q-card-section
        v-if="title || icon"
        class="text-center"
      >
        <q-icon
          v-if="icon"
          :name="icon + ' fa-' + iconSize"
          :color="iconColor"
        />
        <h5
          v-if="title"
          v-html="title"
        />
      </q-card-section>
      <q-card-section
        :class="(!title && !icon ? 'fit' : '')"
      >
        <slot />
      </q-card-section>
      <q-card-actions
        v-if="showClose"
        align="right"
        class="q-pa-md"
      >
        <q-btn
          v-close-popup
          :label="$t( 'ux.common.close' )"
          color="primary"
          outline
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'WkHoverCard',
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      required: false,
      default: null,
    },
    ribbon: {
      type: String,
      required: false,
      default: null,
    },
    iconColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    iconSize: {
      type: String,
      required: false,
      default: '3x',
    },
    ribbonColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    dimmed: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: 'col-lg-4 col-md-4 col-sm-6 col-xs-12',
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    zoom: {
      type: Boolean,
      required: false,
      default: true,
    },
    flat: {
      type: Boolean,
      required: false,
      default: false,
    },
    bordered: {
      type: Boolean,
      required: false,
      default: true,
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false,
    },
    showClose: {
      type: Boolean,
      required: false,
      default: false,
    },
    gutter: {
      type: String,
      required: false,
      default: 'sm',
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
