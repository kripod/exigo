const baseConfig = require('../.eslintrc');

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    ...baseConfig.extends.filter(name => !name.includes('airbnb')),
    'prettier/react',
  ],
  env: {
    browser: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
