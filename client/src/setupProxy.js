const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:7070',
      changeOrigin: true,
    })
  );

  app.use(
    '/posts',
    createProxyMiddleware({
      target: 'http://localhost:7070',
      changeOrigin: true,
    })
  );
};