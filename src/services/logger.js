const winston = require("winston");
const { format } = require('date-fns');
const pino = require("pino");

class Logger {
  constructor(LoggingFile) {
    this.logger = winston.createLogger({
      transports: [new winston.transports.File({ filename: LoggingFile })],
    });
  }

  log(Text) {
    const time = format(new Date(), "dd'/'MM'/'y', às 'HH:mm");

    const log = pino({
      transport: {
        target: 'pino-pretty',
        options: { ignore: 'pid,hostname' }
      }
    });

    log.info(Text);
    this.logger.log({ level: 'info', message: `${time} | Info: ${Text}` });
  }
}

module.exports = Logger;