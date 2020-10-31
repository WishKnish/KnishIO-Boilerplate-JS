<template>
  <section
    :class="`relative-position page-content ${ dark ? 'bg-tiling-dark' : '' }`"
  >
    <div
      :class="`row fit justify-center ${ dark ? 'text-white' : '' } ${ cover ? `inset-shadow-15 ${ dark ? 'bg-top-dark ' : 'bg-top' }` : '' }`"
    >
      <section
        :class="`${ size } self-center ${ noPadding ? '' : `q-pl-${ padding } q-pr-${ padding } q-pt-${ padding }` }`"
      >
        <div
          v-if="title || subtitle"
        >
          <q-item>
            <q-item-section
              v-if="icon && $q.screen.gt.xs"
              thumbnail
            >
              <q-icon
                :name="icon"
                :color="iconColor"
                style="font-size: 72px;"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-if="title || !!$slots.title"
              >
                <h2
                  :class="textColor ? ' text-' + textColor : ''"
                >
                  <slot
                    name="title"
                  >
                    <span
                      v-html="title"
                    />
                  </slot>
                </h2>
              </q-item-label>
              <q-item-label
                v-if="subtitle || !!$slots.subtitle"
                caption
                :class="textColor ? ' text-' + textColor : ''"
              >
                <div
                  class="text-subtitle1"
                >
                  <slot
                    name="subtitle"
                  >
                    <span
                      v-html="subtitle"
                    />
                  </slot>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <section
          v-if="!!$slots.default"
          :class="`${ noPadding ? '' : `q-pt-lg q-pl-${ padding } q-pr-${ padding } q-pb-${ padding }` } ${ textColor ? 'text-' + textColor : ''}`"
        >
          <slot />
        </section>
      </section>
    </div>
  </section>
</template>

<script>
export default {
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
    icon: {
      type: String,
      required: false,
      default: null,
    },
    iconColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    textColor: {
      type: String,
      required: false,
      default: null,
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: String,
      required: false,
      default: 'col-lg-8 col-sm-10 col-xs-12',
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    cover: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  computed: {
    padding: function () {
      return 'lg';
      /*
      let padding = '';
      if ( this.$q.screen.gt.lg )
        padding += 'lg';
      if ( this.$q.screen.gt.md )
        padding += 'lg';
      else if ( this.$q.screen.gt.sm )
        padding += 'lg';
      else if ( this.$q.screen.gt.xs )
        padding += 'lg';
      else
        padding += 'lg';

      return padding;
     */
    },
  },
};
</script>

<style>
</style>
