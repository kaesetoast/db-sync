var chai = require('chai'),
    sync = require('../index'),
    mysql = require('mysql'),
    dumpCredentials = {
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'test'
    },
    fs = require('fs');

if (process.env.TRAVIS) {
    dumpCredentials = {
        host: '127.0.0.1',
        user: 'travis',
        password: '',
        database: 'test_db_sync'
    };
}

chai.should();

beforeEach(function(done) {
    var credentials = dumpCredentials;
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

afterEach(function(done) {
    fs.unlink('testdump.sql', function(err){
        if (err) throw err;
        done();
    });
});

describe('test database dumping', function (done) {

    it('should create a file containing the dump', function (done) {
        sync.dump(dumpCredentials, [], 'testdump.sql').then(function(){
            fs.exists('testdump.sql', function(result) {
                result.should.equal(true);
                done();
            });
        });
    });

    it('should contain the full table structure', function (done) {
        fs.readFile('./test/testdump_full.sql', 'utf-8', function(err, testdump) {
            if (err) throw err;
            sync.dump(dumpCredentials, [], 'testdump.sql').then(function(){
                fs.readFile('testdump.sql', 'utf-8', function(err, data) {
                    if (err) throw err;
                    data.should.equal(testdump);
                    done();
                });
            });
        });
    });

    it('should not dump blacklisted tables', function (done) {
        fs.readFile('./test/testdump_two.sql', 'utf-8', function(err, testdump) {
            if (err) throw err;
            sync.dump(dumpCredentials, ['table_one'], 'testdump.sql').then(function(){
                fs.readFile('testdump.sql', 'utf-8', function(err, data) {
                    if (err) throw err;
                    data.should.equal(testdump);
                    done();
                });
            });
        });
    });

});