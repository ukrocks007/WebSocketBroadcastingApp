var express = require('express');
var app = express();
var Queue = require('./queue');

var messageQueue = new Queue();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.post('/message/enqueue', (req, res) => {
    if(req.body.message){
        messageQueue.enqueue(req.body.message);
        res.status(200).send("Message added to queue")
    }
    else{
        res.send(404).send("Incorrent input");
    }
});

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if (err)
        console.log(err);
    else
        console.log("Listening on port " + port);
});

module.exports = app;