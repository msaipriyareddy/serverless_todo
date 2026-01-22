import winston from 'winston'

export function createLogger(name) {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    defaultMeta: { service: name },
    transports: [new winston.transports.Console()]
  })
}
