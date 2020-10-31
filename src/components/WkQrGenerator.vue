<template>
  <q-list>
    <q-expansion-item
      :dark="dark"
      dense
      switch-toggle-side
    >
      <template v-slot:header>
        <q-item
          :style="dark ? 'background-color: white;' : null"
        >
          <qriously
            class="qr"
            :value="jsonString"
            :size="size"
          />
        </q-item>
      </template>
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
    </q-expansion-item>
  </q-list>
</template>

<script>
import notifies from 'src/mixins/notifies';

export default {
  mixins: [ notifies, ],
  props: {
    moleculeData: {
      type: Object,
      required: true,
    },
    wallet: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 1500,
    },
    dark: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      jsonString: null,
    };
  },
  beforeMount () {
    this.jsonString = `${ this.appUri }${ this.$router.resolve( { name: 'tokens', } ).href }?scan=${ btoa( JSON.stringify( this.moleculeData ) ) }`;
    this.jsonString = this.jsonString.replace( '#', '' );
  },
};
</script>

<style>
</style>
