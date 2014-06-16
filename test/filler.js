'use strict';

var chai = require('chai'),
    sync = require('../index'),
    mysql = require('mysql'),
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
        if (err) {
            throw err;
        }
        for (var i = result.length; i--;) {
            dropQuery += 'DROP TABLE IF EXISTS ' + result[i]['Tables_in_' + credentials.database] + '; ';
        }
        if (dropQuery !== '') {
            connection.query(dropQuery, function(err) {
                if (err) {
                    throw err;
                }
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
            connection.query('SELECT * FROM table_one', function(err) {
                if (err) {
                    throw err;
                }
                connection.destroy();
                done();
            });
        });
    });

    it('should reject promise when wrong credentials are provided', function (done) {
        sync.fill({
            host: 'localhost',
            user: 'thisiswrong',
            password: 'thisiswrong',
            database: 'doesnotexist'
        }, '../test/testdatabase.sql').fail(function(err) {
            err.code.should.equal('ER_ACCESS_DENIED_ERROR');
            done();
        });
    });

    it('should reject promise when dump is not existent', function (done) {
        sync.fill(credentials, './doesnotexist.sql').fail(function(err) {
            err.code.should.equal('ENOENT');
            err.message.should.equal('ENOENT, no such file or directory \'./doesnotexist.sql\'');
            done();
        });
    });

});
