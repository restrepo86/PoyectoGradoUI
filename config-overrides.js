const rewireMobX = require('react-app-rewire-mobx');
const { injectBabelPlugin } = require('react-app-rewired');
const path = require('path');
const { updateConfig } = require('react-app-rewire-antd-theme');

const options = {
    vars: {
      '@primary-color': '#43985d'
    }
  }

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'true' }],
        config
    );

    config = updateConfig(config, env, options)

    // use the MobX rewire
    config = rewireMobX(config,env);
    return config;
};
