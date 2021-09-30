module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'postcss-nested',
    ['postcss-custom-properties', { preserve: false }],
    'postcss-hexrgba',
    'autoprefixer'
  ]
}
