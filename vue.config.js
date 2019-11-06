const host = "localhost";
const port = 3000;
const baseUrl = "/";
const outputDir = "dist";
const assertDir = "static";

module.exports = {
    publicPath: baseUrl,
    outputDir: outputDir,
    assetsDir: assertDir,
    devServer: {
        clientLogLevel: 'info',
        quiet: true,
        host: host,
        port: port,
    },
    configureWebpack: {
        entry: "./example/main.ts"
    },
};
