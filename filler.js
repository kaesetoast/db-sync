module.exports = function(credentials, filename) {
    'use strict';
    var q = require('q'),
        mysql = require('mysql'),
        fs = require('fs'),
        connection,
        deferred = q.defer();
    credentials.multipleStatements = true;
    connection = mysql.createConnection(credentials);

    function executeDump() {
        connection.query('use ' + credentials.database);
        var dump = fs.readFileSync(filename, 'utf-8');
        return q.ninvoke(connection, 'query', dump);
    }

    q.ninvoke(connection, 'connect')
    .then(executeDump)
    .then(function(){
        console.log('database successfully filled with ' + filename);
        deferred.resolve();
    })
    .catch(function(err) {
        deferred.reject(err);
    })
    .finally(function(){ connection.destroy(); });
    return deferred.promise;
};
