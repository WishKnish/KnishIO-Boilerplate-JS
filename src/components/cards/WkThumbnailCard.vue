<template>
  <q-card
    :dark="dark"
    class="cursor-pointer"
    bordered
  >
    <q-img
      :src="card.cover"
      :ratio="5/4"
      :class="`bg-gradient-down ${ dark ? 'bg-grey-10' : 'bg-white' }`"
    >
      <a
        v-if="card.link"
        :href="card.link"
        class="block fit bg-transparent"
        target="_blank"
      />
      <q-item
        class="absolute-top-left bg-transparent hover-show"
        :dark="dark"
        dense
      >
        <q-item-section>
          <div
            class="row q-gutter-sm"
          >
            <wk-button
              v-if="loggedIn"
              :outline="false"
              :tooltip="faveTooltip"
              :color="faveColor"
              :icon="faveIcon"
              size="sm"
              round
              @click="faveAction"
            />
            <wk-button
              :outline="false"
              :tooltip="$t( 'ux.common.share' )"
              icon="fal fa-share-alt"
              color="accent"
              size="sm"
              round
              @click="shareAction"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-img>
    <div
      v-if="ribbon"
      class="ribbon"
    >
      <span
        v-html="ribbon"
      />
    </div>
    <div>
      <q-item
        :dark="dark"
        dense
      >
        <q-item-section>
          <q-item-label
            v-html="card.title"
          />
        </q-item-section>
      </q-item>
      <q-item
        v-if="card.description"
        :dark="dark"
        class="q-pb-md"
        dense
      >
        <q-item-section
          class="q-pr-sm"
          style="min-width: 0 !important;"
          avatar
        >
          <q-avatar
            color="primary"
            text-color="white"
            size="2em"
          >
            <q-icon
              name="fal fa-external-link-alt"
            />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label
            lines="2"
            caption
            v-html="card.description"
          />
        </q-item-section>
      </q-item>
    </div>
    <q-tooltip
      v-if="tooltip"
      content-class="bg-accent"
      max-width="300px"
    >
      <span
        v-html="tooltip"
      />
    </q-tooltip>
  </q-card>
</template>

<script>

import vuex from 'src/mixins/vuex';
import WkButton from 'components/WkButton';
import application from 'src/mixins/application';

export default {
  components: {
    WkButton,
  },
  mixins: [
    application,
    vuex,
  ],
  props: {
    card: {
      type: Object,
      required: true,
    },
    ribbon: {
      type: String,
      required: false,
      default: null,
    },
    tooltip: {
      type: String,
      required: false,
      default: null,
    },
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {};
  },
  computed: {
    isFavorite () {
      return this.cardIsFavorite( this.card );
    },
    faveTooltip () {
      return this.isFavorite ? this.$t( 'ux.common.unfavorite' ) : this.$t( 'ux.common.favorite' );
    },
    faveColor () {
      return this.isFavorite ? 'primary' : 'grey';
    },
    faveIcon () {
      return this.isFavorite ? 'fas fa-heart' : 'fal fa-heart';
    },
  },
  methods: {
    faveAction () {
      this.toggleFavoriteCard( this.card );
    },
    shareAction () {
      this.share( this.card.url );
    },
  },
};
</script>

<style>
</style>
