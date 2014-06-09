module.exports = function(connectionDetails, backupTables) {
    'use strict';
    var q = require('q'),
        mysql = require('mysql'),
        fs = require('fs'),
        connection,
        dump = '',
        filename = 'dump.sql';

    connection = mysql.createConnection(connectionDetails);

    function getTables() {
        return q.ninvoke(connection, 'query', 'SHOW TABLES');
    }

    function getRows(tableData) {
        var tables = tableData[0],
            tableDefinitionGetters = [];
        for (var i = 0; i < tables.length; i++) {
            var tableName = tables[i]['Tables_in_' + connectionDetails.database];
            if (backupTables.indexOf(tableName) === -1) {
                continue;
            }
            tableDefinitionGetters.push(q.ninvoke(connection, 'query', 'SHOW CREATE TABLE ' + tableName)
            .then(getRow(tableName)));
        }
        return q.allSettled(tableDefinitionGetters);
    }

    function getRow(tableName) {
        return function(rowDetails) {
            dump += "DROP TABLE " + tableName + " \n\n";
            dump += rowDetails[0][0]['Create Table'] + "\n\n";
        };
    }

    function saveDump() {
        return (q.denodeify(fs.writeFile))(filename, dump);
    }

    q.ninvoke(connection, 'connect')
    .then(getTables)
    .then(getRows)
    .then(saveDump)
    .then(function(){ console.log(filename + ' successfully written to filesystem'); })
    .catch(function(err){ console.log(err); })
    .finally(function(){ connection.destroy(); });
};