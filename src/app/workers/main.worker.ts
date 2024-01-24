/// <reference lib="webworker" />

import {SLICE_DATA_ON_WORKER, SLICE_DATA_SIZE} from '../settings';
import {CommandType, WorkerCommand} from '../types/worker-command';
import {DataWorkerResponse, ErrorWorkerResponse, WorkerResponseType} from '../types/worker-response';
import {PseudoSocket} from '../utils/pseudo-socket';


let pseudoSocket: PseudoSocket;

addEventListener('message', ({ data }) => {
  const command = data as WorkerCommand;
  switch (command.type) {
    case CommandType.SET_EMIT_INTERVAL:
      if (!pseudoSocket) {
        sendNoPseudoSocketError();
        return;
      }

      pseudoSocket.emitIntervalMs = command.emitIntervalMs;
      break;
    case CommandType.START_PSEUDO_SOCKET:
      pseudoSocket = new PseudoSocket(command.emitIntervalMs, command.dataCount);
      pseudoSocket.scheduleEmit();
      pseudoSocket.onMessage$.subscribe(data => {
        const response: DataWorkerResponse = {
          type: WorkerResponseType.DATA,
          data: SLICE_DATA_ON_WORKER ? data.slice(0, SLICE_DATA_SIZE) : data
        };
        postMessage(response);
      });
      break;
    case CommandType.SET_DATA_COUNT:
      if (!pseudoSocket) {
        sendNoPseudoSocketError();
        return;
      }
      pseudoSocket.dataCount = command.dataCount;
      break;
  }
});

function sendNoPseudoSocketError() {
  const response: ErrorWorkerResponse = {
    type: WorkerResponseType.ERROR,
    error: new Error('PseudoSocket was not created yet')
  };
  postMessage(response);
}

