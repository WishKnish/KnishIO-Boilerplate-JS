<template>
  <wk-page-header
    :height="$q.screen.height - 100"
    :darken="0"
    darken-color="255,255,255"
    poster="/statics/videos/street.jpg"
    webm="/statics/videos/street.webm"
  >
    <div
      :class="`column items-center justify-center ${ $q.screen.xs ? 'fit bg-dimmed' : '' }`"
    >
      <q-card
        :square="$q.screen.xs"
        :class="`${ $q.screen.xs ? 'transparent' : 'hover-zoom bg-dimmed q-pl-lg q-pr-lg q-pb-lg q-mb-xl_off' }`"
        dark
        flat
      >
        <q-card-section>
          <div
            class="hover-zoom"
            style="align-content: center;"
          >
            <div
              class="text-center"
            >
              <img
                :title="$t('ux.appTitle' )"
                :style="{ maxHeight: '25vh', }"
                src="statics/branding/icon-white.svg"
              >
            </div>
          </div>
          <q-separator
            spaced
            dark
          />
          <p class="text-faded">
            Sorry, nothing here...<strong>(404)</strong>
          </p>
          <q-btn
            color="primary"
            style="width:200px;"
            @click="$router.go(-1)"
          >
            Go back
          </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </wk-page-header>
</template>

<script>
import WkPageContent from 'components/layout/page/WkPageContent';
import application from 'src/mixins/application';
import WkPageHeader from 'components/layout/page/WkPageHeader';

export default {
  name: 'Error404',
  components: { WkPageHeader, },
  mixins: [
    application,
  ],
};
</script>
