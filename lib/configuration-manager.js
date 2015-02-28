var _ = require('lodash');

function ConfigurationManager() {
    var methods = {};

    var config = {};

    function getDefaultConfig() {
        return {
            routes: {
                allowDuplicates: false,
                include: [],
                exclude: [],
                formatter: function(route) {
                    return route;
                }
            },
            sitemap: {
                hostname: 'http://example.com',
                changefreq: 'weekly',
                priority: 0.5
            },
            parser: {
                isRoute: function(node) {
                    return node &&
                        node.type === 'Property' &&
                        node.key.name === 'url' &&
                        node.value.type === 'Literal';
                },
                extractRoute: function(node) {
                    return node.value.value;
                }
            }
        }
    }

    function getLibraryConfiguration(configurationName) {
        configurationName = '../configurations/' + configurationName;
        return require(configurationName);
    }

    methods.setConfig = function(options) {
        options = typeof options === 'object' ? options : {};

        if (options.configuration) {
            options = _.merge({}, getLibraryConfiguration(options.configuration), options);
        }

        _.merge(config, getDefaultConfig(), options);
    };

    methods.getConfig = function() {
        return config;
    };

    return methods;
}

module.exports = ConfigurationManager();
