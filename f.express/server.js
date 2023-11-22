const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//--Custom middleware logger (must have next param in function, next passes the control to the next handler)
app.use(logger);

//--Cross Origin Resource Sharing (makes your backend accessible)
// just add the site name into whitelist for access to backend, typically will delete the two sites before deployment which are local host and custom port as theyre for development purposes only 
const whitelist = ['https://www.<yoursite>.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
// origin in the parameter means the source of request, where it came from
const corsOption = {
    origin: (origin, callback) => {
        //REMOVE !origin before deployment! only for development use
        if (whitelist.indexOf(origin) !== -1 || !origin) { //checks if request source is in whitelist
            callback(null, true); //first param is usually error handler, since its true, it is set to null, the origin source is sent back
        }
        else {
            callback(new Error("Callback not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));

//--Built in middleware for url-encoded data (https://example.com/search?query=url+encoded&limit=10, key value pair, query=url+encoded & limit=10)/form data (HTML form) 
//--contentType: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//--Built in middleware for json
app.use(express.json());

//--Serve static files (eg: images)
app.use(express.static(path.join(__dirname, '/public')));

//--^ = Begin with
//--$ = End with
//--| = OR
//--(<words>)? = Optional
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/new-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get('/fake-page.html', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default (301 means permanently redirect)
})

//--Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("tried to load hello.html");
    next();
}, (req, res) => { //--Not a common way to chain to another handler
    res.send('Hello World I was alive');
})

//--Chaining Route Handlers
const uno = (req, res, next) => {
    console.log('uno');
    next();
}

const dos = (req, res, next) => {
    console.log('dos');
    next();
}

const tres = (req, res, next) => {
    console.log('tres');
    res.send("Done!");
}

app.get('/chain(.html)?', [uno, dos, tres]);

//--.get for GET only, .all for GET,POST,PUT,DELETE etc.
app.all('*', (req, res) => {
    res.status(404); //If without specifying status code, it will be 200 since the 404.html file exists
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 not found la' });
    } else {
        res.type('txt').send('404 not found at all la');
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening, running on port ${PORT}`));
