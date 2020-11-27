<template>
  <q-card
    class="bg-tiling-dark inset-shadow"
    style="max-width: 100vw"
    bordered
  >
    <q-item
      clickable
      dark
      @click="clipAction"
    >
      <q-item-section
        avatar
      >
        <q-avatar
          color="primary"
          text-color="white"
        >
          <q-icon
            name="fa fa-paperclip"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section
        class="overflow-auto"
      >
        <q-item-label
          overline
        >
          Example Code:
        </q-item-label>
        <VueShowdown
          :markdown="markdownExample"
          flavor="github"
        />
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
import notifies from 'src/mixins/notifies';

export default {
  mixins: [
    notifies,
  ],
  props: {
    example: {
      type: String,
      required: true,
    },
  },
  computed: {
    markdownExample () {
      return `\`\`\`
${ this.example }
\`\`\``;
    },
  },
  methods: {
    clipAction () {
      this.$clipboard( this.example );
      this.notify( this.$q.notify, this.$t( 'ux.notifications.clipboard' ) );
    },
  },
};
</script>

<style>
pre {
  font-size: 80%;
}
</style>
