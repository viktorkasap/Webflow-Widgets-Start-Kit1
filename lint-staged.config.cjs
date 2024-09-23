module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json}': [
    'prettier --write src',
    'eslint --fix src',
    () => 'tsc -p tsconfig.json --noEmit', // показывает ошибки но в терминале нет ссылки на файл с ошибкой
  ],
  'src/**/*.{css,scss}': ['stylelint --fix'],
  '*.html': ['prettier --write'],
};
