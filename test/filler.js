var chai = require('chai'),
    sync = require('../index'),
    mysql = require('mysql'),
    fs = require('fs'),
    config = require('./config'),
    credentials = config.fillerDatabaseCredentials;

chai.should();

// TODO: use promises
beforeEach(function(done) {
    var connection,
        dropQuery = '';
    credentials.multipleStatements = true;
    connection = mysql.createConnection(credentials);
    connection.query('use ' + credentials.database);
    connection.query('SHOW TABLES', function(err, result) {
        if (err) throw err;
        for (var i = result.length; i--;) {
            dropQuery += 'DROP TABLE IF EXISTS ' + result[i]['Tables_in_' + credentials.database] + '; ';
        }
        if (dropQuery !== '') {
            connection.query(dropQuery, function(err, result) {
                if (err) throw err;
                connection.destroy();
                done();
            });
        } else {
            connection.destroy();
            done();
        }
        
    });
});

describe('test database filling', function () {
    
    it('should create the right tables', function (done) {
        sync.fill(credentials, './test/testdatabase.sql').then(function() {
            var connection = mysql.createConnection(credentials);
            connection.query('use ' + credentials.database);
            connection.query('SELECT * FROM table_one', function(err, result) {
                if (err) throw err;
                connection.destroy();
                done();
            });
        });
    });

});