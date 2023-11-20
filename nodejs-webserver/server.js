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
    console.log(req.url, req.method, 'tests');
    console.log('test');

    //--Get extension name from url
    const extension = path.extname(req.url);

    //--Then findout what contentType it is and assign to it
    let contentType;
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

    //--Set filepath
    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    //--Make .html extension not required in the browser
    //--Meaning= if extension not found and the last character of the url is not '/'(means its finding a missing file), add .html at the end of the url
    //Eg: nodejs-webserver/views/notRealFile > nodejs-webserver/views/notRealFile.html 
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    // const fileExists = fs.existsSync(filePath);

    // if (fileExists) {
    //     // serve the file
    // } else {
    //     //404
    //     //301 redirect
    //     console.log(path.parse(filePath))
    // }

    fsPromises.access(filePath, fs.constants.F_OK)
        .then(() => {
            // The file exists, serve the file
            // Read the file and send it in the response
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(filePath).pipe(res);
        })
        .catch((err) => {
            // The file does not exist, log the parsed filePath
            console.log('File not found:', path.parse(filePath));
            // Send a 404 response
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404: File Not Found</h1>');
        });
});

//--MUST Add a http request listener at the end of .js file
server.listen(PORT, () => console.log(`Server is listening, running on port ${PORT}`));

//--For practicing emit message for listener to detect 
// //--Add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));
//     myEmitter.emit('log', 'Log event emitted');