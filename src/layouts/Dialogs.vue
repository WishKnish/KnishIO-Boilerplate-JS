<template>
  <div>
    <q-dialog
      v-model="registerDialogOpen"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
      :maximized="$q.screen.lt.sm"
    >
      <wk-register-dialog />
    </q-dialog>

    <q-dialog
      v-model="loginDialogOpen"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
      :maximized="$q.screen.lt.sm"
    >
      <wk-login-dialog />
    </q-dialog>

    <q-dialog
      v-model="backupDialogOpen"
      :maximized="$q.screen.lt.sm"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
    >
      <wk-backup-dialog />
    </q-dialog>

    <q-dialog
      v-model="restoreDialogOpen"
      :maximized="$q.screen.lt.sm"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
    >
      <wk-restore-dialog />
    </q-dialog>

    <q-dialog
      v-model="logoutDialogOpen"
      :maximized="$q.screen.lt.sm"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
    >
      <wk-logout-dialog />
    </q-dialog>

    <q-dialog
      v-model="thumbnailDialogOpen"
      :maximized="$q.screen.lt.sm"
      :transition-show="transitions.in"
      :transition-hide="transitions.out"
    >
      <q-img
        v-if="thumbnailDialogCover"
        v-close-popup
        :src="thumbnailDialogCover"
        class="no-shadow"
        style="height: 80vh; max-width: 80vw; width: 80vw;"
        contain
      />
      <div
        v-else-if="thumbnailDialogVideo"
      >
        <q-video
          :src="thumbnailDialogVideo"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script>
import WkBackupDialog from 'components/dialogs/WkBackupDialog';
import WkLogoutDialog from 'components/dialogs/WkLogoutDialog';
import WkRestoreDialog from 'components/dialogs/WkRestoreDialog';
import WkRegisterDialog from 'components/dialogs/WkRegisterDialog';
import WkLoginDialog from 'components/dialogs/WkLoginDialog';
import vuex from 'src/mixins/vuex';
import application from 'src/mixins/application';

export default {
  components: {
    WkLoginDialog,
    WkRegisterDialog,
    WkRestoreDialog,
    WkLogoutDialog,
    WkBackupDialog,
  },
  mixins: [
    vuex,
    application,
  ],
  data () {
    return {};
  },
  computed: {},
  methods: {
    onboard ( redirect ) {
      this.registerDialogOpen = false;
      if ( redirect ) {
        this.$router.push( '/profile' ).catch( err => {
        } );
      }
    },
  },
};
</script>

<style>
</style>
