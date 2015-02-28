var esprima = require('esprima');

var ConfigurationManager = require('./configuration-manager');

function Parser() {
    var methods = {};

    var config = ConfigurationManager.getConfig();

    function getRoutes(scriptContent) {
        var routes = [];

        function recursiveSearch(node, routes) {
            if (config.parser.isRoute(node)) {
                routes.push(config.parser.extractRoute(node));
            } else if (Array.isArray(node)) {
                node.forEach(function(nodeItem) {
                    recursiveSearch(nodeItem, routes);
                });
            } else if (typeof node === 'object') {
                for (nodeItem in node) {
                    if (!node.hasOwnProperty(nodeItem)) continue;
                    recursiveSearch(node[nodeItem], routes);
                }
            }
        }

        recursiveSearch(scriptContent, routes);

        return routes;
    }

    methods.getRoutes = function(scriptContent) {
        var parsedScript = esprima.parse(scriptContent);
        return getRoutes(parsedScript);
    };

    return methods;
}

module.exports = Parser();
