const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function expressMiddleware(router) {
  router.use("/auth/**", createProxyMiddleware({
    target: "https://aureadev.tecna.pl/",
    changeOrigin: true
  }))

  router.use('/api', createProxyMiddleware({
    target: "https://aureadev.tecna.pl/",
    changeOrigin: true,
  }))
}
