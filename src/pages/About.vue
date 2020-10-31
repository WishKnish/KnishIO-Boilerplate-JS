<template>
  <section>
    <wk-page-content
      :title="trans( 'pages.about.header.title' )"
      icon="fal fa-question-circle"
    >
      <div
        v-html="trans( 'pages.about.content' )"
      />
    </wk-page-content>
  </section>
</template>

<style>
</style>

<script>
import WkPageContent from 'components/layout/page/WkPageContent';
import application from 'src/mixins/application';

export default {
  components: {
    WkPageContent,
  },
  mixins: [
    application,
  ],
  props: {},
  data () {
    return {
      pageTitle: this.trans( 'pages.about.header.title' ),
    };
  },
  computed: {},
  methods: {},
};
</script>
