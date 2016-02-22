var pg = require('pg');
var config = require('../config/pgdbconfig');

module.exports = {
    save: function(tableName, columns, values, errorCallback) {
        //get a pg client from the connection pool
        pg.connect(config.connectionString, function(err, client) {

            if (typeof errorCallback == 'undefined') {
                errorCallback = function(err) {
                    return err;
                }
            }

            // record the visit
            client.query('INSERT INTO '+ tableName + ' (' + columns + ') VALUES ($1)', values, errorCallback);
        });
    },
    find: function (tableName, values, callback) {

        pg.connect(config.connectionString, function(err, client) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }

            var query = client.query('select username, password from ' + tableName);
            var rows = [];
            query.on('row', function (row) {
                //fired once for each row returned
                rows.push(row);
            });
            query.on('end', function(result) {
                //fired once and only once, after the last row has been returned and after all 'row' events are emitted
                //in this example, the 'rows' array now contains an ordered set of all the rows which we received from postgres
                console.log(result.rowCount + ' rows were received');
                return callback(null, rows);
            });
        });

    },
    connectionString: function() {
        return config.connectionString;
    }
}