var chai = require('chai'),
    sync = require('../index'),
    mysql = require('mysql'),
    fs = require('fs'),
    config = require('./config');

chai.should();

beforeEach(function(done) {
    var credentials = config.dumperDatabaseCredentials;
    credentials.multipleStatements = true;
    var connection = mysql.createConnection(credentials);
    fs.readFile('./test/testdatabase.sql', 'utf-8', function(err, data) {
        if (err) throw err;
        connection.query('use ' + credentials.database + '; ' + data, function(err, result) {
            if (err) throw err;
            connection.destroy();
            done();
        });
    });
});

describe('test database dumping', function (done) {

    it('should create a file containing the dump', function (done) {
        sync.dump(config.dumperDatabaseCredentials, [], './testdump_one.sql').then(function(){
            fs.exists('./testdump_one.sql', function(result) {
                result.should.equal(true);
                fs.unlink('./testdump_one.sql', function(err){
                    if (err) throw err;
                    done();
                });
            });
        });
    });

    it('should contain the full table structure', function (done) {
        fs.readFile('./test/testdump_full.sql', 'utf-8', function(err, testdump) {
            if (err) throw err;
            sync.dump(config.dumperDatabaseCredentials, [], './testdump_two.sql').then(function(){
                fs.readFile('./testdump_two.sql', 'utf-8', function(err, data) {
                    if (err) throw err;
                    data.should.equal(testdump);
                    fs.unlink('./testdump_two.sql', function(err){
                        if (err) throw err;
                        done();
                    });
                });
            });
        });
    });

    it('should not dump blacklisted tables', function (done) {
        fs.readFile('./test/testdump_two.sql', 'utf-8', function(err, testdump) {
            if (err) throw err;
            sync.dump(config.dumperDatabaseCredentials, ['table_one'], './testdump_three.sql').then(function(){
                fs.readFile('./testdump_three.sql', 'utf-8', function(err, data) {
                    if (err) throw err;
                    data.should.equal(testdump);
                    fs.unlink('./testdump_three.sql', function(err){
                        if (err) throw err;
                        done();
                    });
                });
            });
        });
    });

});