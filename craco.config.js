const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
        path: require.resolve('path-browserify'),
      };

      return webpackConfig;
    },
  },
};
