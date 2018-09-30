var express = require('express');
var app = express();
var Queue = require('./queue');
var WebSocketServer = require('websocket').server;
var http = require('http');

var messageQueue = new Queue();
var clients = [];
var history = [];

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function () { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin '
        + request.origin + '.');
    var connection = request.accept(null, request.origin);

    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function (message) { });

    // user disconnected
    connection.on('close', function (connection) {
        if (userName !== false && userColor !== false) {
            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
        }
    });
});

function dequeueAndBroadcast() {
    if (!messageQueue.isEmpty()) {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].connected) {
                clients[i].sendUTF(messageQueue.dequeue().toString());
            }
        }
    }
    setTimeout(dequeueAndBroadcast, 1000);
}
dequeueAndBroadcast();

//REST API to accept messages

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.post('/message/enqueue', (req, res) => {
    if (req.body.message) {
        messageQueue.enqueue(req.body.message);
        console.log("(" + req.body.message + ") " + "added to queue");
        res.status(200).send("Message added to queue")
    }
    else {
        res.status(404).send("Incorrent input");
    }
});

app.all('*', (req, res) => {
    res.status(404).send("Invalid endpoint");
})

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if (err)
        console.log(err);
    else
        console.log("Listening on port " + port);
});

module.exports = app;