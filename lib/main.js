var ConfigurationManager = require('./configuration-manager');
var Generator = require('./generator');

function Main(filePatterns, options) {
    ConfigurationManager.setConfig(options);
    return Generator.generateSitemap(filePatterns);
}

module.exports = Main;
