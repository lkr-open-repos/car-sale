import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const frontendLogger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: "./logs/frontendLogs-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "60d",
      dirname: "./logs",
    }),
  ],
});

export const wsLogger = winston.createLogger({
  transports: [
    new DailyRotateFile({
      filename: "./logs/wsLogs-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "60d",
      dirname: "./logs",
    }),
  ],
});

const { combine, timestamp, printf } = format;

const httpLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level} => ${message}`;
});

export const httpEventLogger = winston.createLogger({
  format: combine(timestamp(), httpLogFormat),
  transports: [
    new DailyRotateFile({
      filename: "./logs/httpEventLogs-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "5d",
      dirname: "./logs",
    }),
  ],
});

export const httpErrorLogger = winston.createLogger({
  format: combine(timestamp(), httpLogFormat),
  transports: [
    new DailyRotateFile({
      filename: "./logs/httpErrorLogs-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "60d",
      dirname: "./logs",
    }),
  ],
});
