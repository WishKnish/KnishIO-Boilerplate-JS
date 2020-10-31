export default {
  data () {
    return {};
  },
  computed: {},
  methods: {
    notify: ( notifier, message, type ) => {
      let color = null;
      if ( !type ) {
        color = 'accent';
      }

      const notifySettings = {
        type: type,
        message: message,
        position: 'bottom-right',
      };

      if ( color ) {
        notifySettings.color = color;
      }

      if ( typeof notifySettings.message === 'object' ) {
        notifySettings.caption = notifySettings.message.caption;
        notifySettings.message = notifySettings.message.message;
      }

      notifier( notifySettings );
    },
  },
};
