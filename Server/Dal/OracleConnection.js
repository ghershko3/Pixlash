const oracledb = require('oracledb');
let _connection = null;

getConnection = () => {
    return new Promise((resolve, reject) => {
        if (_connection) {
            resolve(_connection);
        } else {
            oracledb.getConnection({
                user: "admin",
                password: "Knvtbhktbds032",
                connectString: "db201902131903_medium"
            }, (err, connection) => {
                if (!err) {
                    _connection = connection;
                    resolve(_connection);
                } else {
                    console.log("lol");
                    reject(err);
                }
            });
        }
    });
};

module.exports = {
    getConnection
};