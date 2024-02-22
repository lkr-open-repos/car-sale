import winston, { format } from "winston";

export const wsLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "./logs/wsLogs.log" })],
});

const { combine, timestamp, printf } = format;

const httpLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level} => ${message}`;
});

export const httpEventLogger = winston.createLogger({
  format: combine(timestamp(), httpLogFormat),
  transports: [
    new winston.transports.File({ filename: "./logs/httpEventLogs.log" }),
  ],
});

export const httpErrorLogger = winston.createLogger({
  format: combine(timestamp(), httpLogFormat),
  transports: [
    new winston.transports.File({ filename: "./logs/httpErrorLogs.log" }),
  ],
});
