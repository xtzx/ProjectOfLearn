// //webpack.config.js
// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 use: ['babel-loader'],
//                 exclude: /node_modules/, //排除 node_modules 目录
//             },
//         ],
//     },
// };
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];

module.exports = {
    // mode: 'development',
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    corejs: 3,
                                },
                            ],
                        ],
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        //数组 放着所有的webpack插件
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     filename: 'index.html', //打包后的文件名
        //     minify: {
        //         removeAttributeQuotes: false, //是否删除属性的双引号
        //         collapseWhitespace: false, //是否折叠空白
        //     },
        //     // hash: true //是否加上hash，默认是 false
        // }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template,
        }),
    ],
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: 'errors-only', //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: 'silent', //日志等级
        compress: true, //是否启用 gzip 压缩
    },
};
