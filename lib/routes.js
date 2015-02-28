var ConfigurationManager = require('./configuration-manager');

function Routes() {
    var methods = {};

    var config = ConfigurationManager.getConfig();

    function handleDuplicates(item, position, arr) {
        return config.routes.allowDuplicates || arr.indexOf(item) === position;
    }

    function isNotExcluded(item) {
        return config.routes.exclude.indexOf(item) === -1;
    }

    function toEnrichedObject(route) {
        return {
            url: config.routes.formatter(route),
            changefreq: config.sitemap.changefreq,
            priority: config.sitemap.priority
        }
    }

    methods.getCustomizedRoutes = function(routes) {
        return routes
            .concat(config.routes.include)
            .filter(handleDuplicates)
            .filter(isNotExcluded)
            .map(toEnrichedObject);
    };

    return methods;
}

module.exports = Routes();
