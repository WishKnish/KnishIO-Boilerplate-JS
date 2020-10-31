<template>
  <div
    class="q-pt-lg full-width flex flex-center"
  >
    <q-pagination
      v-model="page"
      :max="5"
      :direction-links="true"
      @input="$emit( 'input', $event )"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data () {
    return {
      page: 0,
    };
  },
  mounted () {
    this.page = this.value;
  },
};
</script>

<style>
</style>
