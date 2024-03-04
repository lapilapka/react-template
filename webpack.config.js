const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCsssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode,
    devtool: mode === 'production' ? false : 'eval',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name][contenthash].js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx']
    }, devServer: {
        port: 3000,
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCsssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [MiniCsssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [['postcss-preset-env']]
                        }
                    }
                }, 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|gif|svg|png)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(sa|sc|c)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]',
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            }
        ]

    }
}
