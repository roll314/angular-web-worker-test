import {PsuedoSocketDto} from './psuedo-socket-dto';

export enum WorkerResponseType {
  ERROR,
  DATA
}

interface BaseWorkerResponse {
  type: WorkerResponseType;
}

export interface ErrorWorkerResponse extends BaseWorkerResponse {
  type: WorkerResponseType.ERROR;
  error: Error;
}

export interface DataWorkerResponse extends BaseWorkerResponse {
  type: WorkerResponseType.DATA;
  data: PsuedoSocketDto;
}

export type WorkerResponse = DataWorkerResponse | ErrorWorkerResponse;
