//--Cross Origin Resource Sharing (makes your backend accessible)
// just add the site name into whitelist for access to backend, typically will delete the two sites before deployment which are local host and custom port as theyre for development purposes only 
const whitelist = [
    'https://www.<yoursite>.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];

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

module.exports = { corsOption };