const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

app.use(logger);

const whitelist = ['https://www.<yoursite>.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOption = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Callback not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//--Serve static files (eg: images)
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

//--All requests for subdir will be handled here since the router is configured
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
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
