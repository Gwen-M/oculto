module.exports = {
    experiments: {
        topLevelAwait: true
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    }
};
