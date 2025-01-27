const baseConfig = require("../../webpack/webpack.config.js");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  ...baseConfig,
  plugins: [
    ...(baseConfig.plugins || []),
    new CopyPlugin({
      patterns: [
        { from: "hardhat.config.ts", to: "." },
        { from: "contracts", to: "contracts" },
        { from: "artifacts", to: "artifacts" },
      ],
    }),
  ],
};
