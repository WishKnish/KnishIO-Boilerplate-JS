<template>
  <wk-dialog
    :bar="$t( 'dialogs.restore.bar' )"
    :header="$t( 'dialogs.restore.header' )"
    icon="fa fa-info-circle"
    no-padding
  >
    <wk-restore-form />
  </wk-dialog>
</template>

<script>
import WkRestoreForm from '../forms/WkRestoreForm';
import WkDialog from 'components/dialogs/WkDialog';

export default {
  components: {
    WkDialog,
    WkRestoreForm,
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
