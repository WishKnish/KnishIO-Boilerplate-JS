<template>
  <wk-dialog
    :bar="$t( 'dialogs.logout.bar' )"
    :header="$t( 'dialogs.logout.header' )"
    icon="fal fa-exclamation-triangle"
  >
    <q-card-section
      class="q-pl-lg q-pr-lg"
    >
      {{ $t( 'dialogs.logout.footer' ) }}
    </q-card-section>
    <template
      v-slot:actions
    >
      <div
        class="text-center"
      >
        <q-btn
          v-close-popup
          color="accent"
          icon="fal fa-sign-out"
          size="md"
          rounded
          outline
          @click="logout()"
        >
          <span
            class="q-pl-sm text-white"
            v-html="$t( 'dialogs.logout.buttons.logout' )"
          />
        </q-btn>
      </div>
    </template>
  </wk-dialog>
</template>

<script>
import WkDialog from 'components/dialogs/WkDialog';
import notifies from 'src/mixins/notifies';

export default {
  components: {
    WkDialog,
  },
  mixins: [
    notifies,
  ],
  data () {
    return {};
  },
  computed: {},
  methods: {
    logout () {
      this.$store
        .dispatch( 'user/LOGOUT', { vm: this, } );
      this.notify( this.$q.notify, this.$t( 'dialogs.logout.success' ), 'success' );
      this.$router
        .push( '/' )
        .catch( err => {
        } );
    },
  },
};
</script>

<style>
</style>
