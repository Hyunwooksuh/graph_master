module.exports = function override(config, env) {
  const loaders = config.resolve;

  loaders.fallback = {
    util: require.resolve("util"),
    asset: require.resolve("assert"),
    vm: require.resolve("vm-browserify"),
  };

  return config;
};
