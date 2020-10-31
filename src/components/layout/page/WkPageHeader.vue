<template>
  <section
    :style="`background: url(${ background });`"
  >
    <q-parallax
      :class="`bg-gradient-up ${ noShadow ? '' : 'shadow-up-10' }`"
      :speed="(!noVideo && hasVideo) || $q.screen.xs ? 0 : 1"
      :height="height"
      :src="!noVideo && hasVideo ? null : poster"
    >
      <template
        v-slot:content="scope"
      >
        <div
          :class="`fit column inset-shadow ${ verticalAlignmentClass } ${ horizontalAlignmentClass } ${ gradient ? 'bg-gradient' : '' }`"
          :style="darken ? `background: rgba(${ darkenColor }, ${ darken });` : ''"
        >
          <slot />
        </div>
      </template>
      <slot
        v-if="!noVideo && hasVideo"
        name="parallax"
      >
        <video
          slot="media"
          :poster="poster"
          autoplay
          loop
          muted
        >
          <source
            v-if="webm"
            type="video/webm"
            :src="webm"
          >
          <source
            v-if="mp4"
            type="video/mp4"
            :src="mp4"
          >
        </video>
      </slot>
    </q-parallax>
  </section>
</template>

<script>
export default {
  components: {},
  props: {
    noVideo: {
      type: Boolean,
      required: false,
      default: false,
    },
    noShadow: {
      type: Boolean,
      required: false,
      default: false,
    },
    darken: {
      type: Number,
      required: false,
      default: 0.5,
    },
    darkenColor: {
      type: String,
      required: false,
      default: '0, 0, 0',
    },
    gradient: {
      type: Boolean,
      required: false,
      default: null,
    },
    background: {
      type: String,
      required: false,
      default: null,
    },
    webm: {
      type: String,
      required: false,
      default: null,
    },
    mp4: {
      type: String,
      required: false,
      default: null,
    },
    poster: {
      type: String,
      required: false,
      default: 'statics/bgs/transparent.png',
    },
    height: {
      type: Number,
      required: false,
      default: 250,
    },
    verticalAlign: {
      type: String,
      required: false,
      default: 'center',
    },
    horizontalAlign: {
      type: String,
      required: false,
      default: 'center',
    },
  },
  data () {
    return {};
  },
  computed: {
    hasVideo: function () {
      return this.webm || this.mp4;
    },
    verticalAlignmentClass: function () {
      switch ( this.verticalAlign ) {
        default:
          return 'justify-center';

        case 'top':
          return 'justify-start';

        case 'bottom':
          return 'justify-end';
      }
    },
    horizontalAlignmentClass: function () {
      switch ( this.horizontalAlign ) {
        default:
          return 'content-center';

        case 'left':
          return 'content-start';

        case 'right':
          return 'content-end';
      }
    },
  },
  mounted () {
  },
  methods: {},
};
</script>
<style>
</style>
