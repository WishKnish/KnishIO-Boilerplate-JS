<template>
  <q-inner-loading
    :showing="loading"
  >
    <q-spinner
      size="50px"
      color="primary"
    />
  </q-inner-loading>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
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
