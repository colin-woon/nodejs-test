const http = require('http');
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require('./logEvents')
const EventEmitter = require('events')

class Emitter extends EventEmitter { };
//--Initialize object, seperated this way to promote code reusability and encourage the principle of seperation of concerns
const myEmitter = new Emitter();

//--If hosted on another server, will have own PORT, OR, just use 3500
const PORT = process.env.PORT || 3500

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //--Get extension name from url
    const extension = path.extname(req.url);

    //--Then findout what contentType it is and assign to it
    let contentType
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }
});

//--MUST Add a http request listener at the end of .js file
server.listen(PORT, () => console.log(`Server is listening, running on port ${PORT}`));

//--For practicing emit message for listener to detect 
// //--Add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));
//     myEmitter.emit('log', 'Log event emitted');