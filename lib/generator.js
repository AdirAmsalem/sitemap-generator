var FileReader = require('./file-reader');
var Parser = require('./parser');
var Routes = require('./routes');
var Sitemap = require('./sitemap');

function Generator() {
    var methods = {};

    methods.generateSitemap = function(filePatterns) {
        return FileReader.getFilePaths(filePatterns)
            .then(FileReader.readFiles)
            .then(FileReader.combineToSingleScript)
            .then(Parser.getRoutes)
            .then(Routes.getCustomizedRoutes)
            .then(Sitemap.generate)
    };

    return methods;
}

module.exports = Generator();
