const express = require('express')
const app = express();
var fs = require('fs');
const port = 82;
const AsyncLock = require('async-lock');
var lock = new AsyncLock();
const bodyParser = require("body-parser");

app.use(express.static('public'))

var server;

if(process.env.NODE_ENV){
    var options = {
        key: fs.readFileSync('/tmp/private.key'),
        cert: fs.readFileSync('/tmp/certificate.crt')
      };
      server = require('https').createServer(options, app).listen(443);
} else{
    server = require('http').createServer(app).listen(port);
}

const io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let matrix = [[]];
let matrixIndex = 1;
let numberOfClients = 0;
let lockObject = "";
let admin = null;
let socketIds = [];

entered = (ids) => {
    for (let i in ids) {
        if (socketIds.indexOf(i) !== -1) {
            return true;
        }
    }

    return false;
};

io.on('connection', socket => {
    lock.acquire(lockObject, () => {

        if (!entered(socket.adapter.rooms)) {
        socketIds.push(socket.id);
        if (!admin) {
            admin = socket;
            socket.on("disconnect", () => {
                admin = null;
            });

            socket.on('turnOn', (turnOn) => {
                for (let currRow = 0; currRow < matrix.length; currRow++) {
                    for (let currCol = 0; currCol < matrix[currRow].length; currCol++) {
                        if (turnOn.indexOf(matrix[currRow][currCol].id) !== -1) {
                            matrix[currRow][currCol].emit('turn on', '');
                        }
                    }
                }
            });

            socket.on('turnOffAll', () => {
                for (let currRow = 0; currRow < matrix.length; currRow++) {
                    for (let currCol = 0; currCol < matrix[currRow].length; currCol++) {
                        matrix[currRow][currCol].emit('turn off', '');
                    }
                }
            })
        } else {
            let currColIndex = 0, currRowIndex = 0;
            let setCol = 1, setRow = 1;
            if (matrixIndex === 1) {
                matrix[0].push(socket);
                matrixIndex++;
            } else {
                let setValue = false;
                for (currRowIndex = 0; currRowIndex < matrixIndex && !setValue; currRowIndex++) {
                    if (currRowIndex === matrix.length) {
                        matrix.push([]);
                    }
                    for (currColIndex = 0; currColIndex < matrixIndex - 1 && !setValue; currColIndex++) {
                        if (currColIndex === matrix[currRowIndex].length - 1) {
                            matrix[currRowIndex].push(socket);
                            setValue = true;
                            setCol = currColIndex + 1;
                            setRow = currRowIndex + 1;
                        }
                    }
                }

                if (matrix.length === matrixIndex && matrix[matrixIndex - 1].length === matrixIndex) {
                    matrixIndex++;
                }
            }

            socket.on('getSit', () => {
                socket.emit('setSit', {row: setRow, col: setCol});
            })

            numberOfClients++;
        }
    }
        lockObject = "";
        return true;
    })
});

app.use('/api/admin', (req, res) => {
    res.send();
});

app.use('/api/getClientsCount', (req, res) => {
    res.send({
        count: numberOfClients
    });
});

app.use('/api/getAllClients', (req, res) => {
    let clients = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            clients.push({
                id: matrix[i][j].id,
                location: [i + 1, j + 1]
            })
        }
    }
    res.send(clients);
});