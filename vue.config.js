const host = "localhost";
const port = 4000;
const baseUrl = "/";
const outputDir = "dist";
const assertDir = "static";
const path = require("path");
const proxy = {
    "/api": {
        target: "http://gh.yixiuhuo.com",
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,// proxy websockets
        logLevel: 'debug',
    }
};

module.exports = {
    publicPath: baseUrl,
    outputDir: outputDir,
    assetsDir: assertDir,
    devServer: {
        clientLogLevel: "info",
        quiet: true,
        host: host,
        port: port,
        proxy: proxy,
    },
};
