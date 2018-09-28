const axios = require('axios');

axios.post('http://localhost:3000/message/enqueue', {
    message: "hi"
}).then(response => {
    console.log(response.data == "Message added to queue" ? "Passed" : "Failed");
}).catch(err => {
    console.log(err);
});

axios.post('http://localhost:3000/message/enqueue',).then(response => {
    console.log("Failed");
}).catch(err => {
    console.log("Passed");
});