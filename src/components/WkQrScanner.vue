<template>
  <section>
    <q-item
      :dark="dark"
    >
      <q-item-section
        v-if="$q.screen.gt.xs"
        avatar
      >
        <q-avatar
          color="secondary"
          text-color="white"
          rounded
        >
          <q-icon
            name="fal fa-question"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label
          caption
        >
          How to scan a recipient QR code
        </q-item-label>
        <q-item-label
          v-if="error"
        >
          Press the button below to open your Camera. Take a picture of the QR code provided to you by the recipient and
          then
          <span class="platform-ios-only">
            press "use photo".
          </span>
          <span class="platform-ios-hide">
            press
            <q-icon
              name="fal fa-check-circle"
            />.
          </span>
        </q-item-label>
        <q-item-label
          v-else
        >
          Point your camera at the QR code provided to you by the recipient, and it will be automatically read.
        </q-item-label>
      </q-item-section>
    </q-item>

    <div v-if="showCamera">
      <qrcode-drop-zone
        @detect="onDetect"
        @init="logErrors"
      >
        <div
          v-if="!error"
        >
          <qrcode-stream
            class="q-pa-lg"
            @detect="onDetect"
            @init="onInit"
          />
        </div>
      </qrcode-drop-zone>
      <div
        v-if="error"
        class="q-mt-md"
      >
        <qrcode-capture
          cta
          @detect="onDetect"
        />
      </div>
    </div>
    <div
      v-if="!showCamera"
      class="text-center"
    >
      <q-banner
        class="bg-negative text-white q-mb-md"
        :dark="dark"
      >
        <template
          v-slot:avatar
        >
          <q-icon
            name="fal fa-camera"
          />
        </template>
        <q-btn
          label="Camera is off! Click here to turn on."
          color="primary"
          text-color="white"
          size="lg"
          @click="testCamera"
        />
      </q-banner>

      <p>
        {{ error }}
      </p>
      <p>Let's try another way:</p>

      <qrcode-capture
        @detect="onDetect"
      />
    </div>

    <q-dialog
      v-model="cameraRequestDialogOpen"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
      :maximized="$q.screen.lt.sm"
      no-esc-dismiss
    >
      <wk-camera-request-dialog
        @approved="turnCameraOn"
      />
    </q-dialog>
  </section>
</template>

<script>
import { QrcodeDropZone, QrcodeStream, QrcodeCapture, } from 'vue-qrcode-reader';
import WkCameraRequestDialog from './dialogs/WkCameraRequestDialog';
import notifies from 'src/mixins/notifies';
import vuex from 'src/mixins/vuex';
import application from 'src/mixins/application';

export default {
  components: {
    WkCameraRequestDialog,
    QrcodeDropZone,
    QrcodeStream,
    QrcodeCapture,
  },
  mixins: [
    notifies,
    vuex,
    application,
  ],
  props: {
    wallet: {
      type: Object,
      required: false,
      default: null,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      camera: 'auto',
      result: null,
      cameraRequestDialogOpen: false,
      showCamera: false,
      error: null,
    };
  },
  computed: {},
  mounted () {
    console.log( 'WkQrScanner:mounted(): Starting mounted hook...' );
    this.testCamera();
    console.log( 'WkQrScanner:mounted(): Completed mounted hook...' );
  },
  methods: {
    logErrors ( promise ) {
      promise.catch( console.error );
    },
    async onInit ( promise ) {
      // show loading indicator
      try {
        console.log( 'WkQrScanner:onInit(): Awaiting initialization...' );
        await promise;
        // successfully initialized
      } catch ( error ) {

        console.log( `WkQrScanner:onInit(): Error captured: ${ error }` );

        // Сamera enable bug in all browsers except Safari in IOS
        if ( this.$q.platform.is.platform === 'mac' && this.$q.platform.is.name !== 'safari' ) {
          this.error = 'Sorry, but we don\'t have access to the camera in this browser. <p>You can use Safari to scan a QR code.</p>';
        } else if ( error.name === 'NotAllowedError' ) {
          // user denied camera access permisson
          this.error = 'Permission to the camera has not been granted!';
          this.cameraRequestDialogOpen = true;
        } else if ( error.name === 'NotFoundError' ) {
          // no suitable camera device installed
          this.error = 'No suitable camera device was found!';
        } else if ( error.name === 'NotSupportedError' ) {
          // page is not served over HTTPS (or localhost)
          this.error = 'App is running over an insecure medium!';
        } else if ( error.name === 'NotReadableError' ) {
          // maybe camera is already in use
          this.error = 'Unable to gain access to the camera. Is it in use?';
          this.cameraRequestDialogOpen = true;
        } else if ( error.name === 'OverconstrainedError' ) {
          // did you requested the front camera although there is none?
          this.error = 'The selected camera does not appear to exist!';
        } else if ( error.name === 'StreamApiNotSupportedError' ) {
          // browser seems to be lacking features
          this.error = 'Camera streaming is unavailable on your device!';
        } else {
          this.error = error;
        }
      } finally {
        // hide loading indicator
      }
    },
    async onDetect ( promise ) {
      try {
        const {
          imageData, // raw image data of image/frame
          content, // decoded String or null
          location, // QR code coordinates or null
        } = await promise;

        if ( content === null ) {
          // Nothing found
          this.notify( this.$q.notify, 'The image did not contain a valid QR code!', 'negative' );

        } else {

          console.log( 'WkQrScanner:onDetect(): Content detected...' );

          try {
            let jsonContent = content;
            // URL format
            if ( this.urlPattern.test( jsonContent ) ) {
              let temporaryLink = document.createElement( 'a' );
              temporaryLink.href = jsonContent;
              jsonContent = atob( temporaryLink.search.substr( 6 ) );
            }
            this.result = JSON.parse( jsonContent );
          } catch ( exception ) {
            // this.error = 'Scanned QR code contains invalid information!';

            console.log( `WkQrScanner:onDetect(): Scanned QR code contained invalid information: ${ content }` );
          }

          if ( this.result ) {
            if ( !this.result.token || this.result.token === this.wallet.token ) {
              console.log( 'WkQrScanner:onDetect(): Emitting result...' );
              this.$emit( 'scan', this.result );
            } else {
              if ( this.$q.screen.gt.xs ) {
                this.notify( this.$q.notify, 'The recipient wallet\'s token is different from the current wallet.', 'negative' );
              }
            }
          }
        }
      } catch ( error ) {
        console.log( `WkQrScanner:onDetect(): Error captured: ${ error }` );
        this.error = error;
      }
    },
    async turnCameraOn () {
      console.log( 'WkQrScanner:turnCameraOn(): Turning camera on...' );
      this.cameraRequestDialogOpen = false;
      this.camera = 'auto';
      this.showCamera = true;
    },
    turnCameraOff () {
      console.log( 'WkQrScanner:turnCameraOff(): Turning camera off...' );
      this.camera = 'off';
      this.showCamera = false;
    },
    async testCamera () {
      console.log( 'WkQrScanner:testCamera(): Testing for Cordova...' );
      const cordova = this.$q.cordova;
      if ( cordova ) {
        console.log( 'WkQrScanner:testCamera(): Cordova detected...' );
        try {
          console.log( 'WkQrScanner:testCamera(): Testing for authorization...' );
          cordova.plugins.diagnostic.isCameraAuthorized( {
            successCallback: ( status ) => {
              console.log( `WkQrScanner:testCamera(): Authorization test successful with result ${ status }` );
              if ( status ) {
                this.turnCameraOn();
              } else {
                this.turnCameraOff();
                this.cameraRequestDialogOpen = true;
              }
            },
            errorCallback: ( error ) => {
              console.error( `WkQrScanner:testCamera(): The following error occurred in authorization test: ${ error }` );
              this.error = error;
              this.turnCameraOff();
            },
            externalStorage: true,
          } );
        } catch ( error ) {
          console.error( `WkQrScanner:testCamera(): The following error occurred in isCameraAuthorized: ${ error }` );
          this.error = error;
        }
      } else {
        console.log( 'WkQrScanner:testCamera(): Cordova not detected...' );
        this.turnCameraOn();
      }
    },
  },
};
</script>

<style>
</style>
