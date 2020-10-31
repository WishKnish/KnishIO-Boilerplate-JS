import {
  mapFields,
} from 'vuex-map-fields';

const userFields = [
  'avatar',
  'cover',
  'username',
  'publicName',

  'metas',
  'bundleObject',
  'initialized',
  'loggedIn',
  'createdAt',

  'secret',
  'bundle',
];

const uxFields = [
  'headerHeight',
  'errorState',
  'scrollDisabled',
  'scrollY',

  'logoutDialogOpen',
  'backupDialogOpen',
  'restoreDialogOpen',
  'registerDialogOpen',
  'loginDialogOpen',
  'sendDialogOpen',
  'sendDialogMoleculeData',
  'thumbnailDialogOpen',
  'thumbnailDialogCover',
  'thumbnailDialogVideo',
  'qrDialogOpen',
  'qrWallet',
  'drawerOpen',
];

const walletFields = [
  'wallets',
  'shadowWallets',
];

export default {
  computed: {
    ...mapFields( 'user', userFields ),
    ...mapFields( 'ux', uxFields ),
    ...mapFields( 'wallet', walletFields ),
  },
};
