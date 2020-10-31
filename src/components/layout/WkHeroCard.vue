<template>
  <section
    class="relative-position"
  >
    <div
      :class="cardClass"
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
    </div>
    <q-tooltip
      v-if="disable"
      content-style="background: none;"
    >
      <q-banner
        class="bg-warning"
      >
        <q-item
          dark
        >
          <q-item-section
            avatar
          >
            <q-avatar>
              <q-icon
                name="fa fa-exclamation"
              />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              Previous steps incomplete!
            </q-item-label>
            <q-item-label
              caption
            >
              You are missing some prerequisite steps, so scroll up and complete them.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-banner>
    </q-tooltip>
  </section>
</template>

<script>
export default {
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  computed: {
    cardClass () {
      return this.disable ? 'disabled no-pointer-events' : null;
    },
  },
};
</script>

<style>
</style>
