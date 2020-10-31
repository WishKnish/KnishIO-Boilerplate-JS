<template>
  <q-item
    :to="to"
    tag="label"
    active-class="primary"
    dark
    dense
    clickable
    @click="$emit('click')"
  >
    <q-item-section
      avatar
    >
      <q-avatar
        size="2em"
      >
        <q-img
          :ratio="1"
          src="statics/branding/icon.svg"
          class="full-height"
          contain
        />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label
        v-html="title"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import application from 'src/mixins/application';

export default {
  mixins: [
    application,
  ],
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
  computed: {},
};
</script>

<style>
</style>
