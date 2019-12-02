// https://github.com/vuejs/vue-cli/tree/dev/docs/config

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.BACKEND || 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};
