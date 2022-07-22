const path = require("path");
const {getDefaultConfig} = require("expo/metro-config");
const blacklist = require("metro-config/src/defaults/exclusionList");
const escape = require("escape-string-regexp");
const glob = require('glob');
const fs = require('fs');

/**
 * Metro does not support symlinks. When resolving dependencies, we need to make
 *  sure Metro is looking for dependencies _here_ and not in the package repos'
 *  node_modules folders (which will contain pnpm symlinks)
 *
 * We generate a list of all deps used in victory packages, and use that below.
 */
const PKGS = path.resolve(__dirname, "../../packages")
const VICTORY_DEPS = Array.from(
  glob.sync(path.join(PKGS, "victory*/package.json"))
    .map(p => JSON.parse(fs.readFileSync(p, 'utf8')))
    .map(pkg => Object.keys(pkg.dependencies || {}))
    .reduce((set, depNames) => {
      depNames.forEach(name => set.add(name));
      return set;
    }, new Set())
);

/**
 * Reference to root of monorepo
 */
const root = path.resolve(__dirname, "../..");

/**
 * We're going to extend default expo config
 */
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Along with our standard app directory, we're also going to watch the root!
 * This allows us to make changes to the victory packages and get live refresh here.
 */
defaultConfig.watchFolders = [root];

/**
 * Misc transform options.
 */
defaultConfig.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

/**
 * Ensuring we only use one version of some shared deps, like React.
 * Using multiple versions of React causes errors.
 * We want to ignore root/package-level instances, and only use the local ones here.
 */
const modules = ["react", "react-native-svg", ...VICTORY_DEPS];
defaultConfig.resolver.blacklistRE = blacklist(
  modules.map(
    (m) => new RegExp(`^${escape(path.join(root, "node_modules", m))}\\/.*$`),
  ),
);
defaultConfig.resolver.extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, "node_modules", name);
  return acc;
}, {});

module.exports = defaultConfig;
