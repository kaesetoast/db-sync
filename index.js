var dumper = require('./dumper'),
    filler = require('./filler');

exports.dump = function(credentials, tables, filename) {
    dumper(credentials, tables, filename);
};

exports.fill = function(credentials, filename) {
    filler(credentials, filename);
};
