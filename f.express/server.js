const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

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

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //If without specifying status code, it will be 200 since the 404.html file exists
})

app.listen(PORT, () => console.log(`Server is listening, running on port ${PORT}`));
