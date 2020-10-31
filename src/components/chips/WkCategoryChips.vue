<template>
  <div>
    <q-chip
      :label="$t( `categories.options.${ product.category1 }.label` )"
      size="xs"
      class="cursor-pointer"
    />
    <q-icon
      v-if="product.category2"
      name="fa fa-chevron-right"
      size="0.5em"
    />
    <q-chip
      v-if="product.category2"
      :label="$t( `categories.options.${ product.category1 }.options.${ product.category2 }.label` )"
      size="xs"
      class="cursor-pointer"
    />
    <q-icon
      v-if="product.category3"
      name="fa fa-chevron-right"
      size="0.5em"
    />
    <q-chip
      v-if="product.category3"
      :label="$t( `categories.options.${ product.category1 }.options.${ product.category2 }.options.${ product.category3 }.label` )"
      size="xs"
      class="cursor-pointer"
    />
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    product: {
      type: Object,
      required: true,
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
