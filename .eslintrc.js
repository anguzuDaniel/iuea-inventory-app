module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['standard', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react'],
    extends: [
      "react-app",
      "react-app/jest"
    ],
  };
  