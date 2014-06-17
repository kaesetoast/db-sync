db-sync [![Build Status](https://travis-ci.org/kaesetoast/db-sync.svg?branch=master)](https://travis-ci.org/kaesetoast/db-sync) [![Coverage Status](https://coveralls.io/repos/kaesetoast/db-sync/badge.png?branch=master)](https://coveralls.io/r/kaesetoast/db-sync?branch=master)
=======

db-sync is a nodejs based tool for syncing databases between different environments. It basically consists of a dump() and a fill() method for dumping databases in one environment and deploying them into another.

Note: right now, db-sync only supports MySQL databases

## Example usecase
Let's assume you are building a website powered by a CMS like [Processwire](http://processwire.com/). You may want to replicate the changes you make in the backend of your dev-environment inside your staging environment when deploying your code.

To automate this, you could use the dump() method on your dev, which will create a .sql file and the fill() method on your staging server, to push this dump to your staging database. Include db-sync in your build script and you're good to go :-)

## Installation
via NPM:
```
$ npm install db-sync
```

## Usage
```js
var sync = require('db-sync'),
    dbConfig = {
        host: 'localhost',
        user: 'username',
        password: 'pwd',
        database: 'mydb'
    },
    tableBlacklist = [
        'settings'
    ];

sync.dump(dbConfig, tableBlacklist, './dump.sql');
...
sync.fill(dbConfig, './dump.sql');
```

### Params
#### dump(credentials, tableBlacklist, filename)
**credentials:** an object containing the info for the db connection (host, user, password, database)

**tableBlacklist:** an array of tablenames that should be exclude from the dump

**filename:** the path to the .sql file

#### fill(credentials, filename)
**credentials:** an object containing the info for the db connection (host, user, password, database)

**filename:** the path to the .sql file

## Release History
* 2014-06-17   v0.2.0   implemented content dumping
* 2014-06-16   v0.1.0   first working version

## Planned features
* make dumping and filling of content optional

## Contributing
Please feel free to fork, add specs, and send pull requests! In lieu of a formal styleguide, take care to
maintain the existing coding style.

## License
db-sync is published under the [MIT License](LICENSE)
