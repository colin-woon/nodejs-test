// const fs = require('fs')
const path = require('path');

//--To avoid callback hell, use promises            
const fsPromises = require('fs').promises

const fileOps = async () => {
    try {
        // const data = await fsPromises.readFile(path.join(__dirname, "test.txt"), 'utf8'); //no need callback err function anymore
        // console.log(data);

        // await fsPromises.unlink(path.join(__dirname, "testAlready.txt")) //deletes file
        await fsPromises.writeFile(path.join(__dirname, "test.txt"), 'bye world\n');
        await fsPromises.appendFile(path.join(__dirname, "test.txt"), 'whatsup world\n');
        await fsPromises.rename(path.join(__dirname, "test.txt"), path.join(__dirname, "testAlready.txt"));

        const newData = await fsPromises.readFile(path.join(__dirname, "testAlready.txt"), 'utf8') //no need callback err function anymore
        console.log(newData);
    } catch (err) {
        console.error(err);
    }
}

fileOps();

//--Ways to read file
// fs.readFile('./test.txt', (err, data) => {
//     if (err) throw err;
//     console.log(data.toString());
// })


//--Using PATH to be more consistent
// console.log(__filename); //if filename it will read the contents of this source code
// fs.readFile(path.join(__dirname, "test.txt"), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

//--Catch exception
// fs.readFile('./nottest.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit;
})

//--Write file
// fs.writeFile(path.join(__dirname, "test.txt"), 'bye world\n', (err) => {
//     if (err) throw err;
//     console.log("Write complete");
// })

//--Append file, (if file does not exist, append will create the file)
// fs.appendFile(path.join(__dirname, "test.txt"), 'hello again, world', (err) => {
//     if (err) throw err;
//     console.log("Append complete");
// })

//--Callback hell
// fs.writeFile(path.join(__dirname, "test.txt"), 'bye world', (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(path.join(__dirname, "test.txt"), '\n\nhello again, world', (err) => {
//         if (err) throw err;
//         console.log("Append complete");

//         fs.rename(path.join(__dirname, "test.txt"), path.join(__dirname, "testAlready.txt"), (err) => {
//             if (err) throw err;
//             console.log("Append complete");
//         })
//     })
// })


