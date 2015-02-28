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

    methods.setConfig = function(options) {
        options = typeof options === 'object' ? options : {};
        _.merge(config, getDefaultConfig(), options);
    };

    methods.getConfig = function() {
        return config;
    };

    return methods;
}

module.exports = ConfigurationManager();
