module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [
    `plugin:vue/recommended`,
    // 'airbnb-base'
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true
  },

  // add your custom rules here
  rules: {
    'no-param-reassign': 'off',
    // 'import/first': 'off',
    //'import/named': 'error',
    //'import/namespace': 'error',
    //'import/default': 'error',
    //'import/export': 'error',
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    // 'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'vue/no-v-html': 'off',
    'semi': 1,
    'comma-dangle': [ "error", "always" ],
    'spaced-comment': [ "error", "always" ],
    'quotes': [ "error", "single" ],
    'prefer-template': [ "error" ],
    'no-multi-spaces': "error",

    // allow console.log during development only
    'no-console': 'off',
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // TODO: Remove when is https://github.com/babel/babel-eslint/issues/530 fixed
    'template-curly-spacing': 'off',
    // 'template-curly-spacing': [ "error", "always" ],
    indent: 'off',
  }
};
