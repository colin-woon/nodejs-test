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

const serveFile = async (filePath, contentType, res) => {
    try {
        //--Check contentType for image while reading file, utf8 is not image
        const rawData = await fsPromises.readFile(filePath, contentType.includes('image') ? '' : 'utf8');
        //--Check data type for JSON
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        res.writeHead(200, { 'Content-Type': contentType });
        //--Sends the data back
        res.end(contentType === 'application/json' ? JSON.stringify(data) : data);
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.end();
    }
}


const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

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
    //--Eg: nodejs-webserver/views/fakeFile > nodejs-webserver/views/fakeFile.html 
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        serveFile(filePath, contentType, res)
    } else {
        switch (path.parse(filePath).base) {
            case 'fakeFile.html':
                res.writeHead(301, { 'Location': '/new-page.html' });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
            //serve 404
        }
        //404
        //301 redirect
    }

    //-- EXAMPLE OUTPUT for path.parse(filePath)
    // {
    //     root: '/',
    //     dir: '/home/colin/nodejs-test/nodejs-webserver/views',
    //     base: 'fakeFile.html',
    //     ext: '.html',
    //     name: 'fakeFile'
    // }

});

//--MUST Add a http request listener at the end of .js file
server.listen(PORT, () => console.log(`Server is listening, running on port ${PORT}`));

//--For practicing emit message for listener to detect 
// //--Add listener for the log event
// myEmitter.on('log', (msg) => logEvents(msg));
//     myEmitter.emit('log', 'Log event emitted');