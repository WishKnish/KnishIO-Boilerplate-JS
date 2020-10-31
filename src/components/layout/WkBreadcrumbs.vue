<template>
  <section
    :class="`relative-position bg-${ color }`"
  >
    <div
      :class="`bg-gradient row items-center text-${ textColor } ${ noShadow ? '' : 'shadow-5' }`"
    >
      <div
        class="col-grow"
      >
        <q-toolbar>
          <q-breadcrumbs
            active-color="white"
          >
            <q-breadcrumbs-el
              icon="fa fa-home"
              to="/"
            />
            <q-breadcrumbs-el
              v-for="(parent, key) in getParents()"
              :key="key"
              :to="parent.params"
            >
              {{ parent.name }}
            </q-breadcrumbs-el>
            <q-breadcrumbs-el
              v-if="$slots.default"
            >
              <slot />
            </q-breadcrumbs-el>
          </q-breadcrumbs>
        </q-toolbar>
      </div>
      <div
        v-if="$slots.right"
        class="col-shrink"
      >
        <slot name="right" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    color: {
      type: String,
      required: false,
      default: 'tiling-dark',
    },
    textColor: {
      type: String,
      required: false,
      default: 'white',
    },
    parents: {
      type: Array,
      required: false,
      default: null,
    },
    noShadow: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  methods: {
    getParents () {
      return this.parents || [];
    },
  },
};
</script>
<style>
</style>
