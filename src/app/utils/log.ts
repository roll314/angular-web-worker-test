import {LogType} from '../types/log-type';

export function log(logType: LogType, message: string) {
  const dateString = new Date().toISOString();
  const resultString = `${dateString} | ${message}`;

  switch (logType) {
    case LogType.INFO:
      console.log(resultString);
      break;
    case LogType.ERROR:
      console.error(resultString);
      break;
    case LogType.WARN:
      console.warn(resultString);
      break;
  }
}
