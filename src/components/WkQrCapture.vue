<template lang="html">
  <div>
    <q-input
      v-if="cta"
      id="image"
      v-model="capturedImage"
      type="file"
      name="image"
      accept="image/*"
      capture="environment"
      class="input-xl hover-zoom"
      input-class="inputfile"
      bg-color="secondary"
      outlined
      rounded
      dark
      @change="onChangeInput"
    >
      <q-item
        v-if="$q.screen.gt.xs"
        dark
      >
        <q-item-section
          avatar
        >
          <q-avatar
            size="100px"
          >
            <q-icon
              name="fal fa-camera"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label
            class="text-h5"
            header
          >
            Tap Here to Open Camera
          </q-item-label>
        </q-item-section>
      </q-item>
      <div
        v-else
        class="text-center full-width"
      >
        <q-avatar
          size="100px"
          text-color="white"
        >
          <q-icon
            name="fal fa-camera"
          />
        </q-avatar>
      </div>
    </q-input>
    <q-input
      v-else
      id="image"
      v-model="capturedImage"
      type="file"
      name="image"
      label="Choose a Picture Manually"
      accept="image/*"
      capture="environment"
      standout="bg-info"
      input-class="inputfile"
      rounded
      @change="onChangeInput"
    />
  </div>
</template>

<script>
import notifies from 'src/mixins/notifies';
import Worker from 'worker-loader!vue-qrcode-reader/src/worker/jsqr';
import { imageDataFromFile, } from 'vue-qrcode-reader/src/misc/image-data';
import { scan, } from 'vue-qrcode-reader/src/misc/scanner';

export default {
  mixins: [ notifies, ],

  props: {
    worker: {
      type: Function,
      default: Worker,
    },
    cta: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      capturedImage: null,
    };
  },
  watch: {},
  methods: {
    onChangeInput ( event ) {
      const files = [ ...event.target.files, ];
      const resultPromises = files.map( this.processFile );

      resultPromises.forEach( this.onDetect );
    },

    async processFile ( file ) {
      const imageData = await imageDataFromFile( file );
      return await scan( this.worker, imageData );
    },

    async onDetect ( resultPromise ) {
      this.$emit( 'detect', resultPromise );

      try {
        const { content, } = await resultPromise;

        if ( content !== null ) {
          this.$emit( 'decode', content );
        }
      } catch ( error ) {
        // fail silently
      }
    },
  },
};
</script>
<style>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
