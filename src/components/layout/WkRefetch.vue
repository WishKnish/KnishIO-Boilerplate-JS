<template>
  <q-page-sticky
    position="top-right"
    :offset="[18, 18]"
  >
    <q-btn
      fab
      icon="fa fa-sync"
      color="secondary"
      push
      @click="action()"
    />
  </q-page-sticky>
</template>

<script>
export default {
  props: {
    action: {
      type: Function,
      required: true,
    },
  },
  data () {
    return {};
  },
};
</script>

<style>
</style>
