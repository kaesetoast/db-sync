module.exports = function(connectionDetails, tableBlacklist, filename) {
    'use strict';
    var q = require('q'),
        mysql = require('mysql'),
        fs = require('fs'),
        connection,
        dump = '',
        deferred = q.defer();

    connection = mysql.createConnection(connectionDetails);

    function getTables() {
        return q.ninvoke(connection, 'query', 'SHOW TABLES');
    }

    function getCols(tableData) {
        var tables = tableData[0],
            tableDefinitionGetters = [];
        for (var i = 0; i < tables.length; i++) {
            var tableName = tables[i]['Tables_in_' + connectionDetails.database];
            if (tableBlacklist.indexOf(tableName) !== -1) {
                continue;
            }
            tableDefinitionGetters.push(q.ninvoke(connection, 'query', 'SHOW CREATE TABLE ' + tableName)
            .then(getCol(tableName)));
        }
        return q.allSettled(tableDefinitionGetters);
    }

    function getCol(tableName) {
        return function(rowDetails) {
            dump += 'DROP TABLE IF EXISTS ' + tableName + ' ;\n\n';
            dump += rowDetails[0][0]['Create Table'] + ' ;\n\n';
            return q.ninvoke(connection, 'query', 'SELECT * FROM ' + tableName)
            .then(getInsert(tableName));
        };
    }

    function getInsert(tableName) {
        return function(select) {
            var result = select[0],
                keys,
                values = '(';
            for (var i = 0; i <result.length; i++) {
                keys = '';
                if (values !== '(') {
                    values += '),\n(';
                }
                for (var property in result[i]) {
                    if (result[i].hasOwnProperty(property)) {
                        if (keys !== '') {
                            keys += ', ';
                            values += ', ';
                        }
                        keys += '`' + property + '`';
                        values += '\'' + result[i][property] + '\'';
                    }
                }
            }
            dump += 'INSERT INTO `' + tableName + '` (' + keys + ') VALUES\n' + values + ');\n\n';
        };
    }

    function saveDump() {
        return (q.denodeify(fs.writeFile))(filename, dump);
    }

    q.ninvoke(connection, 'connect')
    .then(getTables)
    .then(getCols)
    .then(saveDump)
    .then(function(){
        console.log(filename + ' successfully written to filesystem');
        deferred.resolve();
    })
    .catch(function(err){
        deferred.reject(err);
    })
    .finally(function(){ connection.destroy(); });
    return deferred.promise;
};
