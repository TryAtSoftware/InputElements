// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebPackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    name: 'Input elements sample',

    entry: './src/__samples__/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',

        // Specifies the base path for all the assets.
        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    devServer: {
        port: 5000,
        static: './src/__samples__',
        hot: true
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json', '.less']
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: './src/__samples__/index.html',
            favicon: './src/__samples__/favicon.ico'
        })
    ],
    ignoreWarnings: [{ module: /@fluentui\/react/ }]
};
