'use strict';

var dumper = require('./dumper'),
    filler = require('./filler');

exports.dump = function(credentials, tableBlacklist, filename) {
    return dumper(credentials, tableBlacklist, filename);
};

exports.fill = function(credentials, filename) {
    return filler(credentials, filename);
};
