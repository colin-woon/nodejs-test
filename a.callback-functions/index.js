//Basic callback function
function sqrNum(num) {
    return num * num;
}
function processNum(num, callback) {
    console.log(callback(num));
}
processNum(3, sqrNum);


//Asynchronous callback function
function delayMsg(msg, delay) {
    setTimeout(function () { console.log(msg); }, delay);
}
delayMsg("2 seconds passed", 2000);


//Read files asynchronously
const fs = require('fs');
function readFileCallback(err, data) {
    if (err) {
        throw new Error(err.message);
    } else {
        console.log(`File content: ${data.toString()}`);
        console.log(typeof data);
    }
}
fs.readFile('./anotherFolder/test.txt', readFileCallback);


//Error-first callbacks
function divideNum(x, y, callback) {
    if (y === 0) {
        callback(new Error("Cannot divide by 0"));
    } else {
        callback(null, x / y);
    }
}

divideNum(9, 0, function (err, result) {
    if (err) {
        throw new Error(err.message);
    } else {
        console.log(`${result}`);
    }
})
