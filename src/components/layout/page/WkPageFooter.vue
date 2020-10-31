<template>
  <section>
    <div class="row fit justify-center bg-dark shadow-up-5 text-white">
      <div class="col-lg-8 col-sm-10 col-xs-12 self-center q-pa-lg">
        <section
          v-if="title"
          class="q-mb-lg"
        >
          <div
            class="row q-mb-lg"
          >
            <div
              class="bg-white col-lg-2 col-sm-3 col-xs-4"
              style="height: 0.25em;"
            />
          </div>
          <h4>{{ title }}</h4>
          <div
            v-if="subtitle"
            class="text-subtitle1 text-uppercase"
          >
            {{ subtitle }}
          </div>
        </section>
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WkPageFooter',
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    subtitle: {
      type: String,
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
