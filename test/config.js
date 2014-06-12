exports.databaseCredentials = function() {
    if (process.env.TRAVIS) {
        return {
            host: '127.0.0.1',
            user: 'travis',
            password: '',
            database: 'test_db_sync'
        };
    } else {
        return {
            host: 'localhost',
            user: 'test',
            password: 'test',
            database: 'test'
        };
    }
}();