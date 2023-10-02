const pine = require('pine');
const logger = pine();

class Logger {
    info(message) {
        logger.info(message);
    }
    info(message, data) {
        logger.info(`${message} ${data != undefined ? JSON.stringify(data) : ''}`);
    }
    error(message) {
        logger.error(message);
    }
}

module.exports = new Logger();