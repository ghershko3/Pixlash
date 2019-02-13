const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 82;
const oracle = require('../Dal/OracleConnection');
const path = require('path');

let dbConnection = {};

// app.use((req, res, next) => {
//     if (dbConnection) {
//         next();
//     } else {
//         oracle.getConnection().then(connection => {
//             dbConnection = connection;
//             next();
//         })
//     }
// });

let matrix = [];
let numberOfClientsRow = 0, numberOfClientsCol = 0;

io.on('connection', socket => {
    // console.log('a')
    // matrix[0][0]
    // socket.on('chat message', function(msg){
    //     console.log('message: ' + msg);
    //     io.emit("alert", "hi")
    // });

});
server.listen(port);