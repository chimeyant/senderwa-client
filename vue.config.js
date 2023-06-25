module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.smkn4-kabtangerang.sch.id/",
        changeOrigin: true,
      },
    },
  },
};
