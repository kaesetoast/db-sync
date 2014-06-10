var dumper = require('./dumper'),
    filler = require('./filler');

exports.dump = function(credentials, tableBlacklist, filename) {
    return dumper(credentials, tableBlacklist, filename);
};

exports.fill = function(credentials, filename) {
    filler(credentials, filename);
};
