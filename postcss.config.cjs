module.exports = {
  plugins: {
    'postcss-import': {}, // https://github.com/postcss/postcss-import
    'postcss-mixins': {}, // https://github.com/postcss/postcss-mixins
    'postcss-nested': {}, // https://github.com/postcss/postcss-nested
    'postcss-simple-vars': {}, // https://github.com/postcss/postcss-simple-vars
    'postcss-color-function': {}, // https://github.com/postcss/postcss-color-function
    'postcss-preset-env': {
      // https://github.com/csstools/postcss-preset-env
      autoprefixer: { grid: 'autoplace' },
      stage: 0, // includes all new features of CSS
    },
  },
};
