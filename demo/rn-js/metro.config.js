const path = require("path");
const { getDefaultConfig } = require("@expo/metro-config");
const blacklist = require("metro-config/src/defaults/blacklist");
const escape = require("escape-string-regexp");

const root = path.resolve(__dirname, "../..");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.watchFolders = [root];

defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true
  }
});

// Ensuring we only use one version of React
const modules = ["react", "react-native-svg"];
defaultConfig.resolver.blacklistRE = blacklist(
  modules.map(
    (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`)
  )
);
defaultConfig.resolver.extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, "node_modules", name);
  return acc;
}, {});

module.exports = defaultConfig;
