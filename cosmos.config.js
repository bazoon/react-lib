const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    publicPath: 'public',
}

module.exports.webpack = function (webpackConfig) {
    webpackConfig.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    );
    
    webpackConfig.module.rules.push(
        {
            test   : /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }
    );

    webpackConfig.module.rules.push(
        {
            test   : /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                
            ]
        }
    );

    webpackConfig.module.rules.push(
        {
            test: /\.svg$/,
            exclude: /node_modules/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }]
          }
    )


    return webpackConfig;
  };