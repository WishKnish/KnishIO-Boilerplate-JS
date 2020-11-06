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
            <h4
              v-if="title"
              class="text-center"
            >
              {{ title }}
            </h4>
            <div
              :class="`${ $q.screen.gt.md ? 'q-pa-lg' : 'q-pa-md' }`"
            >
              <slot />
            </div>
          </div>
          <wk-inner-loading
            :loading="loading"
          />
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
import WkInnerLoading from 'components/layout/WkInnerLoading';
export default {
  components: {
    WkInnerLoading,
  },
  props: {
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: null,
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
