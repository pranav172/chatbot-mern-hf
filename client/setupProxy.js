const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Proxy requests that start with /api
    createProxyMiddleware({
      target: 'http://localhost:5001', // Your backend server address
      changeOrigin: true,
    })
  );
};