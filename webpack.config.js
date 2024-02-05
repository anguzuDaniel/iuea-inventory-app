module.exports = function (webpackEnv) {
  return {
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'),
        async_hooks: require.resolve('async_hooks/browser'),
        querystring: require.resolve('querystring-es3'),
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        http: require.resolve('stream-http'),
        buffer: require.resolve('buffer/'),
      }
    },
    target: 'web', // Specify the target environment (web for browser)

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  };
};