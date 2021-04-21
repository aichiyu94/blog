const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    // app.use( proxy(标识符,配置))
    app.use(createProxyMiddleware('/img', {
        target: process.env.REACT_APP_IMG_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/img/': '/img/'
        }
    }))
}