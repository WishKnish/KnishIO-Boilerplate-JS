<template>
  <wk-dialog
    :bar="$t( 'dialogs.backup.bar' )"
    :header="$t( 'dialogs.backup.header' )"
    icon="fa fa-wallet"
  >
    <q-item-section
      class="q-pa-md"
    >
      <div
        v-ripple
        v-clipboard="secret"
        class="cursor-pointer relative-position"
        @click="notify( $q.notify, $t( 'ux.notifications.clipboard' ) )"
      >
        <q-input
          :value="secret"
          :label="$t( 'dialogs.backup.secret' )"
          :hint="$t( 'dialogs.backup.hint' )"
          type="textarea"
          class="no-pointer-events"
          dark
          filled
          readonly
        />
      </div>
    </q-item-section>
    <q-item-section
      class="q-pa-md"
      v-html="$t( 'dialogs.backup.footer' )"
    />
  </wk-dialog>
</template>

<script>
import notifies from 'src/mixins/notifies';
import vuex from 'src/mixins/vuex';
import WkDialog from 'components/dialogs/WkDialog';

export default {
  components: { WkDialog, },
  mixins: [
    vuex,
    notifies,
  ],
  data () {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style>
</style>
