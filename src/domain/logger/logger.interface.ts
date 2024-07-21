/**
 * @interface
 * @name ILogger
 *
 * @description Interface for Logger
 * @property {function} debug - Method to log debug message
 * @property {function} log - Method to log message
 * @property {function} info - Method to log info message
 * @property {function} error - Method to log error message
 * @property {function} warn - Method to log warn message
 * @property {function} verbose - Method to log verbose message
 */

export interface ILogger {
  debug(context: string, message: string): void;
  log(context: string, message: string): void;
  info(context: string, message: string): void;
  error(context: string, message: string): void;
  warn(context: string, message: string): void;
  verbose(context: string, message: string): void;
}
