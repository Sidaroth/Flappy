const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
};

module.exports = {
    context: __dirname,
    mode: 'development',
    node: {
        fs: 'empty',
    },
    entry: {
        app: [PATHS.src],
        vendors: Object.keys(pkg.dependencies),
    },
    devtool: 'eval-source-map',
    output: {
        filename: '[name].js',
        path: PATHS.dist,
        publicPath: '/',
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            assets: path.resolve(__dirname, '../assets'),
            styles: path.resolve(__dirname, '../styles'),
            root: path.resolve(__dirname, '../src'),
            math: path.resolve(__dirname, '../src/math'),
            utils: path.resolve(__dirname, '../src/utils'),
            levels: path.resolve(__dirname, '../src/levels'),
            shaders: path.resolve(__dirname, '../src/shaders'),
            components: path.resolve(__dirname, '../src/components'),
        },
    },
    devServer: {
        contentBase: PATHS.dist,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true,
        },
        port: 3001,
        publicPath: 'http://localhost:3001/',
        hot: true,
    },
    module: {
        rules: [
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: 'dashes',
                            localIdentName: '[path][name]__[local]',
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(jpg|png|woff)$/,
                use: 'file-loader',
            },
            {
                test: /\.worker\.js$/,
                use: 'worker-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
            PRODUCTION: JSON.stringify(false),
        }),
        new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Flappy Pig',
            meta: [{ name: 'robots', content: 'noindex,nofollow' }],
            appMountIds: ['content'],
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true,
            },
            mobile: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
};
