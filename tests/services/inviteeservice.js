var db = require('../datalayer/pgdb');

module.exports = {
    save: function (email) {        
        db.save("email", [email], function (err, result) {
                // no error occurred, continue with the request
                if (!err) return false;

                // An error occurred, remove the client from the connection pool.
                // A truthy value passed to done will remove the connection from the pool
                // instead of simply returning it to be reused.
                // In this case, if we have successfully received a client (truthy)
                // then it will be removed from the pool.
                done(client);
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end('An error occurred');
                return true;
            });
    }
};