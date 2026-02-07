// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// O arquivo de 'input' deve ser o seu arquivo CSS principal
module.exports = withNativeWind(config, { input: "./index.css" });
