module.exports = {
    extends: ['airbnb-base', './scripts/eslint/index.js'],
    plugins: ['import'],
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': 'webpack',
    },
    rules: {
        strict: 'error',
    },
};
