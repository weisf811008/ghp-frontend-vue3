import vuetify from 'eslint-config-vuetify'
export default [
  ...vuetify({
    ts: true,
  }),
  {
    rules: {
      '@stylistic/operator-linebreak': 'off',
      'quote-props': 'off',
      '@stylistic/quote-props': 'off',
    },
  },
]
