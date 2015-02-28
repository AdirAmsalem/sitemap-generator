var Promise = require('bluebird');
var fs = require('fs');
var glob = require('glob');
var _ = require('lodash');

function FileReader() {
    var methods = {};

    function isFile(path) {
        return fs.lstatSync(path).isFile();
    }

    methods.getFilePaths = function(filePatterns) {
        var patternList = Array.isArray(filePatterns) ? filePatterns : [filePatterns];

        var globAsync = Promise.promisify(glob);

        var patternListPromises = patternList.map(function(pattern) {
            return globAsync(pattern);
        });

        return Promise.all(patternListPromises).then(_.flatten);
    };

    methods.readFiles = function(filePaths) {
        var readFileAsync = Promise.promisify(fs.readFile);

        var fileReaders = filePaths
            .filter(isFile)
            .map(function(filePath) {
                return readFileAsync(filePath);
            });

        return Promise.all(fileReaders);
    };

    methods.combineToSingleScript = function(scripts) {
        return scripts.join("\n");
    };

    return methods;
}

module.exports = FileReader();
