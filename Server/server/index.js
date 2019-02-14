const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 82;
const path = require('path');
const AsyncLock = require('async-lock');
var lock = new AsyncLock();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let matrix = [[]];
let matrixIndex = 1;
let numberOfClients = 0;
let lockObject = "";

io.on('connection', socket => {
    lock.acquire(lockObject, () => {
        if (matrixIndex === 1) {
            matrix[0].push(socket);
            matrixIndex++;
        } else {
            let setValue = false;
            for (let currRowIndex = 0; currRowIndex < matrixIndex && !setValue; currRowIndex++) {
                if (currRowIndex === matrix.length) {
                    matrix.push([]);
                }
                for (let currColIndex = 0; currColIndex < matrixIndex && !setValue; currColIndex++) {
                    if (currColIndex > matrix[currRowIndex].length - 1) {
                        matrix[currRowIndex].push(socket);
                        setValue = true;
                    }
                }
            }

            if (matrix.length === matrixIndex && matrix[matrixIndex - 1].length === matrixIndex) {
                matrixIndex++;
            }
        }

        socket.on('get id', function(){
            return socket.id;
        });

        numberOfClients++;
        return true;
    })
});

app.use('/api/getClientsCount', (res, res) => {
    res.send({
        count: numberOfClients
    });
});

app.post('/api/turnOn', (req, res) => {
   let turnOn = req.body.ids;

   for (let currRow = 0; currRow < matrix.length; currRow++) {
       for (let currCol = 0; currCol < matrix[currRow].length; currCol++) {
           if (turnOn.indexOf(matrix[currRow][currCol].id) !== -1) {
               matrix[currRow][currCol].emit('turn on', '');
           }
       }
   }

   res.send();
});

app.use('/api/turnOffAll', (req, res) => {
    for (let currRow = 0; currRow < matrix.length; currRow++) {
        for (let currCol = 0; currCol < matrix[currRow].length; currCol++) {
            matrix[currRow][currCol].emit('turn off', '');
        }
    }

    res.send();
});

server.listen(port);