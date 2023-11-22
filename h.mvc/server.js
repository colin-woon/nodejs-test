const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOption = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//--Custom middleware logger (must have next param in function, next passes the control to the next handler)
app.use(logger);

app.use(cors(corsOption));

//--Built in middleware for url-encoded data (https://example.com/search?query=url+encoded&limit=10, key value pair, query=url+encoded & limit=10)/form data (HTML form) 
//--contentType: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//--Built in middleware for json
app.use(express.json());

//--Serve static files (eg: images)
app.use('/', express.static(path.join(__dirname, '/public')));

//--All requests for subdir will be handled here since the router is configured
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

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