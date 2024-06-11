module.exports = {
  apps: [
    {
      name: "proxyServer",
      script: "./dist/index.js",
      env: {
        auth_url: "https://auth.hml.caradhras.io",
        api_global: "https://api.global.hml.caradhras.io",
        port: 4010,
      },
    },
  ],
};
