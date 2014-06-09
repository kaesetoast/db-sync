var connectionDetails = {
        host: 'localhost',
        user: 'test',
        password: 'pwd',
        database: 'test'
    },
    backupTables = [
        'modules'
    ],
    dumper = require('./dumper');

dumper(connectionDetails, backupTables);