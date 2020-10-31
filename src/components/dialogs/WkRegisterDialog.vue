<template>
  <wk-dialog
    :bar="$t( 'dialogs.register.bar' )"
    :header="$t( 'dialogs.register.header' )"
    icon="fal fa-user-plus"
    no-padding
  >
    <wk-register-form
      @onboard="onboard(false)"
    />
  </wk-dialog>
</template>

<script>
import WkRegisterForm from 'components/forms/WkRegisterForm';
import WkDialog from 'components/dialogs/WkDialog';

export default {
  components: {
    WkDialog,
    WkRegisterForm,
  },
  mixins: [],
  props: {},
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
