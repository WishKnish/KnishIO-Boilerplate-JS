<template>
  <div
    :class="size + ' self-center q-pa-sm'"
    @mouseenter="actionsShowing = true"
    @mouseleave="actionsShowing = false"
  >
    <q-card
      class="hover-zoom"
    >
      <q-img
        :src="cardAvatar"
        :title="cardName"
        ratio="1"
        class="fit cursor-pointer"
        cover
      >
        <transition
          appear
          enter-active-class="animated slideInUp"
          leave-active-class="animated slideOutDown"
        >
          <div
            v-if="!actionsShowing"
            class="absolute-bottom text-caption"
            style="height: 4em; padding-top: 4px; padding-bottom: 4px;"
          >
            <div
              class="row items-center"
            >
              <div
                class="text-no-wrap"
              >
                <strong v-html="cardName" />
                <div
                  :style="{'font-size': $q.screen.gt.xs ? 'inherit' : '10px'}"
                >
                  Bundle: {{ cardBundle | truncateMiddle }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </q-img>
    </q-card>
  </div>
</template>

<script>
import { AVATAAARS_OPTIONS, } from 'src/constants/defaults';

export default {
  components: {},
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
      default: null,
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    bundleHash: {
      type: String,
      required: false,
      default: null,
    },
    size: {
      type: String,
      required: false,
      default: 'col-lg-3 col-md-3 col-sm-4 col-xs-6',
    },
  },
  data () {
    return {
      actionsShowing: false,
    };
  },
  computed: {
    cardBundle () {
      if ( this.bundleHash ) {
        return this.bundleHash;
      }

      return this.user ? this.user.bundleHash : null;
    },
    cardName () {
      let name = null;

      if ( this.name ) {
        name = this.name;
      } else if ( this.user ) {
        if ( this.user.metas ) {
          name = this.user.metas.name || this.user.metas.publicName;
        } else {
          name = this.user.name || this.user.publicName;
        }

        return name || this.$t( 'ux.user.guest' );
      }

      return this.$t( 'ux.user.guest' );
    },
    cardAvatar () {
      if ( this.avatar ) {
        return this.avatar;
      }

      let avatar = null;

      if ( this.user ) {
        avatar = this.user.avatar ? this.user.avatar : this.user.metas && this.user.metas.avatar ? this.user.metas.avatar : null;
      }

      if ( !avatar ) {
        avatar = 'https://avatars.dicebear.com/v2/avataaars/';
        avatar += this.cardBundle;
        avatar += `.svg?${ AVATAAARS_OPTIONS }`;
      }

      return avatar;
    },
  },
  methods: {},
};
</script>

<style>
</style>
