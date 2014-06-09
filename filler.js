module.exports = function(credentials, filename) {
    'use strict';
    var mysql = require('mysql'),
        fs = require('fs'),
        connection;
    credentials.multipleStatements = true;
    connection = mysql.createConnection(credentials);
    connection.query('use ' + credentials.database, function(err, result){
        if (err) throw err;
        console.log(result);
    });
    var dump = fs.readFileSync(filename, 'utf-8');
    connection.query(dump, function(err, results) {
        if (err) throw err;
        connection.destroy();
    });
};