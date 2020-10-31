<template>
  <section>
    <wk-page-content
      :title="trans( 'pages.about.header.title' )"
      icon="fal fa-question-circle"
    >
      <p
        v-html="trans( 'pages.about.content1' )"
      />
      <p
        class="text-bold"
        v-html="trans( 'pages.about.principles.title' )"
      />
      <q-list
        class="q-pb-md"
      >
        <q-item
          v-for="(item, itemCount) in trans( 'pages.about.principles.items' )"
          :key="itemCount"
        >
          <q-item-section
            side
          >
            <q-avatar
              color="primary"
              text-color="white"
            >
              {{ itemCount + 1 }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              v-html="item"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <p
        v-html="trans( 'pages.about.content2' )"
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
      pageTitle: this.trans( 'pages.about.intro.title' ),
    };
  },
  computed: {},
  methods: {},
};
</script>
