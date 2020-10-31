<template>
  <q-menu
    :transition-show="transitions.in"
    :transition-hide="transitions.out"
    separate-close-popup
  >
    <q-item
      v-for="(lang, key) in languages"
      :key="key"
      v-close-popup
      clickable
      @click="setLanguage( key )"
    >
      <q-item-section
        avatar
      >
        <country-flag
          :country="lang.flag"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label
          v-html="lang.label"
        />
      </q-item-section>
    </q-item>
  </q-menu>
</template>
<script>
import CountryFlag from 'vue-country-flag';
import knishio from 'src/mixins/knishio';
import application from 'src/mixins/application';
import vuex from 'src/mixins/vuex';

export default {
  components: {
    CountryFlag,
  },
  mixins: [
    knishio,
    application,
    vuex,
  ],
  props: {},
  data () {
    return {};
  },
  computed: {},
};
</script>
