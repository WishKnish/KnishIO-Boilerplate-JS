<template>
  <div
    :class="`flip-container column items-stretch justify-content ${ space } ${ size } ${ extraClass }`"
  >
    <div
      ref="flipContainer"
      class="flipper"
      :style="height ? `min-height: ${ height }px; max-height: ${ height }px;` : ''"
    >
      <q-card
        bordered
        :class="'front fit bg-' + frontColor"
      >
        <div
          class="fit"
          :style="frontBg ? `background-image: url('${ frontBg }'); overflow: hidden; background-size: cover; background-repeat: no-repeat; background-position: center center;` : ''"
        >
          <div
            ref="front"
          >
            <div
              v-if="ribbon"
              :class="`ribbon ${ ribbonColor }`"
            >
              <span
                v-html="ribbon"
              />
            </div>
            <div
              v-if="handleIcon"
              :class="`bg-${ handleColor } handle-container text-white justify-center items-center row`"
            >
              <q-icon
                v-if="handleIcon"
                :name="`${ handleIcon } fa-2x`"
                :color="handleIconColor"
              />
            </div>
            <q-card-section
              v-if="frontIcon || frontTitle"
              :class="`${ (handleIcon ? 'q-ml-xl ' : '') } text-center`"
            >
              <q-icon
                v-if="frontIcon"
                :name="frontIcon + ' fa-3x'"
                :color="frontIconColor"
              />
              <h5
                v-if="frontTitle"
                v-html="frontTitle"
              />
            </q-card-section>
            <q-card-section
              :class="`${ (handleIcon ? 'q-ml-xl ' : '') }`"
            >
              <slot name="front" />
            </q-card-section>
          </div>
        </div>
      </q-card>
      <q-card
        bordered
        :class="`rear fit bg-${ rearColor } ${ rearTextColor ? `text-${ rearTextColor }` : '' }`"
      >
        <div
          ref="rear"
        >
          <q-card-section
            v-if="rearIcon || rearTitle"
            class="text-center"
          >
            <q-icon
              v-if="rearIcon"
              :name="`${ rearIcon } fa-3x`"
              :color="rearIconColor"
            />
            <h5
              v-if="rearTitle"
              v-html="rearTitle"
            />
          </q-card-section>
          <q-card-section
            class="text-center"
          >
            <slot name="rear" />
          </q-card-section>
        </div>
      </q-card>
    </div>
    <q-resize-observer @resize="onResize" />
  </div>
</template>

<script>
export default {
  name: 'WkFlipCard',
  props: {
    ribbon: {
      type: String,
      required: false,
      default: null,
    },
    ribbonColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    handleColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    handleIcon: {
      type: String,
      required: false,
      default: null,
    },
    handleIconColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    frontColor: {
      type: String,
      required: false,
      default: 'grey-2',
    },
    frontBg: {
      type: String,
      required: false,
      default: '',
    },
    frontTitle: {
      type: String,
      required: false,
      default: null,
    },
    frontIcon: {
      type: String,
      required: false,
      default: null,
    },
    frontIconColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    rearTextColor: {
      type: String,
      required: false,
      default: null,
    },
    rearColor: {
      type: String,
      required: false,
      default: 'grey-2',
    },
    rearTitle: {
      type: String,
      required: false,
      default: null,
    },
    rearIcon: {
      type: String,
      required: false,
      default: null,
    },
    rearIconColor: {
      type: String,
      required: false,
      default: 'primary',
    },
    size: {
      type: String,
      required: false,
      default: 'col-lg-6 col-md-6 col-sm-6 col-xs-12',
    },
    space: {
      type: String,
      required: false,
      default: 'q-pa-sm',
    },
    extraClass: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data () {
    return {};
  },
  mounted () {
    this.onResize();
  },
  methods: {
    onResize () {
      const frontHeight = this.$refs.front.clientHeight;
      const rearHeight = this.$refs.rear.clientHeight;
      this.$refs.flipContainer.style.height = `${ Math.max( frontHeight, rearHeight ) }px`;
    },
  },
};
</script>

<style>
.flip-container {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  perspective: 1000;
  -webkit-border-radius: 28px;
  -moz-border-radius: 28px;
  border-radius: 28px;
}

.flip-container:hover .flipper, .flip-container.locked .flipper {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.flipper {
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: relative;
}

.front, .rear {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-border-radius: 28px;
  -moz-border-radius: 28px;
  border-radius: 28px;
}

.front {
  z-index: 2;
  -webkit-transform: rotateY(0);
  -moz-transform: rotateY(0);
  transform: rotateY(0);
}

.rear {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  transform: rotateY(180deg);
}

.handle-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  border-radius: 28px 0 0 28px !important;
}
</style>
