module.exports = {
  extends: [
    'standard-with-typescript'
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    'multiline-ternary': 'off',
    'block-spacing': 'off',
    'import/first': 'off',
    'quotes': 'off',
    'quote-props': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [1, { 'args': 'none' }],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'react/display-name': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': [0]
  }
}
