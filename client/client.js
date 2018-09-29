const axios = require('axios');

axios.post('http://localhost:3000/message/enqueue', {
    message: "hi"
}).then(response => {
    console.log(response.data == "Message added to queue" ? "Passed" : "Failed");
}).catch(err => {
    console.log(err);
});

axios.post('http://localhost:3000/message/enqueue', ).then(response => {
    console.log("Failed");
}).catch(err => {
    console.log("Passed");
});

function sendRandomString() {
    axios.post('http://localhost:3000/message/enqueue', {
        message: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }).then(response => {
        console.log(response.data == "Message added to queue" ? "Message Added!" : "Failed");
    }).catch(err => {
        console.log(err);
    });
    setTimeout(sendRandomString, 500);
}
sendRandomString();