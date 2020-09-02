module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:wdio/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier', 'wdio'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    // Todo: Create workaround
    'vue/no-v-html': 'off',
    // 'vue/no-template-shadow': 'off'
  },
}
