<template>
  <section
    class="relative-position"
  >
    <div
      class="row flex-center"
    >
      <q-card
        class="col-xs-12 col-sm-8"
      >
        <div
          class="q-pa-md"
        >
          <slot />
        </div>
      </q-card>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {};
  },
};
</script>

<style>
</style>
