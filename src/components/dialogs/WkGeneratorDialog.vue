<template>
  <wk-dialog
    :bar="$t( 'dialogs.generator.bar' )"
    :header="`${ wallet.token } ${ $t( 'dialogs.generator.header' ) }`"
    icon="fal fa-info-circle"
  >
    <q-card-section>
      <div
        class="row q-col-gutter-md"
      >
        <div
          class="col-xs-12 col-sm-6"
        >
          <div
            class="bg-white q-pa-lg"
          >
            <qrcode-vue
              :value="jsonString"
              size="100%"
              level="H"
              render-as="svg"
            />
          </div>
        </div>
        <div
          class="col-xs-12 col-sm-6"
        >
          <q-item
            v-if="moleculeData.token"
            :dark="dark"
            class="q-pt-none"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="fal fa-coin"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-html="$t( 'dialogs.generator.token' )"
              />
              <q-item-label
                caption
                v-html="moleculeData.token"
              />
            </q-item-section>
          </q-item>
          <q-item
            :dark="dark"
            class="q-pt-none"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="fal fa-wallet"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                v-html="$t( 'dialogs.generator.balance' )"
              />
              <q-item-label
                caption
              >
                {{ wallet.balance || numberWithCommas }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-clipboard="wallet.bundle"
            :dark="dark"
            class="q-pt-none"
            clickable
            @click="notify( $q.notify, $t( 'ux.notifications.clipboard' ) )"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="fal fa-copy"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t( 'dialogs.generator.bundle' ) }}
              </q-item-label>
              <q-item-label
                caption
              >
                {{ wallet.bundle | truncateMiddle }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="moleculeData.address"
            v-clipboard="moleculeData.address"
            :dark="dark"
            class="q-pt-none"
            clickable
            @click="notify( $q.notify, $t( 'ux.notifications.clipboard' ) )"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="fal fa-copy"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t( 'dialogs.generator.address' ) }}
              </q-item-label>
              <q-item-label
                caption
              >
                {{ moleculeData.address | truncateMiddle }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="moleculeData.position"
            v-clipboard="moleculeData.position"
            :dark="dark"
            class="q-pt-none"
            clickable
            @click="notify( $q.notify, $t( 'ux.notifications.clipboard' ) )"
          >
            <q-item-section
              avatar
            >
              <q-icon
                name="fal fa-copy"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ $t( 'dialogs.generator.position' ) }}
              </q-item-label>
              <q-item-label
                caption
              >
                {{ moleculeData.position | truncateMiddle }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </wk-dialog>
</template>

<script>
import notifies from 'src/mixins/notifies';
import WkDialog from 'components/dialogs/WkDialog';
import QrcodeVue from '@wishknish/qrcode.vue';
import application from 'src/mixins/application';

export default {
  components: {
    WkDialog,
    QrcodeVue,
  },
  mixins: [
    application,
    notifies,
  ],
  props: {
    wallet: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      moleculeData: {},
    };
  },
  computed: {
    jsonString () {
      const jsonString = `${ this.appUri }${ this.$router.resolve( { name: 'scan', } ).href }?scan=${ btoa( JSON.stringify( this.moleculeData ) ) }`;
      return jsonString.replace( '#', '' );
    },
  },
  mounted: function () {
    this.moleculeData = {
      token: this.wallet.token,
      bundle: this.wallet.bundle,
    };

    // If the wallet is not remote, we need to triangulate
    if ( !this.wallet.remote ) {
      this.moleculeData.address = this.wallet.address;
      this.moleculeData.position = this.wallet.position;
    }

    this.notify( this.$q.notify, 'QR code generated. Get scanned to receive tokens.', 'success' );
  },
  methods: {},
};
</script>

<style>
.qr canvas {
  width: 100%;
}
</style>
