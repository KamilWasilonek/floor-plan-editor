const withImages = require('next-images');
const withWorkers = require('@zeit/next-workers');
const withCSS = require('@zeit/next-css');
require('dotenv').config();
const webpack = require('webpack');

module.exports = withWorkers(
  withCSS(
      withImages({
        webpack: config => {
          config.node = {
            fs: 'empty'
          }
          const env = Object.keys(process.env).reduce((acc, curr) => {
                   acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
                   return acc;
         }, {});
          /** Allows you to create global constants which can be configured
          * at compile time, which in our case is our environment variables
          */
          config.plugins.push(new webpack.DefinePlugin(env));
          return config
        }
      })
    )
);
