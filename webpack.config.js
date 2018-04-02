
/*

    https://stanko.github.io/webpack-babel-react-revisited/

    ./node_modules/webpack/bin/webpack.js ./src/js/app.js --output-filename ./dist/app.bundle.js

*/

// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import our plugin -> ADDED IN THIS STEP


// define out paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js')
};

// Webpack config
module.exports = {
    mode: 'development',
    entry: path.join(paths.JS, 'app.js'),
    output: {
        path: paths.DIST,
        filename: 'app.bundle.js'
    },

    // Tell webpack to use html plugin 
    // index.html is used as a template in which it'll inject bundled app.
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'index.html'),
        }),
    ],

    // Loaders configuration
    // We are telling webpack to use "babel-loader" for .js and .jsx files
    module: {
        rules: [
            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                'babel-loader',
            ],
            },
        ],
    },

    // Enable importing JS files without specifying their's extenstion
    //
    // So we can write:
    // import MyComponent from './my-component';
    //
    // Instead of:
    // import MyComponent from './my-component.jsx';
    resolve: {
        extensions: ['.js', '.jsx'],
    },


    // UNUSED
    // Dev server configuration -> REMOVED IN FAVOUR OF HtmlWebpackPlugin
    // Now it uses our "src" folder as a starting point
    // devServer: {
    //     contentBase: paths.SRC,
    // },
}