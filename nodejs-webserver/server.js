const logEvents = require('./logEvents')

const EventEmitter = require('events')

class Emitter extends EventEmitter { };

//initialize object, seperated this way to promote code reusability and encourage the principle of seperation of concerns
const myEmitter = new Emitter();

//add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

//--For practicing emit message for listener to detect 
// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted');
// }, 2000);