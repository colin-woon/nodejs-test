const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path')


const logEvents = async (message, fileName) => {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    const filePath = path.join(__dirname, '..', 'logs', fileName)
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        // await fsPromises.unlink(path.join(__dirname, 'eventLog.txt'));
        await fsPromises.appendFile(filePath, logItem);
    } catch (error) {
        console.error(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = { logger, logEvents }
