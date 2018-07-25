module.exports = {
    target: 'electron-main',
    entry: './baseElectron.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  "@babel/preset-stage-3",
                  "@babel/preset-react"
                ]
              }
            }
          },
          {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        }
      ]
    }
  };