import { createLogger, format, transports } from 'winston';

const customFormat = format.printf((info) => {
  return `[${info.label}] ${info.level} ${info.timestamp}: ${info.message}`;
});

export const logger = createLogger({
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    format.label({ label: 'FreshmanCommunity' }),
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat,
  ),
  defaultMeta: { service: 'FreshmanCommunity' },
  transports: [new transports.Console()],
});
