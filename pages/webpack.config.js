const path = require('path');

module.exports = {
  entry: './index.js', // Change this to the entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'), // Change this to the output directory of your build
    filename: 'bundle.js', // Change this to the output bundle filename
  },
  module: {
    rules: [
      // ... other rules ...
      {
        test: /\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/', // Set the output path where the pdf will be stored in the build directory
          },
        },
      },
    ],
  },
};
