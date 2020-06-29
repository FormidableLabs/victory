export default () => ({
  webpack: config => {
    // react-static's config.resolve.modules field is causing issues with
    // the correct node_module resolution, so we fix that here
    // https://github.com/react-static/react-static/issues/1423
    config.resolve.modules = [
      ...config.resolve.modules.filter(mod => !mod.endsWith("node_modules")),
      "node_modules"
    ];

    return config;
  }
});
