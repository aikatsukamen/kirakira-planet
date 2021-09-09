import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

interface Configuration extends webpack.Configuration {
  devServer?: webpackDevServer.Configuration;
}

const config: Configuration = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'eval-source-map',

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },

  // webpack-dev-serverの設定
  devServer: {
    // contentBase: 'build',
    host: 'localhost',
    open: true,
    hot: true,
  },

  externals: {},
  node: {},
  resolveLoader: {},
  stats: {},
  watchOptions: {},
  entry: ['./src/js/main.ts'],

  output: {
    path: path.resolve(`./build/`),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator'],
        },
      },
      // 画像ファイル
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2015,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          // output: null,
          toplevel: false,
          // nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: true,
          safari10: true,
        },
      }),
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      useTypescriptIncrementalApi: true,
      tsconfig: './tsconfig.json',
      checkSyntacticErrors: true,
      reportFiles: ['src/js/**'],
    }),
    new CopyWebpackPlugin([
      {
        from: './public',
        to: '',
      },
    ]),
    // new GenerateSW({
    //   maximumFileSizeToCacheInBytes: 10000000,
    // }),
  ],
};

export default config;
