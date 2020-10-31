<template>
  <q-card
    class="q-pa-md"
  >
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="fa fa-camera"
        />
        May we use your camera?
      </div>
    </q-card-section>

    <q-card-section>
      We need access to your camera in order to scan Knish.IO Wallet QR codes, so that you can send tokens to other
      users. This is optional, but will make the process much easier.
    </q-card-section>

    <q-card-actions
      align="right"
      class="text-primary"
    >
      <q-btn
        v-close-popup
        rounded
        label="Cancel"
        size="md"
        @click="$emit('cancel')"
      />
      <q-btn
        rounded
        color="secondary"
        label="Continue"
        size="md"
        @click="$emit('approved')"
      />
    </q-card-actions>
    <wk-inner-loading
      :loading="loading"
    />
  </q-card>
</template>

<script>
import WkInnerLoading from '../layout/WkInnerLoading';

export default {
  components: { WkInnerLoading, },
  data () {
    return {
      loading: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
</style>
