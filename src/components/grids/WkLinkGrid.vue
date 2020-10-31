<template>
  <section>
    <section
      class="q-pl-xl q-pr-xl q-pb-xl q-pt-md"
    >
      <div
        class="row q-col-gutter-md full-width"
      >
        <div
          v-for="(link, linkCount) in sortedLinks"
          :key="linkCount"
          :class="`col-xs-12 col-sm-6 col-md-4 col-lg-2 ${ $q.screen.gt.xs ? 'hover-zoom' : '' }`"
        >
          <wk-thumbnail-card
            :card="link"
            class="thumbnailCard"
          />
        </div>
      </div>
    </section>
    <q-resize-observer
      @resize="setHeight"
    />
  </section>
</template>

<script>
import application from 'src/mixins/application';
import WkThumbnailCard from 'components/cards/WkThumbnailCard';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    WkThumbnailCard,
  },
  mixins: [
    application,
    vuex,
  ],
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    sortedLinks() {
      return this.sortLinks(this.links);
    },
  },
  mounted () {
    this.setHeight();
  },
  methods: {
    setHeight () {
      this.setMaxHeight( 'thumbnailCard' );
    },
    sortLinks( links ){
      return links.sort((a, b) => {
        const aFave = this.cardIsFavorite(a);
        const bFave = this.cardIsFavorite(b);

        if(aFave && bFave) {
          return a.id > b.id ? 1 : -1;
        }

        if(aFave) {
          return -1;
        }

        if(bFave) {
          return 1;
        }

        return a.id > b.id ? 1 : -1;
      });
    },
  },
};
</script>
