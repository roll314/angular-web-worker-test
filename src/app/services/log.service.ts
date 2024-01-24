import {Injectable} from '@angular/core';
import {log} from '../utils/log';

@Injectable({providedIn: 'root'})
export class LogService {
  log = log;
}
