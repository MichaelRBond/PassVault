const rootWebPack = require('../webpack.config.js');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  rootWebPack.module.rules.forEach((r) => {
    config.module.rules.push(r);
  });


  rootWebPack.resolve.extensions.forEach((e) => {
    config.resolve.extensions.push(e);
  });

  return config;
};
