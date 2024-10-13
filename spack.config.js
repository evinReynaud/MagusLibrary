const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    // web: __dirname + "/src/index.ts",
    web: __dirname + "/lib/main/index.js",
  },
  output: {
    path: __dirname + "/lib/spack",
  },
});
