const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target : 'node',
    externals: [nodeExternals()],   
    mode : 'production',
    
    optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              mangle: false,
              compress: {
                keep_classnames: true,
                keep_fnames: true,
              },
            }
          })
        ]
      },
}