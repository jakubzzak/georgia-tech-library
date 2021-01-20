const { isEqual } = require("lodash");

module.exports = {
    webpack: {
        configure(webpackConfig) {
          webpackConfig.module.rules = webpackConfig.module.rules.filter(
              rule => !isEqual(rule, { parser: { requireEnsure: false } })
            );

            return webpackConfig;
        }
    }
};
