<template>
  <wk-dialog
    :bar="$t( 'dialogs.login.bar' )"
    :header="$t( 'dialogs.login.header' )"
    icon="fa fa-info-circle"
    no-padding
  >
    <wk-login-form />
  </wk-dialog>
</template>

<script>
import WkDialog from 'components/dialogs/WkDialog';
import WkLoginForm from 'components/forms/WkLoginForm';

export default {
  components: {
    WkLoginForm,
    WkDialog,
  },
  mixins: [],
  data () {
    return {};
  },
  computed: {},

  methods: {},
};
</script>

<style>
</style>
