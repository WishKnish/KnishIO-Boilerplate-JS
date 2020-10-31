/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */

const path = require( 'path' );
const envparser = require( './src/libraries/config/envparser' );
const fs = require( 'fs' );

module.exports = function ( ctx ) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: [
      'clipboard',
      'faker',
      'filters',
      'i18n',
      'knishio',
      'markdown',
      'moment',
      'quasar-lang-pack',
      'sequential-entrance',
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.styl',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      // 'roboto-font', // optional, you are not bound to it
      // 'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      transpile: true,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      extendWebpack (cfg, { isServer, isClient, }) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        });
      },

      env: envparser(), // Injecting env varibles in process.env
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      host: process.env.KNISHIO_DEV_HOST,
      https: process.env.KNISHIO_DEV_HTTPS === 'true' ? {
        key: process.env.KNISHIO_DEV_HTTPS_KEY ? fs.readFileSync( process.env.KNISHIO_DEV_HTTPS_KEY ) : null,
        cert: process.env.KNISHIO_DEV_HTTPS_CERT ? fs.readFileSync( process.env.KNISHIO_DEV_HTTPS_CERT ) : null,
        ca: process.env.KNISHIO_DEV_HTTPS_CA ? fs.readFileSync( process.env.KNISHIO_DEV_HTTPS_CA ) : null,
        rejectUnauthorized: false,
      } : false,
      port: process.env.KNISHIO_DEV_PORT,
      open: false, // opens browser window automatically
      compress: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      before ( app ) {
        const cors = require( 'cors' );
        app.use( cors() );
      },
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'fontawesome-v5', // requires icon library to be specified in "extras" section
      lang: 'en-us', // Tell Quasar which language pack to use for its own components
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'AppFullscreen',
        'Cookies',
        'Notify',
        'Meta',
      ],

    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: [],
    animations: 'all',

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true,

      manualHydration: false, // (@quasar/app v1.4.2+) Manually hydrate the store
      componentCache: {
        // lru-cache package options,
      },

      // -- @quasar/app v1.9.5+ --
      // optional; add/remove/change properties
      // of production generated package.json
      extendPackageJson (pkg) {
        // directly change props of pkg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; webpack config Object for
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      extendWebpack (cfg) {
        // directly change props of cfg;
        // no need to return anything
      },

      // -- @quasar/app v1.5+ --
      // optional; EQUIVALENT to extendWebpack() but uses webpack-chain;
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      chainWebpack (chain) {
        // chain is a webpack-chain instance
        // of the Webpack configuration
      },
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'InjectManifest', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Knish.IO JavaScript Boilerplate',
        short_name: 'KnishIO-Boilerplate-JS',
        description: 'Sample project for testing and learning about the Knish.IO Javascript SDK.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
};
