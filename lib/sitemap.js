var sitemap = require('sitemap');

var ConfigurationManager = require('./configuration-manager');

function Sitemap() {
    var methods = {};

    var config = ConfigurationManager.getConfig();

    methods.generate = function(routes) {
        try {
            var sm = sitemap.createSitemap({
                hostname: config.sitemap.hostname,
                urls: routes
            });

            return sm.toXML()
        } catch (e) {
            console.error(e.toString());
        }
    };

    return methods;
}

module.exports = Sitemap();
