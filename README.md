This is a repo on how I learned NodeJS, it is arranged in alphabetical order, here are the takeaways:

a. callback-functions
	- basic callback function
	- asynchronous callback function
	- read files asynchronously
	- error-first callbacks

b. modules-notes
	- build a custom module, math.js, and exported it
	- learn different import and export patterns

c. npm-test
	- write npm scripts
	- npm install
	- npm install -D (devDependencies)
	- npm run "script-name"
	- npm start
	- nodemon
	- .gitignore for node_modules

d. promises
	- setting filepath
	- read, write, append, rename, unlink file
	- prevent callback hell with async await + promises
	- utf8 encoding

e. nodejs-webserver
	- create http server
	- manually configure contentType detection
	- manually configure filePath detection
	- create PORT
	- views folder for html
	- emitting events and listening events to execute code
	- serving files (html, json, images) and error handling
	- add a server listener to end of file

f. express
	- app.use (for middlewares)
	- app.get (for GET requests)
	- app.all (for all http requests)
	- serving static files
	- regular expressions for filepath in express methods
	- route handlers and chaining them
	- using and creating middlewares
	- cors for controlling website access to backend server

g. routers
	- for other subdirectories with images, a middleware is also required
	- creating routers and importing them into main server file
	- building a REST API that perfroms CRUD (check ./routes/api/employees.js, contains simple REST API code)
	- testing API with Postman
	- dynamic parameters for URIs

h. MVC
	- seperate CORS into config folder
	- created controller for API (export functions into routes api for handling)
	- simulate data model
	- implemented CRUD logic

